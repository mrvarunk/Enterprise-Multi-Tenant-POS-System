package com.pos.saas.seeder;

import com.pos.saas.domain.StoreStatus;
import com.pos.saas.model.Category;
import com.pos.saas.model.Product;
import com.pos.saas.model.Store;
import com.pos.saas.model.StoreContact;
import com.pos.saas.repository.CategoryRepository;
import com.pos.saas.repository.ProductRepository;
import com.pos.saas.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            log.info("Database is empty. Initiating automatic data seeding...");

            // Get or create store (Assuming ID 1 is the primary store for this SaaS tenant)
            Store store = storeRepository.findById(1L).orElse(null);
            
            if (store == null) {
                log.warn("Store ID 1 not found. Creating a default store for seeding.");
                store = Store.builder()
                        .brand("StoreOS Retail Flagship")
                        .description("Premium fashion retail outlet")
                        .storeType("Retail")
                        .status(StoreStatus.ACTIVE)
                        .contact(StoreContact.builder()
                                .address("123 Commerce Avenue")
                                .email("contact@storeos.com")
                                .phone("+1 800 555 0199")
                                .build())
                        .build();
                store = storeRepository.save(store);
            }

            // Seed Categories
            Category apparel = categoryRepository.save(Category.builder().name("Premium Apparel").store(store).build());
            Category footwear = categoryRepository.save(Category.builder().name("Designer Footwear").store(store).build());
            Category accessories = categoryRepository.save(Category.builder().name("Luxury Accessories").store(store).build());

            // Seed Premium Products
            List<Product> products = Arrays.asList(
                    Product.builder()
                            .name("Cashmere Blend Overcoat")
                            .barcode("10001001")
                            .description("Luxurious cashmere and wool blend overcoat with a tailored fit.")
                            .costPrice(120.00)
                            .mrp(299.99)
                            .sellingPrice(249.99)
                            .brand("Aura Noir")
                            .stockQuantity(45)
                            .image("https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop")
                            .category(apparel)
                            .store(store)
                            .build(),
                    Product.builder()
                            .name("Silk Evening Blouse")
                            .barcode("10001002")
                            .description("100% pure silk blouse with delicate draping.")
                            .costPrice(45.00)
                            .mrp(120.00)
                            .sellingPrice(95.00)
                            .brand("Verona")
                            .stockQuantity(30)
                            .image("https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600&auto=format&fit=crop")
                            .category(apparel)
                            .store(store)
                            .build(),
                    Product.builder()
                            .name("Italian Leather Loafers")
                            .barcode("10002001")
                            .description("Handcrafted Italian leather loafers featuring a classic profile.")
                            .costPrice(85.00)
                            .mrp(195.00)
                            .sellingPrice(175.00)
                            .brand("Vittorio")
                            .stockQuantity(60)
                            .image("https://images.unsplash.com/photo-1614252339474-12965c40ba7b?q=80&w=600&auto=format&fit=crop")
                            .category(footwear)
                            .store(store)
                            .build(),
                    Product.builder()
                            .name("Minimalist Canvas Sneakers")
                            .barcode("10002002")
                            .description("Clean, minimalist sneakers perfect for everyday luxury.")
                            .costPrice(30.00)
                            .mrp(85.00)
                            .sellingPrice(75.00)
                            .brand("Lumina")
                            .stockQuantity(120)
                            .image("https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop")
                            .category(footwear)
                            .store(store)
                            .build(),
                    Product.builder()
                            .name("Chronograph Leather Watch")
                            .barcode("10003001")
                            .description("Precision chronograph movement with a genuine leather strap.")
                            .costPrice(65.00)
                            .mrp(180.00)
                            .sellingPrice(150.00)
                            .brand("Zeitgeist")
                            .stockQuantity(25)
                            .image("https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop")
                            .category(accessories)
                            .store(store)
                            .build(),
                    Product.builder()
                            .name("Oversized Gradient Sunglasses")
                            .barcode("10003002")
                            .description("UV400 protection with a stylish oversized gradient lens.")
                            .costPrice(15.00)
                            .mrp(45.00)
                            .sellingPrice(35.00)
                            .brand("Solaris")
                            .stockQuantity(80)
                            .image("https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop")
                            .category(accessories)
                            .store(store)
                            .build()
            );

            productRepository.saveAll(products);
            log.info("Successfully seeded {} categories and {} premium products.", 3, products.size());
        }
    }
}
