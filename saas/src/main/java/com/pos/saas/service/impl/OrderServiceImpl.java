package com.pos.saas.service.impl;

import com.pos.saas.config.TenantContext;
import com.pos.saas.exception.ResourceNotFoundException;
import com.pos.saas.mapper.OrderMapper;
import com.pos.saas.model.*;
import com.pos.saas.dto.OrderDTO;
import com.pos.saas.dto.OrderItemDTO;
import com.pos.saas.repository.*;
import com.pos.saas.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO, Long cashierId) throws Exception {
        User cashier = userRepository.findById(cashierId)
                .orElseThrow(() -> new Exception("Cashier not found"));

        Branch branch = cashier.getBranch();
        if (branch == null) {
            throw new Exception("Cashier is not assigned to any branch operational limits");
        }

        Order order = new Order();
        order.setBranch(branch);
        order.setCashier(cashier);
        order.setPaymentType(orderDTO.getPaymentType());
        order.setOrderStatus(orderDTO.getOrderStatus());

        if (orderDTO.getCustomer() != null && orderDTO.getCustomer().getId() != null) {
            Customer customer = customerRepository.findById(orderDTO.getCustomer().getId()).orElse(null);
            order.setCustomer(customer);
        }

        List<OrderItem> orderItems = new ArrayList<>();
        double calculatedTotal = 0.0;

        for (OrderItemDTO itemDTO : orderDTO.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new Exception("Product not found matching payload tracking context"));

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .quantity(itemDTO.getQuantity())
                    .price(product.getSellingPrice()) // Enforce standard transactional safety
                    .order(order)
                    .build();

            orderItems.add(item);
            calculatedTotal += product.getSellingPrice() * itemDTO.getQuantity();
        }

        order.setItems(orderItems);
        order.setTotalAmount(calculatedTotal);

        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toDTO(savedOrder);
    }

    @Override
    public OrderDTO getOrderById(Long id) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Order not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Order order = orderRepository.findByIdAndBranch_StoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return OrderMapper.toDTO(order);
    }

    @Override
    public List<OrderDTO> getOrdersByBranch(Long branchId) {
        return orderRepository.findByBranchId(branchId).stream()
                .map(OrderMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getOrdersByCashier(Long cashierId) {
        return orderRepository.findByCashierId(cashierId).stream()
                .map(OrderMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId).stream()
                .map(OrderMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getTodayOrdersByBranch(Long branchId) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);
        return orderRepository.findByBranchIdAndCreatedAtBetween(branchId, startOfDay, endOfDay).stream()
                .map(OrderMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getTop5RecentOrdersByBranch(Long branchId) {
        return orderRepository.findTop5ByBranchIdOrderByCreatedAtDesc(branchId).stream()
                .map(OrderMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(Long id) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Order not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Order order = orderRepository.findByIdAndBranch_StoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        orderRepository.delete(order);
    }
}