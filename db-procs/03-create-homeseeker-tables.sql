/*Home Seeker*/
CREATE TABLE hs_property (
    id          INT UNSIGNED         NOT NULL AUTO_INCREMENT,
    broker_id   INT UNSIGNED         NOT NULL,
    address     VARCHAR(64)          NOT NULL,
    zipcode     CHAR(5)              NOT NULL,
    type        ENUM('rent', 'sale') NOT NULL,
    price       INT UNSIGNED         NULL,
    rooms       INT UNSIGNED         NULL,
    area        INT UNSIGNED         NULL,
    built       INT UNSIGNED         NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (broker_id)    REFERENCES user(id)
);

CREATE TABLE hs_schedule (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    property_id INT UNSIGNED NOT NULL,
    start       DATETIME     NOT NULL,
    end         DATETIME     NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (property_id) REFERENCES hs_property(id)
);

CREATE TABLE hs_appointment (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    schedule_id INT UNSIGNED NOT NULL,
    user_id     INT UNSIGNED NOT NULL,
    start       DATETIME     NOT NULL,
    end         DATETIME     NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (schedule_id) REFERENCES hs_schedule(id),
    FOREIGN KEY (user_id)     REFERENCES user(id)
);

CREATE TABLE hs_image (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    property_id INT UNSIGNED NOT NULL,
    uri         TEXT         NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (property_id) REFERENCES hs_property(id)
);
