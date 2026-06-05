package com.pos.saas.mapper;

import com.pos.saas.model.Refund;
import com.pos.saas.dto.RefundDTO;

public class RefundMapper {

    public static RefundDTO toDTO(Refund refund) {
        if (refund == null) return null;

        return RefundDTO.builder()
                .id(refund.getId())
                .orderId(refund.getOrder() != null ? refund.getOrder().getId() : null)
                .reason(refund.getReason())
                .amount(refund.getAmount())
                .shiftReportId(refund.getShiftReport() != null ? refund.getShiftReport().getId() : null)
                .cashierName(refund.getCashier() != null ? refund.getCashier().getFullName() : null)
                .branchId(refund.getBranch() != null ? refund.getBranch().getId() : null)
                .paymentType(refund.getPaymentType())
                .createdAt(refund.getCreatedAt())
                .build();
    }
}