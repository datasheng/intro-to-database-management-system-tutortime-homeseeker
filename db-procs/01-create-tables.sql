USE bookings_db;

CREATE TABLE user (
    id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name    VARCHAR(35)  NOT NULL,
    last_name     VARCHAR(35)  NOT NULL,
    email         VARCHAR(255) NOT NULL,
    password_hash CHAR(97)     NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE service (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    admin_id    INT UNSIGNED NOT NULL,
    timezone    VARCHAR(64)  NOT NULL,
    duration    INT UNSIGNED NOT NULL,
    active      BOOLEAN      NOT NULL DEFAULT TRUE,
    description TEXT         NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES user(id)
);

CREATE TABLE schedule (
    service_id INT UNSIGNED     NOT NULL,
    weekday    TINYINT UNSIGNED NOT NULL,
    start      TIME             NOT NULL,
    end        TIME             NOT NULL,

    PRIMARY KEY (service_id, weekday),
    FOREIGN KEY (service_id) REFERENCES service(id),
    CHECK (weekday >= 0 AND weekday < 7)
);

CREATE TABLE appointment (
    user_id    INT UNSIGNED NOT NULL,
    service_id INT UNSIGNED NOT NULL,
    start      DATETIME     NOT NULL,
    end        DATETIME     NOT NULL,
    notes      TEXT         NULL,

    FOREIGN KEY (user_id)    REFERENCES user(id),
    FOREIGN KEY (service_id) REFERENCES service(id)
);
