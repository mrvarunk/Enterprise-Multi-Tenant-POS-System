-- ============================================================
-- CafeOps — Cafe & Food Product Seed (PostgreSQL)
-- Automatically executed by Spring Boot @ application startup
-- ============================================================

-- 1. Clear dependent data first (order references products)
DELETE FROM order_item;
DELETE FROM orders;
DELETE FROM shift_report_top_products;
DELETE FROM shift_report;
DELETE FROM product;
DELETE FROM categories;

-- 2. Reset sequences
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE product_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 50;
ALTER SEQUENCE order_item_id_seq RESTART WITH 100;
ALTER SEQUENCE shift_report_id_seq RESTART WITH 1;

-- ============================================================
-- CATEGORIES (store_id = 1)
-- ============================================================
INSERT INTO categories (id, name, store_id) VALUES
(1, 'Espresso',    1),
(2, 'Iced Drinks', 1),
(3, 'Tea & Matcha',1),
(4, 'Pastries',    1),
(5, 'Smoothies',   1),
(6, 'Specials',    1);

-- ============================================================
-- PRODUCTS (store_id = 1)
-- Columns: id, name, barcode, description, cost_price, mrp,
--          selling_price, brand, stock_quantity, store_id,
--          category_id, sku_id, image, created_at
-- ============================================================

-- ─── Espresso (category 1) ────────────────────────────────
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES
(10, 'Espresso',       'CAF001', 'Rich single-origin espresso shot. Intense aroma, velvety crema.',          40,  280,  250, 'CafeOps', 999, 1, 1, 'CAF001', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '6 days'),
(11, 'Americano',      'CAF002', 'Espresso diluted with hot water. Bold, smooth, and clean finish.',          45,  320,  280, 'CafeOps', 999, 1, 1, 'CAF002', 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '5 days'),
(12, 'Cappuccino',     'CAF003', 'Equal parts espresso, steamed milk, and thick milk foam. Classic Italian.',  55,  380,  340, 'CafeOps', 999, 1, 1, 'CAF003', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '4 days'),
(13, 'Latte',          'CAF004', 'Espresso with velvety steamed milk. Mild, creamy, and comforting.',          60,  420,  380, 'CafeOps', 999, 1, 1, 'CAF004', 'https://images.unsplash.com/photo-1561882468-9110d70b3dda?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '3 days'),
(14, 'Flat White',     'CAF005', 'Ristretto shots with micro-foamed whole milk. Stronger than a latte.',       55,  400,  360, 'CafeOps', 999, 1, 1, 'CAF005', 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '2 days'),
(15, 'Mocha',          'CAF006', 'Espresso with chocolate syrup and steamed milk. Rich and indulgent.',         65,  450,  410, 'CafeOps', 999, 1, 1, 'CAF006', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '1 days'),
(16, 'Macchiato',      'CAF007', 'Espresso "stained" with a dash of foamed milk. Bold and quick.',             45,  310,  280, 'CafeOps', 999, 1, 1, 'CAF007', 'https://images.unsplash.com/photo-1485808191679-5f86510bd652?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '1 days'),
(17, 'Cortado',        'CAF008', 'Equal parts espresso and warm milk. Less foam, maximum flavor balance.',      50,  350,  320, 'CafeOps', 999, 1, 1, 'CAF008', 'https://images.unsplash.com/photo-1561882468-9110d70b3dda?w=600&auto=format&fit=crop&q=80', NOW());

-- ─── Iced Drinks (category 2) ─────────────────────────────
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES
(20, 'Iced Latte',     'CAF009', 'Cold espresso poured over ice with chilled milk. Refreshing and bold.',      60,  430,  390, 'CafeOps', 999, 1, 2, 'CAF009', 'https://images.unsplash.com/photo-1517959105821-eaf2591984d2?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '6 days'),
(21, 'Cold Brew',      'CAF010', '18-hour slow-steeped cold brew. Smooth, less acidic, naturally sweet.',      50,  400,  360, 'CafeOps', 999, 1, 2, 'CAF010', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '5 days'),
(22, 'Iced Americano', 'CAF011', 'Chilled espresso over ice with cold water. Clean and crisp.',                45,  330,  300, 'CafeOps', 999, 1, 2, 'CAF011', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '4 days'),
(23, 'Frappuccino',    'CAF012', 'Blended espresso with ice, milk, and flavored syrup. Topped with cream.',    75,  520,  470, 'CafeOps', 999, 1, 2, 'CAF012', 'https://images.unsplash.com/photo-1572490122747-3e92a2547abb?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '3 days'),
(24, 'Iced Mocha',     'CAF013', 'Cold espresso, chocolate, milk, and ice. Dessert in a cup.',                  70,  480,  440, 'CafeOps', 999, 1, 2, 'CAF013', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '2 days');

-- ─── Tea & Matcha (category 3) ────────────────────────────
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES
(30, 'Matcha Latte',   'CAF014', 'Ceremonial grade matcha whisked with steamed oat milk. Earthy and creamy.',  65,  450,  410, 'CafeOps', 999, 1, 3, 'CAF014', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '6 days'),
(31, 'Chai Latte',     'CAF015', 'Spiced masala chai concentrate with steamed whole milk. Warm and aromatic.',  55,  390,  350, 'CafeOps', 999, 1, 3, 'CAF015', 'https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '5 days'),
(32, 'Earl Grey',      'CAF016', 'Premium bergamot-infused black tea. Served with lemon or milk.',              30,  250,  220, 'CafeOps', 999, 1, 3, 'CAF016', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '4 days'),
(33, 'Iced Matcha',    'CAF017', 'Matcha over ice with cold oat milk. Vibrant green, fresh, and smooth.',       65,  440,  400, 'CafeOps', 999, 1, 3, 'CAF017', 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '3 days');

-- ─── Pastries (category 4) ────────────────────────────────
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES
(40, 'Butter Croissant',     'CAF018', 'Flaky, golden French-style butter croissant. Baked fresh daily.',              80,  320,  290, 'CafeOps', 50, 1, 4, 'CAF018', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '1 days'),
(41, 'Blueberry Muffin',     'CAF019', 'Moist vanilla muffin bursting with fresh blueberries. Sugar-topped.',          90,  350,  320, 'CafeOps', 40, 1, 4, 'CAF019', 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '1 days'),
(42, 'Banana Bread',         'CAF020', 'Dense, moist banana loaf with walnut chunks. No refined sugar added.',          85,  340,  310, 'CafeOps', 30, 1, 4, 'CAF020', 'https://images.unsplash.com/photo-1587380420429-a4ef6a0e86e2?w=600&auto=format&fit=crop&q=80', NOW()),
(43, 'Chocolate Brownie',    'CAF021', 'Fudgy dark chocolate brownie with sea salt flakes. Gluten-optional.',           95,  380,  350, 'CafeOps', 35, 1, 4, 'CAF021', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80', NOW()),
(44, 'Cinnamon Roll',        'CAF022', 'Soft brioche roll with cinnamon sugar, topped with cream cheese glaze.',        100, 420,  380, 'CafeOps', 25, 1, 4, 'CAF022', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80', NOW()),
(45, 'Avocado Toast',        'CAF023', 'Toasted sourdough with smashed avocado, sea salt, and chili flakes.',          120, 480,  440, 'CafeOps', 20, 1, 4, 'CAF023', 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&auto=format&fit=crop&q=80', NOW());

-- ─── Smoothies (category 5) ───────────────────────────────
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES
(50, 'Mango Smoothie',       'CAF024', 'Alphonso mango blended with yogurt and honey. Thick and tropical.',            80,  480,  440, 'CafeOps', 60, 1, 5, 'CAF024', 'https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '3 days'),
(51, 'Berry Blast',          'CAF025', 'Blueberry, strawberry, and raspberry blend with almond milk.',                 85,  500,  460, 'CafeOps', 55, 1, 5, 'CAF025', 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '2 days'),
(52, 'Green Detox',          'CAF026', 'Spinach, cucumber, green apple, ginger, and lemon. Clean and energising.',     75,  460,  420, 'CafeOps', 40, 1, 5, 'CAF026', 'https://images.unsplash.com/photo-1610970880026-7e4e3cd2e9e6?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '1 days'),
(53, 'Strawberry Banana',    'CAF027', 'Fresh strawberries and banana blended with oat milk and vanilla.',              80,  470,  430, 'CafeOps', 50, 1, 5, 'CAF027', 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&auto=format&fit=crop&q=80', NOW());

-- ─── Specials (category 6) ────────────────────────────────
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES
(60, 'Affogato',             'CAF028', 'Vanilla gelato drowned in a hot ristretto shot. An Italian classic.',          90,  480,  440, 'CafeOps', 30, 1, 6, 'CAF028', 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '2 days'),
(61, 'Lavender Latte',       'CAF029', 'House-made lavender syrup with espresso and steamed oat milk. Floral notes.',  70,  460,  420, 'CafeOps', 40, 1, 6, 'CAF029', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80', NOW() - INTERVAL '1 days'),
(62, 'Dirty Chai',           'CAF030', 'Masala chai with a double shot of espresso. Spicy, bold, and energising.',      70,  450,  410, 'CafeOps', 35, 1, 6, 'CAF030', 'https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?w=600&auto=format&fit=crop&q=80', NOW()),
(63, 'Dalgona Coffee',       'CAF031', 'Whipped instant coffee cloud over iced milk. Sweet, frothy, and creamy.',       65,  440,  400, 'CafeOps', 25, 1, 6, 'CAF031', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop&q=80', NOW()),
(64, 'Rose Latte',           'CAF032', 'Rose water and espresso with steamed milk. Delicate floral sweetness.',          70,  450,  410, 'CafeOps', 30, 1, 6, 'CAF032', 'https://images.unsplash.com/photo-1485808191679-5f86510bd652?w=600&auto=format&fit=crop&q=80', NOW());

-- ============================================================
-- RESTORE SHIFT (cashier 3, branch 1)
-- ============================================================
INSERT INTO shift_report (id, shift_start_time, shift_end_time, net_sales, total_orders, total_refunds, total_sales, branch_id, cashier_id) VALUES
(1, NOW() - INTERVAL '4 hours', NULL, 0, 0, 0, 0, 1, 3);

-- ============================================================
-- SEED RECENT ORDERS with new product IDs
-- ============================================================
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES
(50, NOW() - INTERVAL '6 days',  'COMPLETED', 'CARD', 730,  1, 3, NULL),
(51, NOW() - INTERVAL '6 days' + INTERVAL '2 hours', 'COMPLETED', 'CASH', 570,  1, 3, NULL),
(52, NOW() - INTERVAL '5 days',  'COMPLETED', 'UPI',  840,  1, 3, NULL),
(53, NOW() - INTERVAL '4 days',  'COMPLETED', 'CARD', 700,  1, 3, NULL),
(54, NOW() - INTERVAL '3 days',  'COMPLETED', 'CASH', 460,  1, 3, NULL),
(55, NOW() - INTERVAL '2 days',  'COMPLETED', 'UPI',  780,  1, 3, NULL),
(56, NOW() - INTERVAL '1 days',  'COMPLETED', 'CARD', 630,  1, 3, NULL),
(57, NOW() - INTERVAL '30 minutes', 'COMPLETED', 'CASH', 440, 1, 3, NULL),
(58, NOW() - INTERVAL '15 minutes', 'COMPLETED', 'UPI',  380, 1, 3, NULL);

-- Order Items (referencing cafe product IDs)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES
(100, 380, 1, 50, 13),   -- Latte
(101, 350, 1, 50, 43),   -- Chocolate Brownie
(102, 390, 1, 51, 20),   -- Iced Latte
(103, 180, 1, 51, 32),   -- Earl Grey (updated to match selling_price)
(104, 420, 2, 52, 12),   -- Cappuccino x2
(105, 360, 1, 53, 14),   -- Flat White
(106, 340, 1, 53, 42),   -- Banana Bread
(107, 460, 1, 54, 23),   -- Frappuccino
(108, 410, 1, 55, 15),   -- Mocha
(109, 370, 1, 55, 41),   -- Blueberry Muffin
(110, 360, 1, 56, 21),   -- Cold Brew
(111, 270, 1, 56, 32),   -- Earl Grey
(112, 440, 1, 57, 45),   -- Avocado Toast
(113, 380, 1, 58, 44),   -- Cinnamon Roll
(114, 250, 1, 58, 16);   -- Macchiato

