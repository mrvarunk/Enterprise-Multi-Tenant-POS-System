package com.pos.saas.dto;

import com.pos.saas.domain.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentSummary {
    private PaymentType paymentType;
    private Double totalAmount;
    private Integer transactionCount;
    private Double percentage;
}