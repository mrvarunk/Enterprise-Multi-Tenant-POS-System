package com.pos.saas.config;

import com.pos.saas.domain.OrderStatus;
import com.pos.saas.domain.PaymentType;
import com.pos.saas.domain.StoreStatus;
import com.pos.saas.model.*;
import com.pos.saas.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final StoreRepository storeRepository;
    private final BranchRepository branchRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if store with ID 1 exists, if not create it
        if (storeRepository.findById(1L).isEmpty()) {
            Store store = new Store();
            store.setId(1L);
            store.setBrand("Default Store");
            store.setDescription("Default test store for development");
            store.setStoreType("RETAIL");
            store.setStatus(StoreStatus.ACTIVE);

            StoreContact contact = new StoreContact();
            contact.setAddress("123 Main Street");
            contact.setPhone("+1-800-STORE");
            contact.setEmail("store@example.com");
            store.setContact(contact);

            storeRepository.save(store);
            System.out.println("✓ Created default store with ID 1");
        }

        // Check if branch with ID 1 exists, if not create it
        if (branchRepository.findById(1L).isEmpty()) {
            Optional<Store> storeOpt = storeRepository.findById(1L);
            if (storeOpt.isPresent()) {
                Branch branch = new Branch();
                branch.setId(1L);
                branch.setName("Main Branch");
                branch.setAddress("123 Main Street, Ground Floor");
                branch.setPhone("+1-800-BRANCH");
                branch.setEmail("branch@example.com");
                branch.setStore(storeOpt.get());
                branch.setOpenTime(LocalTime.of(9, 0));
                branch.setCloseTime(LocalTime.of(21, 0));
                branch.setWorkingDays(Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"));

                branchRepository.save(branch);
                System.out.println("✓ Created main branch with ID 1");
            }
        }

        // Create sample categories if none exist
        if (categoryRepository.count() == 0) {
            Optional<Store> storeOpt = storeRepository.findById(1L);
            if (storeOpt.isPresent()) {
                Category electronics = new Category();
                electronics.setName("Electronics");
                electronics.setStore(storeOpt.get());

                Category clothing = new Category();
                clothing.setName("Clothing");
                clothing.setStore(storeOpt.get());

                Category food = new Category();
                food.setName("Food & Beverages");
                food.setStore(storeOpt.get());

                categoryRepository.saveAll(Arrays.asList(electronics, clothing, food));
                System.out.println("✓ Created sample categories");
            }
        }

        // Create sample products if none exist
        if (productRepository.count() == 0) {
            Optional<Store> storeOpt = storeRepository.findById(1L);
            if (storeOpt.isPresent()) {
                java.util.List<Category> allCategories = categoryRepository.findAll();
                Category electronics = allCategories.isEmpty() ? null : allCategories.get(0);

                Product laptop = new Product();
                laptop.setName("Laptop Computer");
                laptop.setBarcode("PROD001");
                laptop.setCostPrice(500.0);
                laptop.setMrp(899.99);
                laptop.setSellingPrice(799.99);
                laptop.setStockQuantity(15);
                laptop.setDescription("High-performance laptop for work and gaming");
                laptop.setBrand("TechBrand");
                laptop.setStore(storeOpt.get());
                laptop.setCategory(electronics);

                Product shirt = new Product();
                shirt.setName("Cotton T-Shirt");
                shirt.setBarcode("PROD002");
                shirt.setCostPrice(5.0);
                shirt.setMrp(19.99);
                shirt.setSellingPrice(14.99);
                shirt.setStockQuantity(50);
                shirt.setDescription("Comfortable cotton t-shirt");
                shirt.setBrand("FashionBrand");
                shirt.setStore(storeOpt.get());

                Product coffee = new Product();
                coffee.setName("Premium Coffee Beans");
                coffee.setBarcode("PROD003");
                coffee.setCostPrice(2.0);
                coffee.setMrp(8.99);
                coffee.setSellingPrice(5.99);
                coffee.setStockQuantity(100);
                coffee.setDescription("Fresh roasted coffee beans");
                coffee.setBrand("CoffeeBrand");
                coffee.setStore(storeOpt.get());

                productRepository.saveAll(Arrays.asList(laptop, shirt, coffee));
                System.out.println("✓ Created sample products");
            }
        }

        // Create sample customer if none exist
        if (customerRepository.count() == 0) {
            Customer customer = new Customer();
            customer.setFullName("John Doe");
            customer.setEmail("john@example.com");
            customer.setPhone("+1-555-1234");
            customerRepository.save(customer);
            System.out.println("✓ Created sample customer");
        }

        // Create sample orders if none exist
        if (orderRepository.count() == 0) {
            Optional<Branch> branchOpt = branchRepository.findById(1L);
            Optional<User> cashierOpt = userRepository.findById(1L);
            Optional<Customer> customerOpt = customerRepository.findById(1L);
            Optional<Product> productOpt = productRepository.findById(1L);

            if (branchOpt.isPresent() && cashierOpt.isPresent() && productOpt.isPresent()) {
                Order order = new Order();
                order.setBranch(branchOpt.get());
                order.setCashier(cashierOpt.get());
                order.setCustomer(customerOpt.orElse(null));
                order.setPaymentType(PaymentType.CASH);
                order.setOrderStatus(OrderStatus.COMPLETED);
                order.setTotalAmount(799.99);
                order.setCreatedAt(LocalDateTime.now().minusHours(2));

                OrderItem item = new OrderItem();
                item.setOrder(order);
                item.setProduct(productOpt.get());
                item.setQuantity(1);
                item.setPrice(799.99);

                java.util.List<OrderItem> items = new java.util.ArrayList<>();
                items.add(item);
                order.setItems(items);
                orderRepository.save(order);
                System.out.println("✓ Created sample order");
            }
        }

        System.out.println("✓ Data initialization complete!");
    }
}

