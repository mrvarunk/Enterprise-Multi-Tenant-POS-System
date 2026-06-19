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
import java.util.List;
import java.util.ArrayList;

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
    private final InventoryRepository inventoryRepository;
    private final ShiftReportRepository shiftReportRepository;
    private final RefundRepository refundRepository;

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

        // Expand Categories, Products, Customers, Inventory, Orders, Shifts, and Refunds
        Store store = storeRepository.findById(1L).orElse(null);
        Branch branch = branchRepository.findById(1L).orElse(null);
        User cashier = userRepository.findByEmail("cashier@pos.com");

        if (store != null && branch != null && cashier != null) {
            // Seed all 43 products
            Product p1 = createProductIfAbsent("Slim Fit Oxford Shirt", "20001", 350.0, 1299.0, 1199.0, "Arrow", "Premium cotton oxford button-down shirt. Classic collar, chest pocket. Available in white, blue, pink.", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80", 40, "Men's Clothing", store, branch);
            Product p2 = createProductIfAbsent("Classic Chino Pants", "20002", 500.0, 1899.0, 1699.0, "U.S. Polo Assn.", "Stretch cotton chino trousers. Slim-tapered fit, zip fly, belt loops. Khaki.", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80", 30, "Men's Clothing", store, branch);
            Product p3 = createProductIfAbsent("V-Neck Cotton T-Shirt", "20003", 150.0, 599.0, 499.0, "Jockey", "Soft combed-cotton V-neck tee. Bio-washed for extra softness. Pack of 1.", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80", 80, "Men's Clothing", store, branch);
            Product p4 = createProductIfAbsent("Denim Jacket", "20004", 800.0, 2799.0, 2499.0, "Levi's", "Classic indigo denim trucker jacket. Button front closure, adjustable waist tabs.", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80", 15, "Men's Clothing", store, branch);
            Product p5 = createProductIfAbsent("Formal Blazer", "20005", 1200.0, 4499.0, 3999.0, "Van Heusen", "Slim-fit single-breasted formal blazer. Notch lapel, two-button closure. Navy blue.", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", 10, "Men's Clothing", store, branch);
            Product p6 = createProductIfAbsent("Cargo Shorts", "20006", 300.0, 999.0, 899.0, "Roadster", "Relaxed-fit cotton cargo shorts with multiple pockets. Drawstring hem. Olive green.", "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80", 50, "Men's Clothing", store, branch);
            Product p7 = createProductIfAbsent("Polo T-Shirt", "20007", 250.0, 999.0, 849.0, "Allen Solly", "Piqué cotton polo with tipped collar and sleeve hems. Embroidered logo.", "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&auto=format&fit=crop&q=80", 60, "Men's Clothing", store, branch);

            Product p8 = createProductIfAbsent("Floral Wrap Dress", "20008", 600.0, 2299.0, 1999.0, "AND", "Lightweight georgette wrap dress with floral print. V-neckline, adjustable belt tie.", "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80", 20, "Women's Clothing", store, branch);
            Product p9 = createProductIfAbsent("High-Rise Skinny Jeans", "20009", 700.0, 2499.0, 2199.0, "Levi's", "Stretchable high-rise skinny jeans. Dark wash, ankle length. Zip & button closure.", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80", 25, "Women's Clothing", store, branch);
            Product p10 = createProductIfAbsent("Embroidered Kurti", "20010", 400.0, 1499.0, 1299.0, "W", "Cotton blend straight-cut kurti with thread embroidery. 3/4 sleeves, mandarin collar.", "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80", 35, "Women's Clothing", store, branch);
            Product p11 = createProductIfAbsent("Ruffle Blouse", "20011", 350.0, 1299.0, 1099.0, "Vero Moda", "Elegant ruffled blouse in pastel crepe fabric. Front button closure. Ideal for office wear.", "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80", 30, "Women's Clothing", store, branch);
            Product p12 = createProductIfAbsent("Palazzo Pants", "20012", 300.0, 1199.0, 999.0, "Global Desi", "Wide-leg palazzo pants in pleated polyester. Elasticated waistband. Multiple colors.", "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80", 40, "Women's Clothing", store, branch);
            Product p13 = createProductIfAbsent("Cropped Hoodie", "20013", 450.0, 1699.0, 1499.0, "H&M", "Fleece-lined cropped hoodie with kangaroo pocket. Drawstring hood, ribbed cuffs.", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80", 20, "Women's Clothing", store, branch);

            Product p14 = createProductIfAbsent("Running Sneakers", "20014", 900.0, 3499.0, 2999.0, "Nike", "Lightweight mesh running shoes with cushioned insole. Breathable upper, rubber outsole.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80", 20, "Footwear", store, branch);
            Product p15 = createProductIfAbsent("Leather Formal Shoes", "20015", 1200.0, 4999.0, 4499.0, "Clarks", "Genuine leather oxford shoes. Hand-stitched welt, leather sole. Tan brown.", "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80", 12, "Footwear", store, branch);
            Product p16 = createProductIfAbsent("Canvas Slip-On", "20016", 350.0, 1499.0, 1299.0, "Vans", "Classic slip-on canvas shoe. Elastic side accents, padded collar, vulcanized sole.", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80", 40, "Footwear", store, branch);
            Product p17 = createProductIfAbsent("Women's Block Heels", "20017", 600.0, 2299.0, 1999.0, "Inc.5", "Suede block-heel sandals with ankle strap. 3-inch heel, cushioned footbed.", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80", 15, "Footwear", store, branch);
            Product p18 = createProductIfAbsent("Sports Flip Flops", "20018", 100.0, 499.0, 399.0, "Adidas", "EVA cushioned flip-flops with textured footbed. Water-resistant, quick-dry.", "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80", 60, "Footwear", store, branch);

            Product p19 = createProductIfAbsent("Cotton Bed Sheet Set", "20019", 500.0, 1999.0, 1799.0, "Spaces", "King-size 300 TC cotton bedsheet with 2 pillow covers. Geometric print. Machine-washable.", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80", 25, "Home & Kitchen", store, branch);
            Product p20 = createProductIfAbsent("Non-Stick Cookware Set", "20020", 800.0, 2999.0, 2599.0, "Prestige", "5-piece aluminum non-stick cookware set. Includes frying pan, saucepan, kadai, tawa, spatula.", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80", 10, "Home & Kitchen", store, branch);
            Product p21 = createProductIfAbsent("Bath Towel Set", "20021", 350.0, 1399.0, 1199.0, "Trident", "Set of 4 ultra-soft 100% cotton bath towels. 500 GSM, quick-dry. Assorted colors.", "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&auto=format&fit=crop&q=80", 30, "Home & Kitchen", store, branch);
            Product p22 = createProductIfAbsent("Cushion Cover Set", "20022", 200.0, 799.0, 699.0, "Cortina", "Set of 5 decorative cushion covers. Velvet fabric, zip closure. 16x16 inches.", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80", 45, "Home & Kitchen", store, branch);
            Product p23 = createProductIfAbsent("Stainless Steel Water Bottle", "20023", 250.0, 999.0, 849.0, "Milton", "1 Liter double-wall vacuum insulated bottle. Keeps hot 12hr / cold 24hr. BPA free.", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80", 50, "Home & Kitchen", store, branch);
            Product p24 = createProductIfAbsent("LED Desk Lamp", "20024", 400.0, 1599.0, 1399.0, "Philips", "Adjustable arm LED desk lamp with touch dimmer. 3 color temperatures, USB charging port.", "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&auto=format&fit=crop&q=80", 20, "Home & Kitchen", store, branch);

            Product p25 = createProductIfAbsent("Face Wash 150ml", "20025", 80.0, 350.0, 299.0, "Himalaya", "Oil-control face wash with neem & turmeric extracts. For oily & combination skin.", "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop&q=80", 70, "Personal Care", store, branch);
            Product p26 = createProductIfAbsent("Body Lotion 400ml", "20026", 120.0, 499.0, 449.0, "Nivea", "Deep moisture body lotion with cocoa butter & vitamin E. Non-greasy, long-lasting.", "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&auto=format&fit=crop&q=80", 55, "Personal Care", store, branch);
            Product p27 = createProductIfAbsent("Hair Dryer 1800W", "20027", 500.0, 1899.0, 1699.0, "Philips", "Professional ionic hair dryer with 2 speed settings and cool-shot button. Includes diffuser.", "https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=600&auto=format&fit=crop&q=80", 18, "Personal Care", store, branch);
            Product p28 = createProductIfAbsent("Perfume 100ml EDP", "20028", 600.0, 2499.0, 2199.0, "Fogg", "Eau de Parfum with top notes of bergamot, heart of jasmine, base of sandalwood.", "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80", 25, "Personal Care", store, branch);
            Product p29 = createProductIfAbsent("Electric Trimmer", "20029", 400.0, 1599.0, 1399.0, "Braun", "Cordless beard trimmer with 20 length settings. 90 min runtime, USB-C charging.", "https://images.unsplash.com/photo-1621607512022-6aecc52ceaa2?w=600&auto=format&fit=crop&q=80", 22, "Personal Care", store, branch);

            Product p30 = createProductIfAbsent("Laptop Backpack", "20030", 450.0, 1799.0, 1599.0, "Wildcraft", "15.6 inch laptop backpack with USB charging port. Water-resistant polyester, padded straps.", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80", 30, "Bags & Accessories", store, branch);
            Product p31 = createProductIfAbsent("Women's Tote Bag", "20031", 500.0, 1999.0, 1799.0, "Lavie", "Spacious PU leather tote with inner organizer pockets. Magnetic snap closure. Beige.", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80", 20, "Bags & Accessories", store, branch);
            Product p32 = createProductIfAbsent("Aviator Sunglasses", "20032", 350.0, 1499.0, 1299.0, "Ray-Ban", "Polarized aviator sunglasses with UV400 protection. Metal frame, spring hinges.", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80", 25, "Bags & Accessories", store, branch);
            Product p33 = createProductIfAbsent("Leather Belt", "20033", 200.0, 899.0, 799.0, "Tommy Hilfiger", "Genuine leather reversible belt. Black/brown, auto-lock buckle. Adjustable length.", "https://images.unsplash.com/photo-1553591589-2e5d2a6e04b4?w=600&auto=format&fit=crop&q=80", 35, "Bags & Accessories", store, branch);
            Product p34 = createProductIfAbsent("Analog Wrist Watch", "20034", 800.0, 3499.0, 2999.0, "Fossil", "Stainless steel analog watch with mineral crystal. Water-resistant 50m. Leather strap.", "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80", 12, "Bags & Accessories", store, branch);

            Product p35 = createProductIfAbsent("Kids Cartoon T-Shirt", "20035", 150.0, 599.0, 499.0, "Max", "Printed cotton t-shirt for kids (4-8 yrs). Round neck, half sleeves. Fun cartoon designs.", "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80", 45, "Kids & Baby", store, branch);
            Product p36 = createProductIfAbsent("Baby Romper Set", "20036", 250.0, 999.0, 849.0, "Mothercare", "Soft organic cotton romper + bib set (0-12 months). Snap button closure. Pastel shades.", "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80", 30, "Kids & Baby", store, branch);
            Product p37 = createProductIfAbsent("Kids Canvas Shoes", "20037", 300.0, 1299.0, 1099.0, "Converse", "Lace-up canvas sneakers for kids. Cushioned insole, non-marking rubber outsole.", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80", 20, "Kids & Baby", store, branch);
            Product p38 = createProductIfAbsent("School Backpack", "20038", 300.0, 1199.0, 999.0, "Skybags", "Lightweight school bag with reflective strips. Multiple compartments, padded back.", "https://images.unsplash.com/photo-1577401239170-897c3cc71e93?w=600&auto=format&fit=crop&q=80", 25, "Kids & Baby", store, branch);

            Product p39 = createProductIfAbsent("Premium Notebook A5", "20039", 80.0, 349.0, 299.0, "Classmate", "Hard-cover ruled notebook, 192 pages, 100 GSM acid-free paper. Lay-flat binding.", "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80", 60, "Stationery & Office", store, branch);
            Product p40 = createProductIfAbsent("Ball Pen Set (10 Pack)", "20040", 30.0, 150.0, 120.0, "Cello", "Smooth-writing ball pens with 0.7mm tip. Blue ink, comfortable grip. Pack of 10.", "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&auto=format&fit=crop&q=80", 100, "Stationery & Office", store, branch);
            Product p41 = createProductIfAbsent("Desk Organizer", "20041", 250.0, 999.0, 849.0, "Wooden Street", "Multi-compartment wooden desk organizer. Holds pens, phone, cards, paper clips.", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80", 15, "Stationery & Office", store, branch);
            Product p42 = createProductIfAbsent("Wireless Mouse", "20042", 200.0, 799.0, 699.0, "Logitech", "Ergonomic wireless mouse with silent clicks. 2.4GHz nano receiver, 18-month battery.", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80", 35, "Stationery & Office", store, branch);
            Product p43 = createProductIfAbsent("Mechanical Keyboard", "20043", 800.0, 3499.0, 2999.0, "Keychron", "Compact 65% mechanical keyboard. Hot-swappable switches, RGB backlight, USB-C.", "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80", 10, "Stationery & Office", store, branch);

            // Seed Customers
            Customer c1 = createCustomerIfAbsent("John Doe", "john@example.com", "+1-555-1234");
            Customer c2 = createCustomerIfAbsent("Alice Smith", "alice@example.com", "+1-555-5678");
            Customer c3 = createCustomerIfAbsent("Bob Johnson", "bob@example.com", "+1-555-9012");
            Customer c4 = createCustomerIfAbsent("Emma Davis", "emma@example.com", "+1-555-3456");
            Customer c5 = createCustomerIfAbsent("Michael Wilson", "michael@example.com", "+1-555-7890");

            // Seed Orders & Items
            if (orderRepository.count() <= 1) {
                // Delete existing mock orders to establish a clean, consistent set of historical orders
                orderRepository.deleteAll();

                // Order 1: 6 days ago (CARD)
                createOrder(LocalDateTime.now().minusDays(6), PaymentType.CARD, branch, cashier, c1,
                        Arrays.asList(new OrderItemInfo(p14, 1, 2999.0)));

                // Order 2: 6 days ago (CASH)
                createOrder(LocalDateTime.now().minusDays(6).plusHours(2), PaymentType.CASH, branch, cashier, c2,
                        Arrays.asList(new OrderItemInfo(p3, 1, 499.0)));

                // Order 3: 5 days ago (CARD)
                createOrder(LocalDateTime.now().minusDays(5), PaymentType.CARD, branch, cashier, c3,
                        Arrays.asList(new OrderItemInfo(p15, 1, 4499.0)));

                // Order 4: 5 days ago (UPI)
                createOrder(LocalDateTime.now().minusDays(5).plusHours(3), PaymentType.UPI, branch, cashier, c4,
                        Arrays.asList(new OrderItemInfo(p27, 1, 1699.0)));

                // Order 5: 4 days ago (CARD)
                createOrder(LocalDateTime.now().minusDays(4), PaymentType.CARD, branch, cashier, c5,
                        Arrays.asList(new OrderItemInfo(p43, 1, 2999.0)));

                // Order 6: 3 days ago (CASH)
                createOrder(LocalDateTime.now().minusDays(3), PaymentType.CASH, branch, cashier, c1,
                        Arrays.asList(new OrderItemInfo(p19, 1, 1799.0)));

                // Order 7: 3 days ago (UPI)
                Order o7 = createOrder(LocalDateTime.now().minusDays(3).plusHours(1), PaymentType.UPI, branch, cashier, c2,
                        Arrays.asList(new OrderItemInfo(p22, 1, 699.0)));

                // Order 8: 2 days ago (CARD)
                createOrder(LocalDateTime.now().minusDays(2), PaymentType.CARD, branch, cashier, c3,
                        Arrays.asList(new OrderItemInfo(p34, 1, 2999.0)));

                // Order 9: 1 day ago (CASH)
                createOrder(LocalDateTime.now().minusDays(1), PaymentType.CASH, branch, cashier, c4,
                        Arrays.asList(new OrderItemInfo(p30, 1, 1599.0)));

                // Order 10: 1 day ago (UPI)
                createOrder(LocalDateTime.now().minusDays(1).plusHours(4), PaymentType.UPI, branch, cashier, c5,
                        Arrays.asList(new OrderItemInfo(p28, 1, 2199.0)));

                // Order 11: Today (CASH)
                createOrder(LocalDateTime.now().minusMinutes(50), PaymentType.CASH, branch, cashier, c1,
                        Arrays.asList(new OrderItemInfo(p23, 1, 849.0)));

                // Order 12: Today (UPI)
                createOrder(LocalDateTime.now().minusMinutes(30), PaymentType.UPI, branch, cashier, c2,
                        Arrays.asList(new OrderItemInfo(p32, 1, 1299.0)));

                // Order 13: Today (CARD)
                createOrder(LocalDateTime.now().minusMinutes(10), PaymentType.CARD, branch, cashier, c3,
                        Arrays.asList(new OrderItemInfo(p5, 1, 3999.0)));

                // Order 14: Multi-item 2 days ago (UPI)
                createOrder(LocalDateTime.now().minusDays(2).plusHours(5), PaymentType.UPI, branch, cashier, c4,
                        Arrays.asList(
                            new OrderItemInfo(p40, 2, 120.0),
                            new OrderItemInfo(p39, 3, 299.0),
                            new OrderItemInfo(p42, 1, 699.0)
                        ));

                // Seed Historical Shift Reports and Refunds
                if (shiftReportRepository.count() == 0) {
                    // Shift report 6 days ago (closed)
                    ShiftReport sr6 = createShiftReport(
                        LocalDateTime.now().minusDays(6).withHour(9).withMinute(0),
                        LocalDateTime.now().minusDays(6).withHour(18).withMinute(0),
                        3498.0, 0.0, 2, cashier, branch, Arrays.asList(p14, p3));

                    // Shift report 5 days ago (closed)
                    ShiftReport sr5 = createShiftReport(
                        LocalDateTime.now().minusDays(5).withHour(9).withMinute(0),
                        LocalDateTime.now().minusDays(5).withHour(18).withMinute(0),
                        6198.0, 0.0, 2, cashier, branch, Arrays.asList(p15, p27));

                    // Shift report 4 days ago (closed)
                    ShiftReport sr4 = createShiftReport(
                        LocalDateTime.now().minusDays(4).withHour(9).withMinute(0),
                        LocalDateTime.now().minusDays(4).withHour(18).withMinute(0),
                        2999.0, 0.0, 1, cashier, branch, Arrays.asList(p43));

                    // Shift report 3 days ago (closed) with a refund
                    ShiftReport sr3 = createShiftReport(
                        LocalDateTime.now().minusDays(3).withHour(9).withMinute(0),
                        LocalDateTime.now().minusDays(3).withHour(18).withMinute(0),
                        2498.0, 699.0, 2, cashier, branch, Arrays.asList(p19, p22));

                    createRefund("Defective item", 699.0, LocalDateTime.now().minusDays(3).plusHours(2),
                        PaymentType.UPI, o7, sr3, cashier, branch);

                    // Shift report 2 days ago (closed)
                    ShiftReport sr2 = createShiftReport(
                        LocalDateTime.now().minusDays(2).withHour(9).withMinute(0),
                        LocalDateTime.now().minusDays(2).withHour(18).withMinute(0),
                        4835.0, 0.0, 2, cashier, branch, Arrays.asList(p34, p42, p39));

                    // Shift report 1 day ago (closed)
                    ShiftReport sr1 = createShiftReport(
                        LocalDateTime.now().minusDays(1).withHour(9).withMinute(0),
                        LocalDateTime.now().minusDays(1).withHour(18).withMinute(0),
                        3798.0, 0.0, 2, cashier, branch, Arrays.asList(p30, p28));
                }
            }

            // Seed active shift report if none exists
            Optional<ShiftReport> activeShiftOpt = shiftReportRepository.findTopByCashierAndShiftEndTimeIsNullOrderByShiftStartTimeDesc(cashier);
            if (activeShiftOpt.isEmpty()) {
                ShiftReport activeShift = new ShiftReport();
                activeShift.setShiftStartTime(LocalDateTime.now().minusHours(4));
                activeShift.setCashier(cashier);
                activeShift.setBranch(branch);
                activeShift.setTotalSales(6147.0); // total from today's orders (849 + 1299 + 3999)
                activeShift.setTotalRefunds(0.0);
                activeShift.setNetSales(6147.0);
                activeShift.setTotalOrders(3);
                shiftReportRepository.save(activeShift);
                System.out.println("✓ Seeded active shift report starting 4 hours ago");
            }
        }

        System.out.println("✓ Data initialization complete!");
    }

    private Category createCategoryIfAbsent(String name, Store store) {
        return categoryRepository.findByNameAndStoreId(name, store.getId())
                .orElseGet(() -> {
                    Category cat = new Category();
                    cat.setName(name);
                    cat.setStore(store);
                    Category saved = categoryRepository.save(cat);
                    System.out.println("✓ Seeded category: " + name);
                    return saved;
                });
    }

    private Product createProductIfAbsent(
            String name,
            String barcode,
            double costPrice,
            double mrp,
            double sellingPrice,
            String brand,
            String description,
            String image,
            int stockQuantity,
            String categoryName,
            Store store,
            Branch branch) {
        
        Category category = createCategoryIfAbsent(categoryName, store);

        Optional<Product> existingProductOpt = productRepository.findByBarcode(barcode);
        Product product;
        if (existingProductOpt.isPresent()) {
            product = existingProductOpt.get();
        } else {
            product = new Product();
            product.setName(name);
            product.setBarcode(barcode);
            product.setCostPrice(costPrice);
            product.setMrp(mrp);
            product.setSellingPrice(sellingPrice);
            product.setBrand(brand);
            product.setDescription(description);
            product.setImage(image);
            product.setStockQuantity(stockQuantity);
            product.setStore(store);
            product.setCategory(category);
            product = productRepository.save(product);
            System.out.println("✓ Seeded product: " + name + " (" + barcode + ")");
        }

        if (branch != null) {
            Inventory inv = inventoryRepository.findByProductIdAndBranchId(product.getId(), branch.getId());
            if (inv == null) {
                inv = new Inventory();
                inv.setBranch(branch);
                inv.setProduct(product);
                inv.setQuantity(stockQuantity);
                inventoryRepository.save(inv);
                System.out.println("✓ Seeded inventory for product: " + name + " in branch: " + branch.getName());
            }
        }
        
        return product;
    }

    private Customer createCustomerIfAbsent(String fullName, String email, String phone) {
        return customerRepository.findByEmail(email)
                .orElseGet(() -> {
                    Customer customer = new Customer();
                    customer.setFullName(fullName);
                    customer.setEmail(email);
                    customer.setPhone(phone);
                    Customer saved = customerRepository.save(customer);
                    System.out.println("✓ Seeded customer: " + fullName);
                    return saved;
                });
    }

    private Order createOrder(
            LocalDateTime createdAt,
            PaymentType paymentType,
            Branch branch,
            User cashier,
            Customer customer,
            List<OrderItemInfo> itemsInfo) {
        
        Order order = new Order();
        order.setCreatedAt(createdAt);
        order.setPaymentType(paymentType);
        order.setOrderStatus(OrderStatus.COMPLETED);
        
        double totalAmount = 0.0;
        java.util.List<OrderItem> items = new java.util.ArrayList<>();
        for (OrderItemInfo info : itemsInfo) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(info.product);
            item.setQuantity(info.quantity);
            item.setPrice(info.price);
            items.add(item);
            totalAmount += info.price * info.quantity;
        }
        
        order.setTotalAmount(totalAmount);
        order.setItems(items);
        Order savedOrder = orderRepository.save(order);
        System.out.println("✓ Seeded order with total amount: " + totalAmount + " on " + createdAt);
        return savedOrder;
    }

    private ShiftReport createShiftReport(
            LocalDateTime startTime,
            LocalDateTime endTime,
            double totalSales,
            double totalRefunds,
            int totalOrders,
            User cashier,
            Branch branch,
            List<Product> topSelling) {
        
        ShiftReport report = new ShiftReport();
        report.setShiftStartTime(startTime);
        report.setShiftEndTime(endTime);
        report.setTotalSales(totalSales);
        report.setTotalRefunds(totalRefunds);
        report.setNetSales(totalSales - totalRefunds);
        report.setTotalOrders(totalOrders);
        report.setCashier(cashier);
        report.setBranch(branch);
        report.setTopSellingProducts(topSelling);
        return shiftReportRepository.save(report);
    }

    private void createRefund(
            String reason,
            double amount,
            LocalDateTime createdAt,
            PaymentType paymentType,
            Order order,
            ShiftReport shiftReport,
            User cashier,
            Branch branch) {
        
        Refund refund = new Refund();
        refund.setReason(reason);
        refund.setAmount(amount);
        refund.setCreatedAt(createdAt);
        refund.setPaymentType(paymentType);
        refund.setOrder(order);
        refund.setShiftReport(shiftReport);
        refund.setCashier(cashier);
        refund.setBranch(branch);
        refundRepository.save(refund);
    }
    
    private static class OrderItemInfo {
        Product product;
        int quantity;
        double price;
        
        OrderItemInfo(Product product, int quantity, double price) {
            this.product = product;
            this.quantity = quantity;
            this.price = price;
        }
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

