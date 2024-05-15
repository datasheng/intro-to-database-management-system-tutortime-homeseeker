USE bookings_db;

INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (1, 'Michael', 'Romashov', 'mromashov@icloud.com', '$argon2id$v=19$m=65536,t=2,p=1$/IVjWtWIb7CH7T2F6lyMrg$7ErKzfIG1pkkXIYaM5duTOV9e7tbDdE1AXyESlC4kFU');
INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (2, 'Joseph', 'Platt', 'jplatt001@citymail.cuny.edu', '');
INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (3, 'Tyler', 'Ortiz', 'idk@gmail.com', '');
INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (4, 'James', 'Zou', 'zoujames97@gmail.com', '');

INSERT INTO tt_service (id, name, admin_id, timezone, duration, active, description)
VALUES (1, 'CS/Math Tutoring', 1, 'America/New_York', 60, true, 'Get help for any MATH or CSC courses!');
INSERT INTO tt_service (id, name, admin_id, timezone, duration, active, description)
VALUES (2, 'Physics Tutoring', 2, 'America/New_York', 45, false, 'Get help for any PHYS courses! (Note: Currently closed for spring break)');

INSERT INTO tt_schedule (service_id, weekday, start, end)
VALUES (1, 2, '10:00', '19:00');
INSERT INTO tt_schedule (service_id, weekday, start, end)
VALUES (1, 3, '10:00', '19:00');
INSERT INTO tt_schedule (service_id, weekday, start, end)
VALUES (1, 4, '7:30', '16:00');

INSERT INTO hs_property (id, broker_id, address, zipcode, type, price, rooms, area, built)
VALUES
    (1, 1, '123 Main St', '12345', 'House for Sale', 250000, 4, 2000, 1995),
    (2, 1, '456 Elm St', '23456', 'Apartment for Rent', 1500, 2, 1200, 2000),
    (3, 1, '789 Oak St', '34567', 'Condo for Sale', 180000, 3, 1500, 1980),
    (4, 1, '987 Maple St', '45678', 'Townhouse for Sale', 300000, 5, 2500, 2005),
    (5, 2, '654 Pine St', '56789', 'House for Rent', 2800, 4, 2100, 2008),
    (6, 2, '321 Cedar St', '67890', 'Apartment for Rent', 2000, 2, 1000, 1990),
    (7, 2, '876 Birch St', '78901', 'House for Sale', 320000, 4, 2200, 2006),
    (8, 3, '543 Oak St', '89012', 'Condo for Sale', 200000, 3, 1800, 1998),
    (9, 3, '210 Elm St', '90123', 'Townhouse for Sale', 280000, 3, 2000, 2004),
    (10, 3, '123 Maple St', '01234', 'House for Rent', 2500, 3, 1800, 2009),
    (11, 3, '987 Pine St', '98765', 'Apartment for Rent', 1800, 2, 1200, 1995),
    (12, 4, '456 Cedar St', '87654', 'Condo for Sale', 220000, 2, 1500, 2002),
    (13, 4, '654 Birch St', '76543', 'House for Sale', 350000, 4, 2300, 2007),
    (14, 4, '321 Elm St', '65432', 'Apartment for Rent', 2100, 2, 1100, 1993),
    (15, 4, '876 Oak St', '54321', 'Townhouse for Sale', 300000, 3, 2000, 2001);

INSERT INTO hs_schedule (property_id, start, end)
VALUES
    (1, '2024-05-15 09:00:00', '2024-05-15 12:00:00'),
    (1, '2024-05-16 10:00:00', '2024-05-16 14:00:00'),
    (2, '2024-05-17 11:00:00', '2024-05-17 15:00:00'),
    (2, '2024-05-18 12:00:00', '2024-05-18 16:00:00'),
    (3, '2024-05-19 13:00:00', '2024-05-19 17:00:00'),
    (3, '2024-05-20 14:00:00', '2024-05-20 18:00:00'),
    (4, '2024-05-21 15:00:00', '2024-05-21 19:00:00'),
    (4, '2024-05-22 16:00:00', '2024-05-22 20:00:00'),
    (5, '2024-05-23 17:00:00', '2024-05-23 21:00:00'),
    (5, '2024-05-24 18:00:00', '2024-05-24 22:00:00'),
    (6, '2024-05-25 19:00:00', '2024-05-25 23:00:00'),
    (6, '2024-05-26 20:00:00', '2024-05-26 23:00:00'),
    (7, '2024-05-27 21:00:00', '2024-05-27 23:00:00'),
    (7, '2024-05-28 22:00:00', '2024-05-28 23:00:00'),
    (8, '2024-05-29 23:00:00', '2024-05-29 23:59:59'),
    (8, '2024-05-30 00:00:00', '2024-05-30 01:00:00'),
    (9, '2024-05-30 02:00:00', '2024-05-30 03:00:00'),
    (9, '2024-05-30 04:00:00', '2024-05-30 05:00:00'),
    (10, '2024-05-30 06:00:00', '2024-05-30 07:00:00');