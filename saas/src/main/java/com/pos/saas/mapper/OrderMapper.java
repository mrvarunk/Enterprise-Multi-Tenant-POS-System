package com.pos.saas.mapper;

import com.pos.saas.model.Order;
import com.pos.saas.dto.OrderDTO;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        if (order == null) return null;

        return OrderDTO.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .createdAt(order.getCreatedAt())
                .paymentType(order.getPaymentType())
                .orderStatus(order.getOrderStatus())
                .branchId(order.getBranch() != null ? order.getBranch().getId() : null)
                .cashier(UserMapper.toDTO(order.getCashier()))
                .customer(order.getCustomer())
                .items(order.getItems().stream().map(OrderItemMapper::toDTO).collect(Collectors.toList()))
                .build();
    }
}