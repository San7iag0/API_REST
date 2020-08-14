INSERT INTO `base_resto`.`products` (`productName`, `price`) VALUES ('empanada', '1000');

CREATE USER IF NOT EXISTS 'santi'@'localhost' IDENTIFIED BY 'keeper20';
GRANT INSERT, UPDATE, DELETE, SELECT ON `base_resto`.`products` to 'santi'@`localhost`;

ALTER USER 'santi'@'localhost' IDENTIFIED WITH mysql_native_password BY 'keeper20';
flush privileges;

SELECT * FROM products;
