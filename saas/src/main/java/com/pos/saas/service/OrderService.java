package com.pos.saas.service;

import com.pos.saas.dto.OrderDTO;
import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO, Long cashierId) throws Exception;
    OrderDTO getOrderById(Long id) throws Exception;
    List<OrderDTO> getOrdersByBranch(Long branchId);
    List<OrderDTO> getOrdersByCashier(Long cashierId);
    List<OrderDTO> getOrdersByCustomer(Long customerId);
    List<OrderDTO> getTodayOrdersByBranch(Long branchId);
    List<OrderDTO> getTop5RecentOrdersByBranch(Long branchId);
    void deleteOrder(Long id) throws Exception;
}