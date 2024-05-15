USE bookings_db;

DELIMITER //

CREATE PROCEDURE GetBillByUser(IN userId INT)
BEGIN
    SELECT (ROUND SUM(amount), 2) AS amount
    FROM transaction
    WHERE transaction.payee_id = userId;
END //

CREATE PROCEDURE GetPaymentByUser(IN userId INT)
BEGIN
    SELECT (ROUND SUM(amount), 2) AS amount
    FROM transaction
    WHERE transaction.recipient_id = userId;
END //

DELIMITER ;