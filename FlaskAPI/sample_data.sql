-- Sample Data for Vintage Timepiece Evaluation and Trading Platform
-- Generated for MSSQL Database

-- =============================================
-- USER TABLE DATA (10+ users)
-- =============================================
INSERT INTO [User] (username, email, password, created_at, role) VALUES
('admin', 'admin@vintagewatch.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-01 10:00:00', 'admin'),
('john_seller', 'john.seller@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-02 09:30:00', 'seller'),
('mary_buyer', 'mary.buyer@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-03 14:20:00', 'buyer'),
('david_appraiser', 'david.appraiser@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-04 11:15:00', 'appraiser'),
('sarah_collector', 'sarah.collector@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-05 16:45:00', 'buyer'),
('mike_watchmaker', 'mike.watchmaker@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-06 08:30:00', 'seller'),
('lisa_expert', 'lisa.expert@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-07 13:20:00', 'appraiser'),
('tom_enthusiast', 'tom.enthusiast@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-08 15:10:00', 'buyer'),
('anna_dealer', 'anna.dealer@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-09 12:00:00', 'seller'),
('peter_authenticator', 'peter.authenticator@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-10 10:30:00', 'appraiser'),
('emma_collector', 'emma.collector@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-11 14:45:00', 'buyer'),
('robert_vintage', 'robert.vintage@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8K8K8', '2024-01-12 09:15:00', 'seller');

-- =============================================
-- WATCH TABLE DATA (30 watches)
-- =============================================
INSERT INTO [Watch] (name, brand, price, created_at, existing_status, seller_id, img) VALUES
('Submariner Date', 'Rolex', 8500.00, '2024-01-15 10:00:00', 1, 2, 'rolex_submariner.jpg'),
('Speedmaster Professional', 'Omega', 3200.00, '2024-01-15 10:30:00', 1, 2, 'omega_speedmaster.jpg'),
('Royal Oak', 'Audemars Piguet', 25000.00, '2024-01-15 11:00:00', 1, 6, 'ap_royal_oak.jpg'),
('Nautilus', 'Patek Philippe', 35000.00, '2024-01-15 11:30:00', 1, 6, 'patek_nautilus.jpg'),
('GMT Master II', 'Rolex', 12000.00, '2024-01-15 12:00:00', 1, 9, 'rolex_gmt.jpg'),
('Seamaster 300', 'Omega', 2800.00, '2024-01-15 12:30:00', 1, 9, 'omega_seamaster.jpg'),
('Daytona', 'Rolex', 18000.00, '2024-01-15 13:00:00', 1, 2, 'rolex_daytona.jpg'),
('Aquanaut', 'Patek Philippe', 28000.00, '2024-01-15 13:30:00', 1, 6, 'patek_aquanaut.jpg'),
('Calatrava', 'Patek Philippe', 22000.00, '2024-01-15 14:00:00', 1, 9, 'patek_calatrava.jpg'),
('Seamaster Planet Ocean', 'Omega', 3500.00, '2024-01-15 14:30:00', 1, 2, 'omega_planet_ocean.jpg'),
('Explorer II', 'Rolex', 7500.00, '2024-01-15 15:00:00', 1, 6, 'rolex_explorer.jpg'),
('Constellation', 'Omega', 2200.00, '2024-01-15 15:30:00', 1, 9, 'omega_constellation.jpg'),
('Milgauss', 'Rolex', 6500.00, '2024-01-15 16:00:00', 1, 2, 'rolex_milgauss.jpg'),
('De Ville', 'Omega', 1800.00, '2024-01-15 16:30:00', 1, 6, 'omega_deville.jpg'),
('Yacht-Master', 'Rolex', 9500.00, '2024-01-15 17:00:00', 1, 9, 'rolex_yachtmaster.jpg'),
('Seamaster Diver 300M', 'Omega', 3000.00, '2024-01-15 17:30:00', 1, 2, 'omega_diver300m.jpg'),
('Sky-Dweller', 'Rolex', 15000.00, '2024-01-15 18:00:00', 1, 6, 'rolex_skydweller.jpg'),
('Railmaster', 'Omega', 2500.00, '2024-01-15 18:30:00', 1, 9, 'omega_railmaster.jpg'),
('Cellini', 'Rolex', 12000.00, '2024-01-15 19:00:00', 1, 2, 'rolex_cellini.jpg'),
('Seamaster Aqua Terra', 'Omega', 2800.00, '2024-01-15 19:30:00', 1, 6, 'omega_aquaterra.jpg'),
('Datejust', 'Rolex', 8000.00, '2024-01-15 20:00:00', 1, 9, 'rolex_datejust.jpg'),
('Speedmaster Reduced', 'Omega', 1800.00, '2024-01-15 20:30:00', 1, 2, 'omega_speedmaster_reduced.jpg'),
('Air-King', 'Rolex', 5500.00, '2024-01-15 21:00:00', 1, 6, 'rolex_airking.jpg'),
('Seamaster 1948', 'Omega', 3200.00, '2024-01-15 21:30:00', 1, 9, 'omega_seamaster1948.jpg'),
('Explorer', 'Rolex', 6000.00, '2024-01-15 22:00:00', 1, 2, 'rolex_explorer_1.jpg'),
('Constellation Globemaster', 'Omega', 2500.00, '2024-01-15 22:30:00', 1, 6, 'omega_globemaster.jpg'),
('Sea-Dweller', 'Rolex', 11000.00, '2024-01-15 23:00:00', 1, 9, 'rolex_seadweller.jpg'),
('Seamaster 300 Heritage', 'Omega', 2900.00, '2024-01-15 23:30:00', 1, 2, 'omega_seamaster_heritage.jpg'),
('GMT Master', 'Rolex', 7000.00, '2024-01-16 00:00:00', 1, 6, 'rolex_gmt_master.jpg'),
('Speedmaster Mark II', 'Omega', 2000.00, '2024-01-16 00:30:00', 1, 9, 'omega_speedmaster_mark2.jpg');

-- =============================================
-- ORDER TABLE DATA (10+ orders)
-- =============================================
INSERT INTO [Order] (customer_id, status, created_at, updated_at, quantity, address, amount) VALUES 
(3, 'Completed', '2024-01-20 10:00:00', '2024-01-22 15:30:00', 1, '123 Main St, New York, NY 10001', 8500.00),
( 5, 'Pending', '2024-01-21 14:20:00', '2024-01-21 14:20:00', 2, '456 Oak Ave, Los Angeles, CA 90210', 6000.00),
(8, 'Shipped', '2024-01-22 09:15:00', '2024-01-23 11:45:00', 1, '789 Pine St, Chicago, IL 60601', 3200.00),
(3, 'Completed', '2024-01-23 16:30:00', '2024-01-25 09:20:00', 1, '123 Main St, New York, NY 10001', 12000.00),
(11, 'Processing', '2024-01-24 11:45:00', '2024-01-24 13:15:00', 1, '321 Elm St, Miami, FL 33101', 2800.00),
(5, 'Completed', '2024-01-25 13:20:00', '2024-01-27 16:40:00', 1, '456 Oak Ave, Los Angeles, CA 90210', 18000.00),
(8, 'Pending', '2024-01-26 15:10:00', '2024-01-26 15:10:00', 1, '789 Pine St, Chicago, IL 60601', 7500.00),
(3, 'Shipped', '2024-01-27 10:30:00', '2024-01-28 14:20:00', 2, '123 Main St, New York, NY 10001', 11000.00),
(11, 'Completed', '2024-01-28 12:15:00', '2024-01-30 10:45:00', 1, '321 Elm St, Miami, FL 33101', 3500.00),
(5, 'Processing', '2024-01-29 14:40:00', '2024-01-29 16:30:00', 1, '456 Oak Ave, Los Angeles, CA 90210', 6500.00),
(8, 'Pending', '2024-01-30 09:25:00', '2024-01-30 09:25:00', 1, '789 Pine St, Chicago, IL 60601', 9500.00),
(3, 'Shipped', '2024-01-31 11:50:00', '2024-02-01 13:15:00', 1, '123 Main St, New York, NY 10001', 3000.00);

-- =============================================
-- ORDER DETAIL TABLE DATA
-- =============================================
INSERT INTO [OrderDetail] (order_id, watch_id, quantity) VALUES
(1, 1, 1),
(2, 11, 1),
(2, 13, 1),
(3, 2, 1),
(4, 5, 1),
(5, 6, 1),
(6, 7, 1),
(7, 11, 1),
(8, 13, 1),
(8, 15, 1),
(9, 10, 1),
(10, 13, 1),
(11, 15, 1),
(12, 16, 1);

-- =============================================
-- TRANSACTION TABLE DATA (10+ transactions)
-- =============================================
INSERT INTO [Transaction] ( buyer_id, order_id, amount, status, created_at) VALUES
( 3, 1, 8500.00, 'completed', '2024-01-20 10:05:00'),
( 5, 2, 6000.00, 'pending', '2024-01-21 14:25:00'),
( 8, 3, 3200.00, 'completed', '2024-01-22 09:20:00'),
( 3, 4, 12000.00, 'completed', '2024-01-23 16:35:00'),
( 11, 5, 2800.00, 'processing', '2024-01-24 11:50:00'),
( 5, 6, 18000.00, 'completed', '2024-01-25 13:25:00'),
( 8, 7, 7500.00, 'pending', '2024-01-26 15:15:00'),
( 3, 8, 11000.00, 'completed', '2024-01-27 10:35:00'),
( 11, 9, 3500.00, 'completed', '2024-01-28 12:20:00'),
(5, 10, 6500.00, 'processing', '2024-01-29 14:45:00'),
(8, 11, 9500.00, 'pending', '2024-01-30 09:30:00'),
(3, 12, 3000.00, 'completed', '2024-01-31 11:55:00');

-- =============================================
-- ESCROW TABLE DATA
-- =============================================
INSERT INTO [Escrow] (transaction_id, seller_id, amount, status, created_at, released_at) VALUES
(1, 2, 8500.00, 'released', '2024-01-20 10:05:00', '2024-01-22 15:30:00'),
( 2, 6, 3000.00, 'holding', '2024-01-21 14:25:00', NULL),
( 2, 9, 3000.00, 'holding', '2024-01-21 14:25:00', NULL),
( 3, 2, 3200.00, 'released', '2024-01-22 09:20:00', '2024-01-23 11:45:00'),
( 4, 9, 12000.00, 'released', '2024-01-23 16:35:00', '2024-01-25 09:20:00'),
( 5, 9, 2800.00, 'holding', '2024-01-24 11:50:00', NULL),
( 6, 2, 18000.00, 'released', '2024-01-25 13:25:00', '2024-01-27 16:40:00'),
( 7, 6, 7500.00, 'holding', '2024-01-26 15:15:00', NULL),
( 8, 6, 5500.00, 'released', '2024-01-27 10:35:00', '2024-01-28 14:20:00'),
( 8, 9, 5500.00, 'released', '2024-01-27 10:35:00', '2024-01-28 14:20:00'),
( 9, 2, 3500.00, 'released', '2024-01-28 12:20:00', '2024-01-30 10:45:00'),
( 10, 2, 6500.00, 'holding', '2024-01-29 14:45:00', NULL),
( 11, 9, 9500.00, 'holding', '2024-01-30 09:30:00', NULL),
( 12, 2, 3000.00, 'released', '2024-01-31 11:55:00', '2024-02-01 13:15:00');

-- =============================================
-- APPRAISAL TABLE DATA (10+ appraisals)
-- =============================================
INSERT INTO [Appraisal] (appraiser_id, watch_id, es_value, auth, con_note, status, created_at, updated_at) VALUES
(4, 1, 8500.00, 1, 'Authentic Rolex Submariner in excellent condition', 'approved', '2024-01-16 10:00:00', '2024-01-16 11:30:00'),
(7, 2, 3200.00, 1, 'Genuine Omega Speedmaster with original box and papers', 'approved', '2024-01-16 10:30:00', '2024-01-16 12:00:00'),
(4, 3, 25000.00, 1, 'Authentic AP Royal Oak, pristine condition', 'approved', '2024-01-16 11:00:00', '2024-01-16 13:15:00'),
(10, 4, 35000.00, 1, 'Original Patek Philippe Nautilus, excellent provenance', 'approved', '2024-01-16 11:30:00', '2024-01-16 14:00:00'),
(7, 5, 12000.00, 1, 'Authentic Rolex GMT Master II, good condition', 'approved', '2024-01-16 12:00:00', '2024-01-16 14:30:00'),
(4, 6, 2800.00, 1, 'Genuine Omega Seamaster 300, minor wear', 'approved', '2024-01-16 12:30:00', '2024-01-16 15:00:00'),
(10, 7, 18000.00, 1, 'Authentic Rolex Daytona, excellent condition', 'approved', '2024-01-16 13:00:00', '2024-01-16 15:30:00'),
(7, 8, 28000.00, 1, 'Original Patek Philippe Aquanaut, pristine', 'approved', '2024-01-16 13:30:00', '2024-01-16 16:00:00'),
(4, 9, 22000.00, 1, 'Authentic Patek Philippe Calatrava, good condition', 'approved', '2024-01-16 14:00:00', '2024-01-16 16:30:00'),
(10, 10, 3500.00, 1, 'Genuine Omega Seamaster Planet Ocean', 'approved', '2024-01-16 14:30:00', '2024-01-16 17:00:00'),
(7, 11, 7500.00, 1, 'Authentic Rolex Explorer II, minor scratches', 'approved', '2024-01-16 15:00:00', '2024-01-16 17:30:00'),
(4, 12, 2200.00, 1, 'Genuine Omega Constellation, good condition', 'approved', '2024-01-16 15:30:00', '2024-01-16 18:00:00'),
(10, 13, 6500.00, 1, 'Authentic Rolex Milgauss, excellent condition', 'approved', '2024-01-16 16:00:00', '2024-01-16 18:30:00'),
(7, 14, 1800.00, 1, 'Genuine Omega De Ville, minor wear', 'approved', '2024-01-16 16:30:00', '2024-01-16 19:00:00'),
(4, 15, 9500.00, 1, 'Authentic Rolex Yacht-Master, good condition', 'approved', '2024-01-16 17:00:00', '2024-01-16 19:30:00');

-- =============================================
-- FEEDBACK TABLE DATA (10+ feedbacks)
-- =============================================
INSERT INTO [Feedback] (sender_id, receiver_id, content, created_at) VALUES
(3, 2, 'Excellent seller! Watch arrived exactly as described. Very professional communication.', '2024-01-22 16:00:00'),
(5, 6, 'Great experience buying from this seller. Fast shipping and authentic watch.', '2024-01-23 10:30:00'),
(8, 2, 'Outstanding service! The watch exceeded my expectations. Highly recommended.', '2024-01-24 14:20:00'),
(3, 9, 'Professional seller with excellent knowledge of vintage watches. Will buy again!', '2024-01-25 11:15:00'),
(11, 9, 'Fast delivery and authentic product. Very satisfied with my purchase.', '2024-01-26 09:45:00'),
(5, 2, 'Amazing watch! Seller was very helpful throughout the process.', '2024-01-27 15:30:00'),
(8, 6, 'Great communication and fast shipping. Watch is in perfect condition.', '2024-01-28 12:20:00'),
(3, 6, 'Excellent seller! Very knowledgeable about vintage timepieces.', '2024-01-29 16:45:00'),
(11, 2, 'Outstanding service and authentic watch. Highly recommended seller.', '2024-01-30 10:15:00'),
(5, 9, 'Professional and trustworthy seller. Watch arrived in perfect condition.', '2024-01-31 13:30:00'),
(8, 2, 'Great experience! Fast shipping and excellent customer service.', '2024-02-01 11:20:00'),
(3, 2, 'Outstanding seller with excellent knowledge of vintage watches. Will definitely buy again!', '2024-02-02 14:50:00'),
(11, 6, 'Very professional seller. Watch exceeded expectations. Highly recommended!', '2024-02-03 09:30:00'),
(5, 2, 'Excellent communication and fast delivery. Authentic watch as described.', '2024-02-04 16:15:00'),
(8, 9, 'Outstanding service! Very knowledgeable about vintage timepieces. Will buy again!', '2024-02-05 12:40:00');

-- =============================================
-- END OF SAMPLE DATA
-- =============================================