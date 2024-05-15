USE bookings_db;

CREATE TABLE user (
    id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name    VARCHAR(35)  NOT NULL,
    last_name     VARCHAR(35)  NOT NULL,
    email         VARCHAR(255) NOT NULL,
    password_hash CHAR(97)     NOT NULL,
    is_admin      TINYINT(1)   NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE transaction (
    id            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
    payee_id      INT UNSIGNED   NOT NULL,
    recipient_id  INT UNSIGNED   NOT NULL,
    amount        FLOAT UNSIGNED NOT NULL,
    description   TEXT           NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (payee_id)      REFERENCES user(id),
    FOREIGN KEY (recipient_id)  REFERENCES user(id)
)
