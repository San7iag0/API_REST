INSERT INTO `base_resto`.`orders`(`products`, `address`)
VALUES('Chicken', '123 facke st');

CREATE USER IF NOT EXISTS'santi'@'localhost' IDENTIFIED BY 'keeper20';
GRANT INSERT, SELECT ON `base_resto`.`orders` to 'santi'@`localhost`;

ALTER USER 'santi'@'localhost' IDENTIFIED WITH mysql_native_password BY 'keeper20';
flush privileges;

SELECT * FROM orders;
