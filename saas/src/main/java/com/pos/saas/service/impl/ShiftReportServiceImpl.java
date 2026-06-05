package com.pos.saas.service.impl;

import com.pos.saas.domain.PaymentType;
import com.pos.saas.mapper.ShiftReportMapper;
import com.pos.saas.model.*;
import com.pos.saas.dto.PaymentSummary;
import com.pos.saas.dto.ShiftReportDTO;
import com.pos.saas.repository.*;
import com.pos.saas.service.ShiftReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShiftReportServiceImpl implements ShiftReportService {

    private final ShiftReportRepository shiftReportRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final RefundRepository refundRepository;

    @Override
    @Transactional
    public ShiftReportDTO startShift(Long cashierId) throws Exception {
        User cashier = userRepository.findById(cashierId)
                .orElseThrow(() -> new Exception("Cashier user profile context missing."));

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);

        // Blocks duplicate shift creation if one already exists for today
        if (shiftReportRepository.findByCashierAndShiftStartTimeBetween(cashier, startOfDay, endOfDay).isPresent()) {
            throw new Exception("Operational Constraint: Shift has already been initialized for today.");
        }

        ShiftReport report = ShiftReport.builder()
                .cashier(cashier)
                .branch(cashier.getBranch())
                .shiftStartTime(now)
                .build();

        return ShiftReportMapper.toDTO(shiftReportRepository.save(report));
    }

    @Override
    @Transactional
    public ShiftReportDTO endShift(Long shiftId) throws Exception {
        ShiftReport report = shiftReportRepository.findById(shiftId)
                .orElseThrow(() -> new Exception("Shift context record tracking index failure. ID: " + shiftId));

        report.setShiftEndTime(LocalDateTime.now());
        calculateShiftMetrics(report);

        return ShiftReportMapper.toDTO(shiftReportRepository.save(report));
    }

    @Override
    public ShiftReportDTO getLiveShiftProgress(Long cashierId) throws Exception {
        User cashier = userRepository.findById(cashierId)
                .orElseThrow(() -> new Exception("Cashier context not found."));

        ShiftReport activeShift = shiftReportRepository.findTopByCashierAndShiftEndTimeIsNullOrderByShiftStartTimeDesc(cashier)
                .orElseThrow(() -> new Exception("No currently active shift sequence open for this terminal session."));

        // Generate temporary calculations up to the current timestamp without closing out the active entity
        ShiftReport progressReport = ShiftReport.builder()
                .id(activeShift.getId())
                .cashier(activeShift.getCashier())
                .branch(activeShift.getBranch())
                .shiftStartTime(activeShift.getShiftStartTime())
                .shiftEndTime(LocalDateTime.now())
                .build();

        calculateShiftMetrics(progressReport);
        return ShiftReportMapper.toDTO(progressReport);
    }

    private void calculateShiftMetrics(ShiftReport report) {
        LocalDateTime start = report.getShiftStartTime();
        LocalDateTime end = report.getShiftEndTime();

        // 1. Core aggregates calculation mappings
        List<Order> orders = orderRepository.findByBranchIdAndCreatedAtBetween(report.getBranch().getId(), start, end).stream()
                .filter(o -> o.getCashier().getId().equals(report.getCashier().getId()))
                .collect(Collectors.toList());

        List<Refund> refunds = refundRepository.findByCashierIdAndCreatedAtBetween(report.getCashier().getId(), start, end);

        double totalSales = orders.stream().mapToDouble(Order::getTotalAmount).sum();
        double totalRefunds = refunds.stream().mapToDouble(Refund::getAmount).sum();

        report.setTotalSales(totalSales);
        report.setTotalRefunds(totalRefunds);
        report.setNetSales(totalSales - totalRefunds);
        report.setTotalOrders(orders.size());
        report.setRefunds(refunds);
        report.setRecentOrders(orders.stream().limit(5).collect(Collectors.toList()));

        // 2. Process product analytics logic mapping quantities
        Map<Product, Integer> productQuantities = orders.stream()
                .flatMap(o -> o.getItems().stream())
                .collect(Collectors.groupingBy(OrderItem::getProduct, Collectors.summingInt(OrderItem::getQuantity)));

        List<Product> topProducts = productQuantities.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
        report.setTopSellingProducts(topProducts);

        // 3. Construct financial payment type summaries percentages
        Map<PaymentType, List<Order>> groupedPayments = orders.stream()
                .collect(Collectors.groupingBy(o -> o.getPaymentType() != null ? o.getPaymentType() : PaymentType.CASH));

        List<PaymentSummary> summaries = new ArrayList<>();
        for (Map.Entry<PaymentType, List<Order>> entry : groupedPayments.entrySet()) {
            double typeAmount = entry.getValue().stream().mapToDouble(Order::getTotalAmount).sum();
            double pct = totalSales > 0 ? (typeAmount / totalSales) * 100 : 0.0;

            summaries.add(PaymentSummary.builder()
                    .paymentType(entry.getKey())
                    .totalAmount(typeAmount)
                    .transactionCount(entry.getValue().size())
                    .percentage(Math.round(pct * 100.0) / 100.0)
                    .build());
        }
        report.setPaymentSummaries(summaries);
    }

    @Override
    public ShiftReportDTO getShiftReportById(Long id) throws Exception {
        ShiftReport report = shiftReportRepository.findById(id)
                .orElseThrow(() -> new Exception("Shift context execution metrics lookup target failure. ID: " + id));
        return ShiftReportMapper.toDTO(report);
    }

    @Override
    public List<ShiftReportDTO> getAllShiftReports() {
        return shiftReportRepository.findAll().stream().map(ShiftReportMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDTO> getShiftReportsByCashier(Long cashierId) {
        return shiftReportRepository.findByCashierId(cashierId).stream().map(ShiftReportMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDTO> getShiftReportsByBranch(Long branchId) {
        return shiftReportRepository.findByBranchId(branchId).stream().map(ShiftReportMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public ShiftReportDTO getShiftByCashierAndDate(Long cashierId, LocalDateTime date) throws Exception {
        User cashier = userRepository.findById(cashierId).orElseThrow(() -> new Exception("User resource failure matching context parameters"));
        LocalDateTime start = date.toLocalDate().atStartOfDay();
        LocalDateTime end = date.toLocalDate().atTime(23, 59, 59);

        ShiftReport report = shiftReportRepository.findByCashierAndShiftStartTimeBetween(cashier, start, end)
                .orElseThrow(() -> new Exception("Shift parameters metrics record structural tracking exception for selected date window"));
        return ShiftReportMapper.toDTO(report);
    }
}