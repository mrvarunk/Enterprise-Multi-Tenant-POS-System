package com.pos.saas.model;

import com.pos.saas.dto.PaymentSummary;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShiftReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime shiftStartTime;
    private LocalDateTime shiftEndTime;

    private Double totalSales;
    private Double totalRefunds;
    private Double netSales;
    private Integer totalOrders;

    @ManyToOne
    private User cashier;

    @ManyToOne
    private Branch branch;

    // This now safely and automatically resolves to com.pos.saas.model.Refund
    @OneToMany(mappedBy = "shiftReport", cascade = CascadeType.ALL)
    private List<Refund> refunds;

    @ManyToMany
    @JoinTable(
            name = "shift_report_top_products",
            joinColumns = @JoinColumn(name = "shift_report_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> topSellingProducts;

    @Transient
    private List<Order> recentOrders;

    @Transient
    private List<PaymentSummary> paymentSummaries;
}