USE bookings_db;

INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (1, 'Michael', 'Romashov', 'mromashov@icloud.com', '$argon2id$v=19$m=65536,t=2,p=1$/IVjWtWIb7CH7T2F6lyMrg$7ErKzfIG1pkkXIYaM5duTOV9e7tbDdE1AXyESlC4kFU');
INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (2, 'Joseph', 'Platt', 'jplatt001@citymail.cuny.edu', '');
INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (3, 'Tyler', 'Ortiz', 'idk@gmail.com', '');
INSERT INTO user (id, first_name, last_name, email, password_hash)
VALUES (4, 'James', 'Zou', 'zoujames97@gmail.com', '');

INSERT INTO service (id, name, admin_id, timezone, duration, active, description)
VALUES (1, 'CS/Math Tutoring', 1, 'America/New_York', 60, true, 'Get help for any MATH or CSC courses!');
INSERT INTO service (id, name, admin_id, timezone, duration, active, description)
VALUES (2, 'Physics Tutoring', 1, 'America/New_York', 45, false, 'Get help for any PHYS courses! (Note: Currently closed for spring break)');

INSERT INTO schedule (service_id, weekday, start, end)
VALUES (1, 2, '10:00', '19:00');
INSERT INTO schedule (service_id, weekday, start, end)
VALUES (1, 3, '10:00', '19:00');
INSERT INTO schedule (service_id, weekday, start, end)
VALUES (1, 4, '7:30', '16:00');

INSERT INTO hs_property (id, broker_id, address, zipcode, type, price, rooms, area, built) 
VALUES 
    (1, 1, '999 St', '12345', 'House', 250000, 4, 2000, 1995),
    (2, 1, '123 Main St', '54321', 'Apartment', 150000, 2, 1200, 2000),
    (3, 2, '456 Elm St', '67890', 'Condo', 180000, 3, 1500, 1980),
    (4, 2, '789 Oak St', '13579', 'Townhouse', 300000, 5, 2500, 2005),
    (5, 3, '321 Maple St', '97531', 'House', 280000, 4, 2100, 2008);

INSERT INTO hs_schedule (property_id, start, end)
VALUES
    (2, '2024-04-23 09:00:00', '2024-04-23 12:00:00'),
    (2, '2024-04-24 10:00:00', '2024-04-24 14:00:00'),
    (2, '2024-04-25 11:00:00', '2024-04-25 15:00:00'),
    (3, '2024-04-26 12:00:00', '2024-04-26 16:00:00'),
    (3, '2024-04-27 13:00:00', '2024-04-27 17:00:00'),
    (4, '2024-04-28 14:00:00', '2024-04-28 18:00:00'),
    (4, '2024-04-29 15:00:00', '2024-04-29 19:00:00'),
    (5, '2024-04-30 16:00:00', '2024-04-30 20:00:00'),
    (5, '2024-05-01 17:00:00', '2024-05-01 21:00:00'),
    (5, '2024-05-02 18:00:00', '2024-05-02 22:00:00'),
    (5, '2024-05-03 19:00:00', '2024-05-03 23:00:00');


