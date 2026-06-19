-- ========================================================
-- Generated SQL Script: Seeding 50 Realistic Mock Orders
-- Database: PostgreSQL
-- ========================================================

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 6 hours 12 minutes', 'UPI', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 19 hours 35 minutes', 'CARD', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 20 hours 58 minutes', 'CASH', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '0 days 23 hours 54 minutes', 'CARD', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 13 hours 27 minutes', 'CASH', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '1 days 22 hours 42 minutes', 'CASH', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '1 days 0 hours 3 minutes', 'UPI', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 7 hours 54 minutes', 'UPI', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 0 hours 36 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '4 days 18 hours 17 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '6 days 2 hours 11 minutes', 'UPI', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '4 days 9 hours 6 minutes', 'CASH', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '0 days 3 hours 48 minutes', 'CARD', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '6 days 19 hours 47 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '4 days 3 hours 19 minutes', 'CASH', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 21 hours 1 minutes', 'CARD', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '0 days 15 hours 33 minutes', 'CASH', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 17 hours 20 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '4 days 15 hours 46 minutes', 'UPI', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '3 days 22 hours 6 minutes', 'UPI', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 6 hours 10 minutes', 'CASH', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 5 hours 40 minutes', 'UPI', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 13 hours 26 minutes', 'CARD', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '0 days 21 hours 47 minutes', 'UPI', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '4 days 4 hours 51 minutes', 'CARD', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '1 days 6 hours 13 minutes', 'CASH', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 13 hours 51 minutes', 'UPI', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 23 hours 54 minutes', 'CASH', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '3 days 7 hours 12 minutes', 'CASH', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 2 hours 41 minutes', 'CASH', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '6 days 17 hours 49 minutes', 'CASH', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 9 hours 38 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '4 days 9 hours 20 minutes', 'UPI', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 0 hours 34 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 7 hours 37 minutes', 'CASH', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 13 hours 33 minutes', 'CASH', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '3 days 15 hours 30 minutes', 'UPI', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '0 days 20 hours 35 minutes', 'CARD', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 23 hours 52 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '0 days 2 hours 5 minutes', 'UPI', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '3 days 22 hours 6 minutes', 'CASH', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '1 days 7 hours 51 minutes', 'CASH', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 1 hours 59 minutes', 'UPI', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '5 days 10 hours 9 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '6 days 21 hours 4 minutes', 'CARD', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '4 days 4 hours 34 minutes', 'CASH', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '3 days 6 hours 37 minutes', 'CARD', 'COMPLETED', 1, 3);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 4
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '2 days 7 hours 13 minutes', 'UPI', 'COMPLETED', 1, 1);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 1, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 1);
  -- Item 2
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 3, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 3);
  -- Item 3
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '1 days 0 hours 42 minutes', 'CARD', 'COMPLETED', 1, 2);
END $$;

DO $$ 
DECLARE new_order_id BIGINT;
DECLARE random_product_id BIGINT;
DECLARE product_price NUMERIC;
DECLARE current_total NUMERIC := 0;
BEGIN
  new_order_id := nextval('orders_seq');
  -- Item 1
  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;
  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), 2, product_price, random_product_id, new_order_id);
  current_total := current_total + (product_price * 2);
  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, NOW() - INTERVAL '0 days 15 hours 17 minutes', 'UPI', 'COMPLETED', 1, 2);
END $$;

