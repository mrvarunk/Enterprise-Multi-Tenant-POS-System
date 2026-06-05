package com.pos.saas.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ShiftReportDTO {
    private Long id;
    private LocalDateTime shiftStartTime;
    private LocalDateTime shiftEndTime;
    private Double totalSales;
    private Double totalRefunds;
    private Double netSales;
    private Integer totalOrders;
    private Long cashierId;
    private String cashierName;
    private Long branchId;
    private List<PaymentSummary> paymentSummaries;
    private List<ProductDTO> topSellingProducts;
    private List<OrderDTO> recentOrders;
    private List<RefundDTO> refunds;
}