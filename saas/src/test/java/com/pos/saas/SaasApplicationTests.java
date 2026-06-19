package com.pos.saas;

import org.junit.jupiter.api.Test;
import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;

class SaasApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void seed100Products() throws IOException {
		// Define categories
		String[] categories = {
			"Men's Clothing", "Women's Clothing", "Footwear", "Home & Kitchen", "Personal Care", "Bags & Accessories", "Kids & Baby", "Stationery & Office"
		};

		// 100 Products split by category
		String[][][] products = {
			// Men's Clothing (13)
			{
				{"Classic Denim Shirt", "Rugged cotton denim shirt", "450.0", "1599.0", "1399.0", "Levi's", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"},
				{"Slim Fit Chinos", "Comfortable stretch cotton chinos", "550.0", "1999.0", "1799.0", "Dockers", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600"},
				{"Crewneck Cotton Tee", "Standard fit soft cotton tee", "120.0", "499.0", "399.0", "Jockey", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"},
				{"Hooded Sweatshirt", "Warm pullover fleece hoodie", "600.0", "2499.0", "1999.0", "Puma", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"},
				{"Leather Biker Jacket", "Premium faux leather jacket", "1500.0", "5999.0", "4999.0", "Zara", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"},
				{"Linen Casual Trousers", "Breathable linen blend trousers", "400.0", "1699.0", "1499.0", "Marks & Spencer", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600"},
				{"Striped Polo Shirt", "Classic polo with horizontal stripes", "300.0", "1199.0", "999.0", "Ralph Lauren", "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600"},
				{"Winter Puffer Vest", "Sleeveless insulated puffer vest", "800.0", "2999.0", "2499.0", "Columbia", "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600"},
				{"Athletic Track Pants", "Moisture-wicking training pants", "350.0", "1499.0", "1299.0", "Nike", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600"},
				{"Formal Cotton Suit", "Two-piece classic formal suit", "2500.0", "8999.0", "7999.0", "Raymond", "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600"},
				{"Summer Cargo Shorts", "Multi-pocket durable cotton shorts", "250.0", "999.0", "799.0", "Woodland", "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600"},
				{"Thermal Inner Wear", "Cozy thermal top and bottom set", "200.0", "799.0", "699.0", "Lux Cottswool", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"},
				{"Printed Beach Shirt", "Hawaiian floral print short sleeve shirt", "220.0", "899.0", "749.0", "Jack & Jones", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"}
			},
			// Women's Clothing (13)
			{
				{"A-Line Midi Dress", "Elegant floral printed midi dress", "500.0", "1999.0", "1699.0", "Vero Moda", "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600"},
				{"Super Skinny Jeans", "Stretch denim skinny fit jeans", "650.0", "2499.0", "2199.0", "Only", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"},
				{"Anarkali Kurti Set", "Traditional cotton anarkali kurti", "800.0", "3499.0", "2999.0", "BIBA", "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600"},
				{"Satin Wrap Blouse", "Smooth satin office wear blouse", "300.0", "1299.0", "1099.0", "Zara", "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600"},
				{"Wide Leg Trousers", "High-waist formal wide leg trousers", "450.0", "1899.0", "1599.0", "H&M", "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600"},
				{"Oversized Knit Sweater", "Cozy loose fit knitted sweater", "500.0", "1999.0", "1799.0", "Mango", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"},
				{"Denim Mini Skirt", "Classic button-down denim skirt", "250.0", "999.0", "899.0", "Forever 21", "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600"},
				{"Activewear Leggings", "High-stretch gym yoga pants", "300.0", "1499.0", "1199.0", "Adidas", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600"},
				{"Lace Evening Gown", "Floor length elegant lace dress", "1800.0", "5999.0", "4999.0", "AND", "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600"},
				{"Casual Linen Shorts", "Breathable waist-tie linen shorts", "200.0", "899.0", "749.0", "Roadster", "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600"},
				{"Georgette Party Saree", "Designer georgette saree with border", "900.0", "3999.0", "3499.0", "Sabyasachi", "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600"},
				{"Quilted Winter Jacket", "Padded winter jacket with hood", "1100.0", "3999.0", "3499.0", "Columbia", "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600"},
				{"Off-Shoulder Crop Top", "Trendy summer off-shoulder top", "180.0", "799.0", "649.0", "Vero Moda", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"}
			},
			// Footwear (13)
			{
				{"Air Max Sneakers", "Comfortable everyday sports sneakers", "2200.0", "6999.0", "5999.0", "Nike", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"},
				{"Brogue Leather Shoes", "Classic hand-burnished leather brogues", "1800.0", "5499.0", "4799.0", "Clarks", "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600"},
				{"Slip-On Loafers", "Suede slip-on driving loafers", "700.0", "2499.0", "1999.0", "Hush Puppies", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600"},
				{"Stiletto Party Heels", "Pointed toe classic high heels", "900.0", "2999.0", "2499.0", "Steve Madden", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"},
				{"Running Trail Shoes", "Rugged outdoor running shoes", "1300.0", "4499.0", "3799.0", "Salomon", "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600"},
				{"Platform Canvas Shoes", "Trendy high-top canvas sneakers", "450.0", "1899.0", "1599.0", "Converse", "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600"},
				{"Chelsea Leather Boots", "Sleek elastic-sided ankle boots", "1600.0", "4999.0", "4299.0", "Woodland", "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600"},
				{"Strappy Flat Sandals", "Casual summer flat sandals", "250.0", "999.0", "799.0", "Bata", "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600"},
				{"Orthopedic Comfort Slides", "Soft footbed orthopedic slides", "300.0", "1299.0", "1099.0", "Birkenstock", "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600"},
				{"Football Cleats", "Professional firm ground soccer cleats", "1200.0", "3999.0", "3499.0", "Adidas", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"},
				{"Velcro Kids Sneakers", "Easy-to-wear sneakers for toddlers", "350.0", "1499.0", "1199.0", "Puma", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"},
				{"Wedge Heel Sandals", "Fashionable cork sole wedge sandals", "600.0", "2299.0", "1899.0", "Catwalk", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"},
				{"Monk Strap Dress Shoes", "Double monk strap formal leather shoes", "1500.0", "4499.0", "3999.0", "Ruosh", "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600"}
			},
			// Home & Kitchen (12)
			{
				{"Bakeable Ceramic Bowls", "Set of 4 oven-safe serving bowls", "350.0", "1199.0", "999.0", "Borosil", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"},
				{"Memory Foam Pillow", "Orthopedic neck support pillow", "400.0", "1499.0", "1299.0", "The Sleep Company", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600"},
				{"French Press Maker", "Stainless steel glass coffee plunger", "250.0", "999.0", "799.0", "InstaCuppa", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600"},
				{"Silicone Spatula Set", "Set of 6 heat-resistant kitchen tools", "150.0", "599.0", "499.0", "Pigeon", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"},
				{"Thermal Carafe 1.5L", "Double wall hot-cold beverage flask", "350.0", "1299.0", "1099.0", "Milton", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600"},
				{"Microfiber Cleaning Cloths", "12-pack absorbent polishing rags", "100.0", "399.0", "299.0", "Scotch-Brite", "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600"},
				{"Induction Cooktop", "2000W touch control induction stove", "1100.0", "3499.0", "2899.0", "Prestige", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"},
				{"Cotton Bath Mats", "Set of 2 soft absorbent floor mats", "120.0", "499.0", "399.0", "Trident", "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600"},
				{"Knife Block 6-Piece", "High carbon stainless steel kitchen knives", "600.0", "2299.0", "1999.0", "Wonderchef", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"},
				{"Glass Tumbler Set", "Pack of 6 premium water/juice glasses", "150.0", "599.0", "449.0", "Ocean", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600"},
				{"Blackout Window Curtains", "Set of 2 thermal insulating drapes", "450.0", "1799.0", "1499.0", "Cortina", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"},
				{"Aromatherapy Diffuser", "Ultrasonic cool mist humidifier", "300.0", "1199.0", "999.0", "Allin Exporters", "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600"}
			},
			// Personal Care (12)
			{
				{"Sunscreen SPF 50", "Broad spectrum matte gel sunscreen", "120.0", "499.0", "449.0", "La Roche-Posay", "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600"},
				{"Electric Toothbrush", "Rechargeable sonic power toothbrush", "450.0", "1999.0", "1599.0", "Oral-B", "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=600"},
				{"Tea Tree Face Serum", "Clarifying skin serum for blemishes", "180.0", "699.0", "599.0", "The Body Shop", "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600"},
				{"Argan Hair Oil", "Nourishing oil for dry damaged hair", "150.0", "599.0", "499.0", "L'Oreal", "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600"},
				{"Dead Sea Mud Mask", "Deep pore purifying facial clay mask", "200.0", "799.0", "699.0", "Mamaearth", "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600"},
				{"Cocoa Butter Lip Balm", "Hydrating lip balm with vitamin E", "40.0", "149.0", "129.0", "Nivea", "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600"},
				{"Mens Styling Hair Wax", "Strong hold matte finish hair wax", "90.0", "299.0", "249.0", "Gatsby", "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"},
				{"Epsom Bath Salts", "Pure natural salts for muscle recovery", "80.0", "349.0", "299.0", "Dr Teal's", "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=600"},
				{"Sandalwood Incense Sticks", "Premium aromatic hand-rolled agarbatti", "40.0", "199.0", "149.0", "Cycle Brand", "https://images.unsplash.com/photo-1607006342411-9243db10e72c?w=600"},
				{"Gel Eyeliner Waterproof", "Intense black long lasting eyeliner", "120.0", "499.0", "399.0", "Maybelline", "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600"},
				{"Nail Polish Gift Set", "6 vibrant shades of glossy lacquer", "100.0", "450.0", "349.0", "Lakme", "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600"},
				{"Waterproof Shaving Bag", "Compact leather toiletry kit organizer", "150.0", "699.0", "549.0", "Gillette", "https://images.unsplash.com/photo-1626017289578-d017bba91b00?w=600"}
			},
			// Bags & Accessories (13)
			{
				{"Hard Cabin Suitcase", "Lightweight spinner wheels trolley bag", "1400.0", "4999.0", "3999.0", "American Tourister", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"},
				{"Bifold Leather Wallet", "RFID blocking genuine leather wallet", "250.0", "999.0", "849.0", "Wildcraft", "https://images.unsplash.com/photo-1553591589-2e5d2a6e04b4?w=600"},
				{"Smart Fitness Band", "Heart rate and sleep tracking smartband", "600.0", "2499.0", "1999.0", "Xiaomi", "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600"},
				{"Sling Messenger Bag", "Waterproof cross-body messenger bag", "300.0", "1299.0", "1099.0", "Wildcraft", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"},
				{"Polarized Wayfarer", "Classic wayfarer design dark shades", "400.0", "1799.0", "1499.0", "Ray-Ban", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"},
				{"Leather Handbag Shoulder", "Elegant office shoulder handbag", "800.0", "3299.0", "2799.0", "Lavie", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"},
				{"Woolen Muffler Scarf", "Soft knitted winter scarf muffler", "120.0", "599.0", "449.0", "Monte Carlo", "https://images.unsplash.com/photo-1553591589-2e5d2a6e04b4?w=600"},
				{"Stainless Steel Thermos", "Hot and cold insulated flask 500ml", "180.0", "799.0", "649.0", "Milton", "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600"},
				{"Canvas Gym Duffle", "Spacious gym bag with shoe compartment", "350.0", "1499.0", "1199.0", "Nike", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"},
				{"Windproof Auto Umbrella", "Compact travel umbrella automatic open", "150.0", "599.0", "499.0", "Citizen", "https://images.unsplash.com/photo-1553591589-2e5d2a6e04b4?w=600"},
				{"Womens Clutch Wallet", "Fashion evening clutch with card slots", "200.0", "899.0", "749.0", "Caprese", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"},
				{"Metal Link Keychain", "Heavy duty stainless steel key clip", "40.0", "199.0", "149.0", "Chumbak", "https://images.unsplash.com/photo-1553591589-2e5d2a6e04b4?w=600"},
				{"Leather Card Holder", "Slim front pocket card wallet sleeve", "80.0", "399.0", "299.0", "Wildcraft", "https://images.unsplash.com/photo-1553591589-2e5d2a6e04b4?w=600"}
			},
			// Kids & Baby (12)
			{
				{"Baby Feeding Bottle Set", "BPA-free anti-colic feeding bottles", "150.0", "699.0", "599.0", "Philips Avent", "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600"},
				{"Kids Denim dungarees", "Soft cotton adjustable straps dungaree", "350.0", "1499.0", "1299.0", "Max", "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"},
				{"Plush Teddy Bear", "Super soft non-toxic cuddly teddy", "120.0", "499.0", "399.0", "Hamleys", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"},
				{"Baby Cotton Wipes", "Hypoallergenic alcohol-free wet wipes", "60.0", "249.0", "199.0", "Huggies", "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600"},
				{"Board Game Monopoly", "Classic property trading board game", "400.0", "1299.0", "1099.0", "Hasbro", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"},
				{"Kids Tricycle", "Safe training pedal ride-on tricycle", "900.0", "2999.0", "2499.0", "LuvLap", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"},
				{"Baby Sleeping Bag", "Warm soft velvet wrap sleeping nest", "220.0", "899.0", "749.0", "Mothercare", "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600"},
				{"Lego Building Bricks", "Classic creative brick box set", "600.0", "1999.0", "1799.0", "LEGO", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"},
				{"Baby Powder 400g", "Gentle baby powder clinically proven", "80.0", "249.0", "219.0", "Johnson's", "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600"},
				{"Kids Sunglasses Elastic", "UV protection unbreakable shades", "100.0", "399.0", "299.0", "Chicos", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"},
				{"Coloring Book Pack", "Set of 5 theme based drawing books", "80.0", "350.0", "299.0", "Dreamland", "https://images.unsplash.com/photo-1577401239170-897c3cc71e93?w=600"},
				{"Toddler Pyjama Set", "Pack of 3 pure cotton nightsuits", "250.0", "999.0", "849.0", "Miniklub", "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"}
			},
			// Stationery & Office (12)
			{
				{"Gel Pens Pack of 20", "Smooth writing gel pens assorted colors", "60.0", "299.0", "249.0", "Uniball", "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600"},
				{"Scientific Calculator", "Multi-function algebraic calculator", "450.0", "1499.0", "1299.0", "Casio", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600"},
				{"Leather Journal Planner", "Undated refillable notebook binder", "300.0", "1199.0", "999.0", "Paperkraft", "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600"},
				{"Highlighters Pack of 5", "Fluorescent chisel tip markers", "40.0", "199.0", "149.0", "Stabilo Boss", "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600"},
				{"Metal Mesh Letter Tray", "3-tier office document desktop organizer", "200.0", "799.0", "649.0", "Solo", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600"},
				{"Whiteboard 2x3 Feet", "Magnetic dry-erase aluminum frame board", "350.0", "1299.0", "1099.0", "Pragati Systems", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600"},
				{"Acrylic Paint Set 24", "Non-toxic rich pigment acrylic colors", "220.0", "899.0", "749.0", "Camel", "https://images.unsplash.com/photo-1577401239170-897c3cc71e93?w=600"},
				{"Heavy Duty Stapler", "All metal desktop office stapler", "80.0", "399.0", "299.0", "Kangaro", "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600"},
				{"Laminator Machine A4", "Quick warm-up office document laminator", "800.0", "2999.0", "2499.0", "Texet", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600"},
				{"Sticky Notes Cube", "400 sheets pastel color notes", "30.0", "149.0", "119.0", "3M Post-it", "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600"},
				{"Presentation Clicker", "Wireless laser pointer slide remote", "250.0", "999.0", "849.0", "Logitech", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600"},
				{"Drafting T-Square Rule", "Acrylic transparent marking ruler", "60.0", "299.0", "249.0", "Omega", "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600"}
			}
		};

		// Output file setup
		File sqlFile = new File("../seed_100_products.sql");
		PrintWriter writer = new PrintWriter(new FileWriter(sqlFile));
		
		writer.println("-- ========================================================");
		writer.println("-- Generated SQL Script: Seeding 100 Realistic Retail Products");
		writer.println("-- Database: PostgreSQL");
		writer.println("-- ========================================================");
		writer.println();

		// Seed categories first
		for (String category : categories) {
			String categoryEscaped = category.replace("'", "''");
			writer.println(String.format(
				"INSERT INTO categories (name, store_id) SELECT '%s', 1 WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = '%s' AND store_id = 1);",
				categoryEscaped, categoryEscaped
			));
		}
		writer.println();

		int barcodeIndex = 30001;
		int totalStatementsCount = 0;

		// Seed products and inventories
		for (int c = 0; c < categories.length; c++) {
			String categoryName = categories[c];
			String categoryNameEscaped = categoryName.replace("'", "''");
			String[][] categoryProducts = products[c];

			writer.println("-- --------------------------------------------------------");
			writer.println("-- Category: " + categoryName);
			writer.println("-- --------------------------------------------------------");

			for (int p = 0; p < categoryProducts.length; p++) {
				String[] prod = categoryProducts[p];
				String name = prod[0].replace("'", "''");
				String desc = prod[1].replace("'", "''");
				double cost = Double.parseDouble(prod[2]);
				double mrp = Double.parseDouble(prod[3]);
				double selling = Double.parseDouble(prod[4]);
				String brand = prod[5].replace("'", "''");
				String image = prod[6];
				String barcode = String.valueOf(barcodeIndex++);
				int qty = 100;

				// Generate product insert
				writer.println(String.format(
					"INSERT INTO product (id, name, barcode, description, cost_price, mrp, selling_price, brand, stock_quantity, store_id, category_id, created_at, image) " +
					"SELECT nextval('product_seq'), '%s', '%s', '%s', %.2f, %.2f, %.2f, '%s', %d, 1, " +
					"(SELECT id FROM categories WHERE name = '%s' AND store_id = 1), NOW(), '%s' " +
					"WHERE NOT EXISTS (SELECT 1 FROM product WHERE barcode = '%s');",
					name, barcode, desc, cost, mrp, selling, brand, qty, categoryNameEscaped, image, barcode
				));

				// Generate inventory insert
				writer.println(String.format(
					"INSERT INTO inventory (branch_id, product_id, quantity, last_updated) " +
					"SELECT 1, (SELECT id FROM product WHERE barcode = '%s'), %d, NOW() " +
					"WHERE EXISTS (SELECT 1 FROM product WHERE barcode = '%s') " +
					"AND NOT EXISTS (SELECT 1 FROM inventory WHERE product_id = (SELECT id FROM product WHERE barcode = '%s') AND branch_id = 1);",
					barcode, qty, barcode, barcode
				));
				writer.println();

				totalStatementsCount += 2;
			}
}

		writer.flush();
		writer.close();
		System.out.println("✓ Successfully generated seed_100_products.sql with " + totalStatementsCount + " insert statements.");
		
		/*
		// Read SQL file and execute statements one by one via JDBC
		BufferedReader reader = new BufferedReader(new FileReader(sqlFile));
		String line;
		StringBuilder sb = new StringBuilder();
		int executedCount = 0;
		while ((line = reader.readLine()) != null) {
			if (line.trim().isEmpty() || line.trim().startsWith("--")) {
				continue;
			}
			sb.append(line).append(" ");
			if (line.trim().endsWith(";")) {
				String sql = sb.toString().trim();
				jdbcTemplate.execute(sql);
				executedCount++;
				sb = new StringBuilder();
			}
		}
		reader.close();
		System.out.println("✓ Executed " + executedCount + " statements successfully against the database.");

		// Verify count of products
		Long productCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM product", Long.class);
		System.out.println("=== VERIFICATION ===");
		System.out.println("New total products count: " + productCount);
		*/
	}

	@Test
	void seed50Orders() throws IOException {
		// Create 50 mock orders over the last 7 days to make the dashboard dynamic
		System.out.println("=== GENERATING 50 ORDERS SQL ===");
		File sqlFile = new File("../seed_50_orders.sql");
		PrintWriter writer = new PrintWriter(new FileWriter(sqlFile));
		
		writer.println("-- ========================================================");
		writer.println("-- Generated SQL Script: Seeding 50 Realistic Mock Orders");
		writer.println("-- Database: PostgreSQL");
		writer.println("-- ========================================================");
		writer.println();

		int executedCount = 0;
		java.util.Random rand = new java.util.Random();

		for (int i = 0; i < 50; i++) {
			int daysAgo = rand.nextInt(7);
			int hoursAgo = rand.nextInt(24);
			int minutesAgo = rand.nextInt(60);
			int cashierId = rand.nextInt(3) + 1;
			String[] payments = {"CASH", "CARD", "UPI"};
			String paymentType = payments[rand.nextInt(3)];
			int numItems = rand.nextInt(4) + 1;

			// Generate order first using a temporary ID variable in Postgres
			writer.println("DO $$ ");
			writer.println("DECLARE new_order_id BIGINT;");
			writer.println("DECLARE random_product_id BIGINT;");
			writer.println("DECLARE product_price NUMERIC;");
			writer.println("DECLARE current_total NUMERIC := 0;");
			writer.println("BEGIN");
			writer.println("  new_order_id := nextval('orders_seq');");

			for (int j = 0; j < numItems; j++) {
				int quantity = rand.nextInt(3) + 1;
				writer.println("  -- Item " + (j+1));
				writer.println("  SELECT id, selling_price INTO random_product_id, product_price FROM product ORDER BY random() LIMIT 1;");
				writer.println(String.format("  INSERT INTO order_item (id, quantity, price, product_id, order_id) VALUES (nextval('order_item_seq'), %d, product_price, random_product_id, new_order_id);", quantity));
				writer.println(String.format("  current_total := current_total + (product_price * %d);", quantity));
			}

			String createdAt = String.format("NOW() - INTERVAL '%d days %d hours %d minutes'", daysAgo, hoursAgo, minutesAgo);
			writer.println(String.format("  INSERT INTO orders (id, total_amount, created_at, payment_type, order_status, branch_id, cashier_id) VALUES (new_order_id, current_total, %s, '%s', 'COMPLETED', 1, %d);", createdAt, paymentType, cashierId));
			writer.println("END $$;");
			writer.println();
			executedCount++;
		}
		
		writer.flush();
		writer.close();
		System.out.println("✓ Generated " + executedCount + " DO block statements successfully to seed_50_orders.sql");
	}
}
