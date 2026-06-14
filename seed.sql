-- Disable foreign key checks to safely wipe database tables
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM order_item;
DELETE FROM orders;
DELETE FROM product;
DELETE FROM categories;
DELETE FROM shift_report;
DELETE FROM shift_report_top_products;

-- Reset auto increments
ALTER TABLE categories AUTO_INCREMENT = 1;
ALTER TABLE orders AUTO_INCREMENT = 1;
ALTER TABLE order_item AUTO_INCREMENT = 1;
ALTER TABLE shift_report AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- Categories (store_id = 1) — General Store
INSERT INTO categories (id, name, store_id) VALUES 
(1, 'Men\'s Clothing', 1),
(2, 'Women\'s Clothing', 1),
(3, 'Footwear', 1),
(4, 'Home & Kitchen', 1),
(5, 'Personal Care', 1),
(6, 'Bags & Accessories', 1),
(7, 'Kids & Baby', 1),
(8, 'Stationery & Office', 1);

-- =============================================
-- Products (store_id = 1)
-- =============================================

-- ─── Men's Clothing (category 1) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(10, 'Slim Fit Oxford Shirt', '20001', 'Premium cotton oxford button-down shirt. Classic collar, chest pocket. Available in white, blue, pink.', 350, 1299, 1199, 'Arrow', 40, 1, 1, 'SKU20001', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(11, 'Classic Chino Pants', '20002', 'Stretch cotton chino trousers. Slim-tapered fit, zip fly, belt loops. Khaki.', 500, 1899, 1699, 'U.S. Polo Assn.', 30, 1, 1, 'SKU20002', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(12, 'V-Neck Cotton T-Shirt', '20003', 'Soft combed-cotton V-neck tee. Bio-washed for extra softness. Pack of 1.', 150, 599, 499, 'Jockey', 80, 1, 1, 'SKU20003', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(13, 'Denim Jacket', '20004', 'Classic indigo denim trucker jacket. Button front closure, adjustable waist tabs.', 800, 2799, 2499, 'Levi''s', 15, 1, 1, 'SKU20004', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(14, 'Formal Blazer', '20005', 'Slim-fit single-breasted formal blazer. Notch lapel, two-button closure. Navy blue.', 1200, 4499, 3999, 'Van Heusen', 10, 1, 1, 'SKU20005', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(15, 'Cargo Shorts', '20006', 'Relaxed-fit cotton cargo shorts with multiple pockets. Drawstring hem. Olive green.', 300, 999, 899, 'Roadster', 50, 1, 1, 'SKU20006', 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(16, 'Polo T-Shirt', '20007', 'Piqué cotton polo with tipped collar and sleeve hems. Embroidered logo.', 250, 999, 849, 'Allen Solly', 60, 1, 1, 'SKU20007', 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ─── Women's Clothing (category 2) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(17, 'Floral Wrap Dress', '20008', 'Lightweight georgette wrap dress with floral print. V-neckline, adjustable belt tie.', 600, 2299, 1999, 'AND', 20, 1, 2, 'SKU20008', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(18, 'High-Rise Skinny Jeans', '20009', 'Stretchable high-rise skinny jeans. Dark wash, ankle length. Zip & button closure.', 700, 2499, 2199, 'Levi''s', 25, 1, 2, 'SKU20009', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(19, 'Embroidered Kurti', '20010', 'Cotton blend straight-cut kurti with thread embroidery. 3/4 sleeves, mandarin collar.', 400, 1499, 1299, 'W', 35, 1, 2, 'SKU20010', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(20, 'Ruffle Blouse', '20011', 'Elegant ruffled blouse in pastel crepe fabric. Front button closure. Ideal for office wear.', 350, 1299, 1099, 'Vero Moda', 30, 1, 2, 'SKU20011', 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(21, 'Palazzo Pants', '20012', 'Wide-leg palazzo pants in pleated polyester. Elasticated waistband. Multiple colors.', 300, 1199, 999, 'Global Desi', 40, 1, 2, 'SKU20012', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(22, 'Cropped Hoodie', '20013', 'Fleece-lined cropped hoodie with kangaroo pocket. Drawstring hood, ribbed cuffs.', 450, 1699, 1499, 'H&M', 20, 1, 2, 'SKU20013', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ─── Footwear (category 3) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(23, 'Running Sneakers', '20014', 'Lightweight mesh running shoes with cushioned insole. Breathable upper, rubber outsole.', 900, 3499, 2999, 'Nike', 20, 1, 3, 'SKU20014', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(24, 'Leather Formal Shoes', '20015', 'Genuine leather oxford shoes. Hand-stitched welt, leather sole. Tan brown.', 1200, 4999, 4499, 'Clarks', 12, 1, 3, 'SKU20015', 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(25, 'Canvas Slip-On', '20016', 'Classic slip-on canvas shoe. Elastic side accents, padded collar, vulcanized sole.', 350, 1499, 1299, 'Vans', 40, 1, 3, 'SKU20016', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(26, 'Women''s Block Heels', '20017', 'Suede block-heel sandals with ankle strap. 3-inch heel, cushioned footbed.', 600, 2299, 1999, 'Inc.5', 15, 1, 3, 'SKU20017', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(27, 'Sports Flip Flops', '20018', 'EVA cushioned flip-flops with textured footbed. Water-resistant, quick-dry.', 100, 499, 399, 'Adidas', 60, 1, 3, 'SKU20018', 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- ─── Home & Kitchen (category 4) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(28, 'Cotton Bed Sheet Set', '20019', 'King-size 300 TC cotton bedsheet with 2 pillow covers. Geometric print. Machine-washable.', 500, 1999, 1799, 'Spaces', 25, 1, 4, 'SKU20019', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(29, 'Non-Stick Cookware Set', '20020', '5-piece aluminum non-stick cookware set. Includes frying pan, saucepan, kadai, tawa, spatula.', 800, 2999, 2599, 'Prestige', 10, 1, 4, 'SKU20020', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(30, 'Bath Towel Set', '20021', 'Set of 4 ultra-soft 100% cotton bath towels. 500 GSM, quick-dry. Assorted colors.', 350, 1399, 1199, 'Trident', 30, 1, 4, 'SKU20021', 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(31, 'Cushion Cover Set', '20022', 'Set of 5 decorative cushion covers. Velvet fabric, zip closure. 16x16 inches.', 200, 799, 699, 'Cortina', 45, 1, 4, 'SKU20022', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(32, 'Stainless Steel Water Bottle', '20023', '1 Liter double-wall vacuum insulated bottle. Keeps hot 12hr / cold 24hr. BPA free.', 250, 999, 849, 'Milton', 50, 1, 4, 'SKU20023', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(33, 'LED Desk Lamp', '20024', 'Adjustable arm LED desk lamp with touch dimmer. 3 color temperatures, USB charging port.', 400, 1599, 1399, 'Philips', 20, 1, 4, 'SKU20024', 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ─── Personal Care (category 5) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(34, 'Face Wash 150ml', '20025', 'Oil-control face wash with neem & turmeric extracts. For oily & combination skin.', 80, 350, 299, 'Himalaya', 70, 1, 5, 'SKU20025', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(35, 'Body Lotion 400ml', '20026', 'Deep moisture body lotion with cocoa butter & vitamin E. Non-greasy, long-lasting.', 120, 499, 449, 'Nivea', 55, 1, 5, 'SKU20026', 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(36, 'Hair Dryer 1800W', '20027', 'Professional ionic hair dryer with 2 speed settings and cool-shot button. Includes diffuser.', 500, 1899, 1699, 'Philips', 18, 1, 5, 'SKU20027', 'https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(37, 'Perfume 100ml EDP', '20028', 'Eau de Parfum with top notes of bergamot, heart of jasmine, base of sandalwood.', 600, 2499, 2199, 'Fogg', 25, 1, 5, 'SKU20028', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(38, 'Electric Trimmer', '20029', 'Cordless beard trimmer with 20 length settings. 90 min runtime, USB-C charging.', 400, 1599, 1399, 'Braun', 22, 1, 5, 'SKU20029', 'https://images.unsplash.com/photo-1621607512022-6aecc52ceaa2?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- ─── Bags & Accessories (category 6) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(39, 'Laptop Backpack', '20030', '15.6 inch laptop backpack with USB charging port. Water-resistant polyester, padded straps.', 450, 1799, 1599, 'Wildcraft', 30, 1, 6, 'SKU20030', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(40, 'Women''s Tote Bag', '20031', 'Spacious PU leather tote with inner organizer pockets. Magnetic snap closure. Beige.', 500, 1999, 1799, 'Lavie', 20, 1, 6, 'SKU20031', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(41, 'Aviator Sunglasses', '20032', 'Polarized aviator sunglasses with UV400 protection. Metal frame, spring hinges.', 350, 1499, 1299, 'Ray-Ban', 25, 1, 6, 'SKU20032', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(42, 'Leather Belt', '20033', 'Genuine leather reversible belt. Black/brown, auto-lock buckle. Adjustable length.', 200, 899, 799, 'Tommy Hilfiger', 35, 1, 6, 'SKU20033', 'https://images.unsplash.com/photo-1553591589-2e5d2a6e04b4?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(43, 'Analog Wrist Watch', '20034', 'Stainless steel analog watch with mineral crystal. Water-resistant 50m. Leather strap.', 800, 3499, 2999, 'Fossil', 12, 1, 6, 'SKU20034', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- ─── Kids & Baby (category 7) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(44, 'Kids Cartoon T-Shirt', '20035', 'Printed cotton t-shirt for kids (4-8 yrs). Round neck, half sleeves. Fun cartoon designs.', 150, 599, 499, 'Max', 45, 1, 7, 'SKU20035', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(45, 'Baby Romper Set', '20036', 'Soft organic cotton romper + bib set (0-12 months). Snap button closure. Pastel shades.', 250, 999, 849, 'Mothercare', 30, 1, 7, 'SKU20036', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(46, 'Kids Canvas Shoes', '20037', 'Lace-up canvas sneakers for kids. Cushioned insole, non-marking rubber outsole.', 300, 1299, 1099, 'Converse', 20, 1, 7, 'SKU20037', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(47, 'School Backpack', '20038', 'Lightweight school bag with reflective strips. Multiple compartments, padded back.', 300, 1199, 999, 'Skybags', 25, 1, 7, 'SKU20038', 'https://images.unsplash.com/photo-1577401239170-897c3cc71e93?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- ─── Stationery & Office (category 8) ───
INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, sku_id, image, created_at) VALUES 
(48, 'Premium Notebook A5', '20039', 'Hard-cover ruled notebook, 192 pages, 100 GSM acid-free paper. Lay-flat binding.', 80, 349, 299, 'Classmate', 60, 1, 8, 'SKU20039', 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(49, 'Ball Pen Set (10 Pack)', '20040', 'Smooth-writing ball pens with 0.7mm tip. Blue ink, comfortable grip. Pack of 10.', 30, 150, 120, 'Cello', 100, 1, 8, 'SKU20040', 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(50, 'Desk Organizer', '20041', 'Multi-compartment wooden desk organizer. Holds pens, phone, cards, paper clips.', 250, 999, 849, 'Wooden Street', 15, 1, 8, 'SKU20041', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(51, 'Wireless Mouse', '20042', 'Ergonomic wireless mouse with silent clicks. 2.4GHz nano receiver, 18-month battery.', 200, 799, 699, 'Logitech', 35, 1, 8, 'SKU20042', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(52, 'Mechanical Keyboard', '20043', 'Compact 65% mechanical keyboard. Hot-swappable switches, RGB backlight, USB-C.', 800, 3499, 2999, 'Keychron', 10, 1, 8, 'SKU20043', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Active Shift session (starts 4 hours ago for cashier 3 in branch 1)
INSERT INTO shift_report (id, shift_start_time, shift_end_time, net_sales, total_orders, total_refunds, total_sales, branch_id, cashier_id) VALUES 
(1, DATE_SUB(NOW(), INTERVAL 4 HOUR), NULL, 0, 0, 0, 0, 1, 3);

-- Seeding Orders
-- 6 days ago
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES 
(50, DATE_SUB(NOW(), INTERVAL 6 DAY), 'COMPLETED', 'CARD', 2999, 1, 3, NULL),
(51, DATE_ADD(DATE_SUB(NOW(), INTERVAL 6 DAY), INTERVAL 2 HOUR), 'COMPLETED', 'CASH', 499, 1, 3, NULL);

-- 5 days ago
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES 
(52, DATE_SUB(NOW(), INTERVAL 5 DAY), 'COMPLETED', 'CARD', 4499, 1, 3, NULL),
(53, DATE_ADD(DATE_SUB(NOW(), INTERVAL 5 DAY), INTERVAL 3 HOUR), 'COMPLETED', 'UPI', 1699, 1, 3, NULL);

-- 4 days ago
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES 
(54, DATE_SUB(NOW(), INTERVAL 4 DAY), 'COMPLETED', 'CARD', 2999, 1, 3, NULL);

-- 3 days ago
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES 
(55, DATE_SUB(NOW(), INTERVAL 3 DAY), 'COMPLETED', 'CASH', 1799, 1, 3, NULL),
(56, DATE_ADD(DATE_SUB(NOW(), INTERVAL 3 DAY), INTERVAL 1 HOUR), 'COMPLETED', 'UPI', 699, 1, 3, NULL);

-- 2 days ago
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES 
(57, DATE_SUB(NOW(), INTERVAL 2 DAY), 'COMPLETED', 'CARD', 2999, 1, 3, NULL);

-- 1 day ago
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES 
(58, DATE_SUB(NOW(), INTERVAL 1 DAY), 'COMPLETED', 'CASH', 1599, 1, 3, NULL),
(59, DATE_ADD(DATE_SUB(NOW(), INTERVAL 1 DAY), INTERVAL 4 HOUR), 'COMPLETED', 'UPI', 2199, 1, 3, NULL);

-- TODAY — within the active shift duration (last 4 hours)
INSERT INTO orders (id, created_at, order_status, payment_type, total_amount, branch_id, cashier_id, customer_id) VALUES 
(60, DATE_SUB(NOW(), INTERVAL 10 MINUTE), 'COMPLETED', 'CARD', 3999, 1, 3, NULL),
(61, DATE_SUB(NOW(), INTERVAL 30 MINUTE), 'COMPLETED', 'UPI', 1299, 1, 3, NULL),
(62, DATE_SUB(NOW(), INTERVAL 50 MINUTE), 'COMPLETED', 'CASH', 849, 1, 3, NULL);

-- Order Items
-- Order 50 (Running Sneakers ₹2999)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (100, 2999, 1, 50, 23);
-- Order 51 (V-Neck Cotton T-Shirt ₹499)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (101, 499, 1, 51, 12);
-- Order 52 (Leather Formal Shoes ₹4499)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (102, 4499, 1, 52, 24);
-- Order 53 (Hair Dryer 1800W ₹1699)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (103, 1699, 1, 53, 36);
-- Order 54 (Mechanical Keyboard ₹2999)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (104, 2999, 1, 54, 52);
-- Order 55 (Cotton Bed Sheet Set ₹1799)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (105, 1799, 1, 55, 28);
-- Order 56 (Cushion Cover Set ₹699)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (106, 699, 1, 56, 31);
-- Order 57 (Analog Wrist Watch ₹2999)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (107, 2999, 1, 57, 43);
-- Order 58 (Laptop Backpack ₹1599)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (108, 1599, 1, 58, 39);
-- Order 59 (Perfume 100ml EDP ₹2199)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (109, 2199, 1, 59, 37);
-- Order 60 (Formal Blazer ₹3999)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (110, 3999, 1, 60, 14);
-- Order 61 (Aviator Sunglasses ₹1299)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (111, 1299, 1, 61, 41);
-- Order 62 (Stainless Steel Water Bottle ₹849)
INSERT INTO order_item (id, price, quantity, order_id, product_id) VALUES (112, 849, 1, 62, 32);
