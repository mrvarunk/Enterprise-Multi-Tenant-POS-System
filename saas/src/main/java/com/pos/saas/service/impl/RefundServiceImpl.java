
package com.pos.saas.service.impl;

import com.pos.saas.mapper.RefundMapper;
import com.pos.saas.model.*;
import com.pos.saas.dto.RefundDTO;
import com.pos.saas.repository.OrderRepository;
import com.pos.saas.repository.RefundRepository;
import com.pos.saas.repository.UserRepository;
import com.pos.saas.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {

    private final RefundRepository refundRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public RefundDTO createRefund(RefundDTO refundDTO, Long cashierId) throws Exception {
        User cashier = userRepository.findById(cashierId)
                .orElseThrow(() -> new Exception("Cashier profile context not found"));

        Order order = orderRepository.findById(refundDTO.getOrderId())
                .orElseThrow(() -> new Exception("Original transaction order matching reference identifier missing"));

        Branch branch = cashier.getBranch();
        if (branch == null) {
            throw new Exception("Operational boundary violation: Cashier has no assigned branch tracking parameters");
        }

        Refund refund = Refund.builder()
                .order(order)
                .cashier(cashier)
                .branch(branch)
                .reason(refundDTO.getReason())
                .amount(refundDTO.getAmount())
                .paymentType(order.getPaymentType()) // Defaults directly to the original invoice payment type context
                .build();

        Refund savedRefund = refundRepository.save(refund);
        return RefundMapper.toDTO(savedRefund);
    }

    @Override
    public List<RefundDTO> getAllRefunds() {
        return refundRepository.findAll().stream()
                .map(RefundMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<RefundDTO> getRefundsByCashier(Long cashierId) {
        return refundRepository.findByCashierId(cashierId).stream()
                .map(RefundMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<RefundDTO> getRefundsByBranch(Long branchId) {
        return refundRepository.findByBranchId(branchId).stream()
                .map(RefundMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<RefundDTO> getRefundsByShiftReport(Long shiftReportId) {
        return refundRepository.findByShiftReportId(shiftReportId).stream()
                .map(RefundMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<RefundDTO> getRefundsByCashierAndDateRange(Long cashierId, LocalDateTime start, LocalDateTime end) {
        return refundRepository.findByCashierIdAndCreatedAtBetween(cashierId, start, end).stream()
                .map(RefundMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public RefundDTO getRefundById(Long id) throws Exception {
        Refund refund = refundRepository.findById(id)
                .orElseThrow(() -> new Exception("Refund tracking document missing record lookup parameters matching ID: " + id));
        return RefundMapper.toDTO(refund);
    }

    @Override
    public void deleteRefund(Long id) throws Exception {
        Refund refund = refundRepository.findById(id)
                .orElseThrow(() -> new Exception("Refund target document missing indexing reference"));
        refundRepository.delete(refund);
    }
}