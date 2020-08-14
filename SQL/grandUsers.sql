INSERT INTO `base_resto`.`users` (`userName`, `fullName`, `email`, `phone`, `address`, `admin`)
VALUES ('santi', 'santi beja', 'fghj', '23456', 'fghjk', true);


CREATE USER IF NOT EXISTS'santi'@'localhost' IDENTIFIED BY 'keeper20';
GRANT INSERT, DELETE, UPDATE, SELECT ON `base_resto`.`users` to 'santi'@`localhost`;

ALTER USER 'santi'@'localhost' IDENTIFIED WITH mysql_native_password BY 'keeper20';
flush privileges;

SELECT * FROM users;
