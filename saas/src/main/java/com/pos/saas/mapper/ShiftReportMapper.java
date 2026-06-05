package com.pos.saas.mapper;

import com.pos.saas.model.ShiftReport;
import com.pos.saas.dto.ShiftReportDTO;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class ShiftReportMapper {

    public static ShiftReportDTO toDTO(ShiftReport report) {
        if (report == null) return null;

        return ShiftReportDTO.builder()
                .id(report.getId())
                .shiftStartTime(report.getShiftStartTime())
                .shiftEndTime(report.getShiftEndTime())
                .totalSales(report.getTotalSales())
                .totalRefunds(report.getTotalRefunds())
                .netSales(report.getNetSales())
                .totalOrders(report.getTotalOrders())
                .cashierId(report.getCashier() != null ? report.getCashier().getId() : null)
                .cashierName(report.getCashier() != null ? report.getCashier().getFullName() : null)
                .branchId(report.getBranch() != null ? report.getBranch().getId() : null)
                .paymentSummaries(report.getPaymentSummaries() != null ? report.getPaymentSummaries() : new ArrayList<>())
                .topSellingProducts(report.getTopSellingProducts() != null ?
                        report.getTopSellingProducts().stream().map(ProductMapper::toDTO).collect(Collectors.toList()) : new ArrayList<>())
                .recentOrders(report.getRecentOrders() != null ?
                        report.getRecentOrders().stream().map(OrderMapper::toDTO).collect(Collectors.toList()) : new ArrayList<>())
                .refunds(report.getRefunds() != null ?
                        report.getRefunds().stream().map(RefundMapper::toDTO).collect(Collectors.toList()) : new ArrayList<>())
                .build();
    }
}