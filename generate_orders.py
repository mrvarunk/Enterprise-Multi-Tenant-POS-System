import random
import os

days = [0, 1, 2, 3, 4, 5, 6]
payments = ["CASH", "CARD", "UPI"]

with open("seed_50_orders.sql", "w") as f:
    f.write("-- ========================================================\n")
    f.write("-- Generated SQL Script: Seeding 50 Realistic Mock Orders\n")
    f.write("-- Database: PostgreSQL\n")
    f.write("-- ========================================================\n\n")
    
    for i in range(50):
        days_ago = random.choice(days)
        hours_ago = random.randint(0, 23)
        minutes_ago = random.randint(0, 59)
        cashier_id = random.randint(1, 3)
        payment_type = random.choice(payments)
        num_items = random.randint(1, 4)
        
        f.write("DO $$ \n")
        f.write("DECLARE new_order_id BIGINT;\n")
        f.write("DECLARE random_product_id BIGINT;\n")
        f.write("DECLARE product_price NUMERIC;\n")
        f.write("DECLARE current_total NUMERIC := 0;\n")
        f.write("BEGIN\n")
        f.write("  new_order_id := nextval('orders_seq');\n")
        
        for j in range(num_items):
            quantity = random.randint(1, 3)
            f.write(f"  -- Item {j+1}\n")
            f.write("  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;\n")
            f.write(f"  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), {quantity}, product_price, random_product_id, new_order_id);\n")
            f.write(f"  current_total := current_total + (product_price * {quantity});\n")
            
        created_at = f"NOW() - INTERVAL '{days_ago} days {hours_ago} hours {minutes_ago} minutes'"
        f.write(f"  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, {created_at}, '{payment_type}', 'COMPLETED', 1, {cashier_id});\n")
        f.write("END $$;\n\n")

print("Generated seed_50_orders.sql")
