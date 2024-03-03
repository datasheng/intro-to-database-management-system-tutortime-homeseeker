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
