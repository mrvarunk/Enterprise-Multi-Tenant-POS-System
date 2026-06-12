package com.pos.saas.controller;

import com.pos.saas.dto.OrderDTO;
import com.pos.saas.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/cashier/{cashierId}")
    public ResponseEntity<OrderDTO> createOrder(
            @PathVariable Long cashierId,
            @RequestBody OrderDTO orderDTO) throws Exception {
        OrderDTO createdOrder = orderService.createOrder(orderDTO, cashierId);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) throws Exception {
        OrderDTO order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByBranch(@PathVariable Long branchId) {
        List<OrderDTO> orders = orderService.getOrdersByBranch(branchId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/branch/{branchId}/today")
    public ResponseEntity<List<OrderDTO>> getTodayOrdersByBranch(@PathVariable Long branchId) {
        List<OrderDTO> orders = orderService.getTodayOrdersByBranch(branchId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/branch/{branchId}/recent")
    public ResponseEntity<List<OrderDTO>> getRecentOrdersByBranch(@PathVariable Long branchId) {
        List<OrderDTO> orders = orderService.getTop5RecentOrdersByBranch(branchId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByCashier(@PathVariable Long cashierId) {
        List<OrderDTO> orders = orderService.getOrdersByCashier(cashierId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomer(@PathVariable Long customerId) {
        List<OrderDTO> orders = orderService.getOrdersByCustomer(customerId);
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) throws Exception {
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Order deleted successfully");
    }
}
