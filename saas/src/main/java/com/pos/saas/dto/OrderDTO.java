package com.pos.saas.dto;

import com.pos.saas.domain.OrderStatus;
import com.pos.saas.domain.PaymentType;
import com.pos.saas.model.Customer;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderDTO {
    private Long id;
    private Double totalAmount;
    private LocalDateTime createdAt;
    private PaymentType paymentType;
    private OrderStatus orderStatus;
    private Long branchId;
    private Long cashierId;
    private UserDTO cashier;
    private Customer customer;
    private List<OrderItemDTO> items;
}