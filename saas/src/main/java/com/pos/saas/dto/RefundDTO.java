package com.pos.saas.dto;

import com.pos.saas.domain.PaymentType;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class RefundDTO {
    private Long id;
    private Long orderId;
    private String reason;
    private Double amount;
    private Long shiftReportId;
    private String cashierName;
    private Long branchId;
    private PaymentType paymentType;
    private LocalDateTime createdAt;
}