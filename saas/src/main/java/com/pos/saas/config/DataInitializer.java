package com.pos.saas.config;

import com.pos.saas.domain.OrderStatus;
import com.pos.saas.domain.PaymentType;
import com.pos.saas.domain.StoreStatus;
import com.pos.saas.model.*;
import com.pos.saas.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.pos.saas.domain.UserRole;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    private final PasswordEncoder passwordEncoder;

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

        // Ensure default users exist and have known passwords
        initializeUser("admin@pos.com", "admin123", UserRole.ROLE_ADMIN, 1L, null);
        initializeUser("owner@pos.com", "owner123", UserRole.ROLE_BRANCH_MANAGER, 1L, null);
        initializeUser("cashier@pos.com", "cashier123", UserRole.ROLE_CASHIER, 1L, 1L);

        // Create sample categories if none exist
        if (categoryRepository.count() == 0) {
            Optional<Store> storeOpt = storeRepository.findById(1L);
            if (storeOpt.isPresent()) {
                Category mensClothing = new Category();
                mensClothing.setName("Men's Clothing");
                mensClothing.setStore(storeOpt.get());

                Category womensClothing = new Category();
                womensClothing.setName("Women's Clothing");
                womensClothing.setStore(storeOpt.get());

                Category homeKitchen = new Category();
                homeKitchen.setName("Home & Kitchen");
                homeKitchen.setStore(storeOpt.get());

                categoryRepository.saveAll(Arrays.asList(mensClothing, womensClothing, homeKitchen));
                System.out.println("✓ Created sample categories");
            }
        }

        // Create sample products if none exist
        if (productRepository.count() == 0) {
            Optional<Store> storeOpt = storeRepository.findById(1L);
            if (storeOpt.isPresent()) {
                java.util.List<Category> allCategories = categoryRepository.findAll();
                Category mensClothing = allCategories.isEmpty() ? null : allCategories.get(0);

                Product shirt = new Product();
                shirt.setName("Slim Fit Oxford Shirt");
                shirt.setBarcode("PROD001");
                shirt.setCostPrice(350.0);
                shirt.setMrp(1299.0);
                shirt.setSellingPrice(1199.0);
                shirt.setStockQuantity(40);
                shirt.setDescription("Premium cotton oxford button-down shirt");
                shirt.setBrand("Arrow");
                shirt.setStore(storeOpt.get());
                shirt.setCategory(mensClothing);

                Product pants = new Product();
                pants.setName("Classic Chino Pants");
                pants.setBarcode("PROD002");
                pants.setCostPrice(500.0);
                pants.setMrp(1899.0);
                pants.setSellingPrice(1699.0);
                pants.setStockQuantity(30);
                pants.setDescription("Stretch cotton chino trousers");
                pants.setBrand("U.S. Polo Assn.");
                pants.setStore(storeOpt.get());

                Product bedsheet = new Product();
                bedsheet.setName("Cotton Bed Sheet Set");
                bedsheet.setBarcode("PROD003");
                bedsheet.setCostPrice(500.0);
                bedsheet.setMrp(1999.0);
                bedsheet.setSellingPrice(1799.0);
                bedsheet.setStockQuantity(25);
                bedsheet.setDescription("King-size 300 TC cotton bedsheet with 2 pillow covers");
                bedsheet.setBrand("Spaces");
                bedsheet.setStore(storeOpt.get());

                productRepository.saveAll(Arrays.asList(shirt, pants, bedsheet));
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

    private void initializeUser(String email, String plaintextPassword, UserRole role, Long storeId, Long branchId) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setCreatedAt(LocalDateTime.now());
        }
        
        user.setFullName(role.name().replace("ROLE_", "") + " User");
        user.setPassword(passwordEncoder.encode(plaintextPassword));
        user.setRole(role);
        user.setUpdatedAt(LocalDateTime.now());

        if (storeId != null) {
            storeRepository.findById(storeId).ifPresent(user::setStore);
        } else {
            user.setStore(null);
        }

        if (branchId != null) {
            branchRepository.findById(branchId).ifPresent(user::setBranch);
        } else {
            user.setBranch(null);
        }

        userRepository.save(user);
        System.out.println("✓ Initialized/updated user: " + email + " with role " + role);
    }
}

