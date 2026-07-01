package com.pos.saas.seeder;

import com.pos.saas.domain.StoreStatus;
import com.pos.saas.model.Category;
import com.pos.saas.model.Product;
import com.pos.saas.model.Store;
import com.pos.saas.model.StoreContact;
import com.pos.saas.repository.CategoryRepository;
import com.pos.saas.repository.InventoryRepository;
import com.pos.saas.repository.OrderItemRepository;
import com.pos.saas.repository.OrderRepository;
import com.pos.saas.repository.ProductRepository;
import com.pos.saas.repository.RefundRepository;
import com.pos.saas.repository.ShiftReportRepository;
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
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final RefundRepository refundRepository;
    private final InventoryRepository inventoryRepository;
    private final ShiftReportRepository shiftReportRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Wiping old retail products to migrate to CafeOps...");
        // Delete in order of foreign key dependencies: refunds -> order_items -> orders -> inventory -> shift reports -> products -> categories
        refundRepository.deleteAll();
        orderItemRepository.deleteAll();
        orderRepository.deleteAll();
        inventoryRepository.deleteAll();
        shiftReportRepository.deleteAll();
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        // Get or create store (Assuming ID 1 is the primary store for this SaaS tenant)
        Store store = storeRepository.findById(1L).orElse(null);
        
        if (store == null) {
            store = Store.builder()
                    .brand("CafeOps Flagship")
                    .description("Premium Cafe and Coffee Shop")
                    .storeType("Cafe")
                    .status(StoreStatus.ACTIVE)
                    .contact(StoreContact.builder()
                            .address("123 Coffee Lane")
                            .email("hello@cafeops.com")
                            .phone("+1 800 555 0199")
                            .build())
                    .build();
        } else {
            store.setBrand("CafeOps Flagship");
            store.setStoreType("Cafe");
        }
        store = storeRepository.save(store);

        // Seed Categories
        Category espresso = categoryRepository.save(Category.builder().name("Espresso").store(store).build());
        Category iced = categoryRepository.save(Category.builder().name("Iced Drinks").store(store).build());
        Category tea = categoryRepository.save(Category.builder().name("Tea & Matcha").store(store).build());
        Category pastries = categoryRepository.save(Category.builder().name("Pastries").store(store).build());
        Category smoothies = categoryRepository.save(Category.builder().name("Smoothies").store(store).build());
        Category specials = categoryRepository.save(Category.builder().name("Specials").store(store).build());
        Category sandwiches = categoryRepository.save(Category.builder().name("Sandwiches").store(store).build());
        Category snacks = categoryRepository.save(Category.builder().name("Snacks").store(store).build());
        Category beans = categoryRepository.save(Category.builder().name("Coffee Beans").store(store).build());

        // Seed Cafe Products
        List<Product> products = Arrays.asList(
                // Espresso
                Product.builder().name("Espresso").barcode("CAF001").description("Rich single-origin espresso shot.").costPrice(40.0).mrp(280.0).sellingPrice(250.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600").category(espresso).store(store).build(),
                Product.builder().name("Americano").barcode("CAF002").description("Espresso diluted with hot water.").costPrice(45.0).mrp(320.0).sellingPrice(280.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600").category(espresso).store(store).build(),
                Product.builder().name("Cappuccino").barcode("CAF003").description("Equal parts espresso, steamed milk, and foam.").costPrice(55.0).mrp(380.0).sellingPrice(340.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600").category(espresso).store(store).build(),
                Product.builder().name("Latte").barcode("CAF004").description("Espresso with velvety steamed milk.").costPrice(60.0).mrp(420.0).sellingPrice(380.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1561882468-9110d70b3dda?w=600").category(espresso).store(store).build(),
                // Iced Drinks
                Product.builder().name("Iced Latte").barcode("CAF009").description("Cold espresso poured over ice with chilled milk.").costPrice(60.0).mrp(430.0).sellingPrice(390.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1517959105821-eaf2591984d2?w=600").category(iced).store(store).build(),
                Product.builder().name("Cold Brew").barcode("CAF010").description("18-hour slow-steeped cold brew.").costPrice(50.0).mrp(400.0).sellingPrice(360.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600").category(iced).store(store).build(),
                // Tea & Matcha
                Product.builder().name("Matcha Latte").barcode("CAF014").description("Ceremonial grade matcha whisked with steamed oat milk.").costPrice(65.0).mrp(450.0).sellingPrice(410.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600").category(tea).store(store).build(),
                Product.builder().name("Chai Latte").barcode("CAF015").description("Spiced masala chai concentrate with steamed whole milk.").costPrice(55.0).mrp(390.0).sellingPrice(350.0).brand("CafeOps").stockQuantity(999).image("https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?w=600").category(tea).store(store).build(),
                // Pastries
                Product.builder().name("Butter Croissant").barcode("CAF018").description("Flaky, golden French-style butter croissant.").costPrice(80.0).mrp(320.0).sellingPrice(290.0).brand("CafeOps").stockQuantity(50).image("https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600").category(pastries).store(store).build(),
                Product.builder().name("Blueberry Muffin").barcode("CAF019").description("Moist vanilla muffin bursting with fresh blueberries.").costPrice(90.0).mrp(350.0).sellingPrice(320.0).brand("CafeOps").stockQuantity(40).image("https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600").category(pastries).store(store).build(),
                // Smoothies
                Product.builder().name("Mango Smoothie").barcode("CAF024").description("Alphonso mango blended with yogurt and honey.").costPrice(80.0).mrp(480.0).sellingPrice(440.0).brand("CafeOps").stockQuantity(60).image("https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600").category(smoothies).store(store).build(),
                Product.builder().name("Berry Blast").barcode("CAF025").description("Blueberry, strawberry, and raspberry blend.").costPrice(85.0).mrp(500.0).sellingPrice(460.0).brand("CafeOps").stockQuantity(55).image("https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600").category(smoothies).store(store).build(),
                // Specials
                Product.builder().name("Affogato").barcode("CAF028").description("Vanilla gelato drowned in a hot ristretto shot.").costPrice(90.0).mrp(480.0).sellingPrice(440.0).brand("CafeOps").stockQuantity(30).image("https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600").category(specials).store(store).build(),
                Product.builder().name("Lavender Latte").barcode("CAF029").description("House-made lavender syrup with espresso.").costPrice(70.0).mrp(460.0).sellingPrice(420.0).brand("CafeOps").stockQuantity(40).image("https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600").category(specials).store(store).build(),
                
                // Sandwiches
                Product.builder().name("Turkey Avocado Wrap").barcode("CAF030").description("Smoked turkey, fresh avocado, spinach, and garlic aioli.").costPrice(120.0).mrp(450.0).sellingPrice(390.0).brand("CafeOps").stockQuantity(25).image("https://images.unsplash.com/photo-1628191010210-a59de33e5941?w=600").category(sandwiches).store(store).build(),
                Product.builder().name("Caprese Sandwich").barcode("CAF031").description("Fresh mozzarella, tomatoes, basil pesto on ciabatta.").costPrice(110.0).mrp(420.0).sellingPrice(350.0).brand("CafeOps").stockQuantity(20).image("https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600").category(sandwiches).store(store).build(),
                Product.builder().name("Breakfast Croissant").barcode("CAF032").description("Scrambled eggs, cheddar cheese, and bacon on a flaky croissant.").costPrice(90.0).mrp(350.0).sellingPrice(300.0).brand("CafeOps").stockQuantity(35).image("https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600").category(sandwiches).store(store).build(),
                
                // Snacks
                Product.builder().name("Mixed Nuts 100g").barcode("CAF040").description("Roasted almonds, cashews, and walnuts.").costPrice(50.0).mrp(250.0).sellingPrice(200.0).brand("CafeOps").stockQuantity(100).image("https://images.unsplash.com/photo-1599598425947-330026296904?w=600").category(snacks).store(store).build(),
                Product.builder().name("Dark Chocolate Granola Bar").barcode("CAF041").description("Oats, honey, and 70% dark chocolate chunks.").costPrice(30.0).mrp(150.0).sellingPrice(120.0).brand("CafeOps").stockQuantity(80).image("https://images.unsplash.com/photo-1610405202685-618a36802e97?w=600").category(snacks).store(store).build(),
                Product.builder().name("Seasonal Fruit Bowl").barcode("CAF042").description("Freshly cut seasonal fruits.").costPrice(60.0).mrp(220.0).sellingPrice(180.0).brand("CafeOps").stockQuantity(15).image("https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600").category(snacks).store(store).build(),
                
                // Coffee Beans
                Product.builder().name("House Blend 250g").barcode("CAF050").description("Medium roast with notes of chocolate and caramel.").costPrice(250.0).mrp(850.0).sellingPrice(750.0).brand("CafeOps").stockQuantity(50).image("https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600").category(beans).store(store).build(),
                Product.builder().name("Ethiopian Yirgacheffe 250g").barcode("CAF051").description("Light roast, floral with bright acidity.").costPrice(300.0).mrp(1100.0).sellingPrice(950.0).brand("CafeOps").stockQuantity(40).image("https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=600").category(beans).store(store).build(),
                Product.builder().name("Colombian Supremo 250g").barcode("CAF052").description("Dark roast, full-bodied with dark chocolate notes.").costPrice(280.0).mrp(950.0).sellingPrice(800.0).brand("CafeOps").stockQuantity(45).image("https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600").category(beans).store(store).build()
        );

        productRepository.saveAll(products);
        log.info("Successfully seeded {} cafe categories and {} cafe products.", 9, products.size());
    }
}
