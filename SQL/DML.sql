/*
-- Query: SELECT * FROM base_resto.users
LIMIT 0, 1000

-- Date: 2020-07-26 16:58
*/

INSERT INTO base_resto.users (userName, fullName, email, phone, address, password, admin) values ( 'Pepita', 'smith', 'pep@email.com', 345678, 'fake st 123', '$2y$12$Z7eyjhTcQaM.bYOS9KtPMe4GUR8hqkqxD5Ovw.cK2.0gT6zvnkTcO
', true);
INSERT INTO base_resto.users (userName, fullName, email, phone, address, password, admin) values ('Stefanie', 'Stefanie Alvarado', 'salvarado0@columbia.edu', 687-999-2418, '6 Ilene Place', '$2y$12$Tvp5ak/hGH/OSkv471/rhuQH/pxYDT.KNIN335yvKJhNzRZZCoLmK
', true);
INSERT INTO base_resto.users (userName, fullName, email, phone, address, password, admin) values ('Lynnet', 'Lynnet Cellone', 'lcellone1@loc.gov', 605-134-3471, '598 Farmco Circle', '$2y$12$Tvp5ak/hGH/OSkv471/rhuQH/pxYDT.KNIN335yvKJhNzRZZCoLmK
', true);
INSERT INTO base_resto.users (userName, fullName, email, phone, address, password, admin) values ('Burg', 'Burg Kasparski', 'bkasparski2@example.com', 366-560-1841, '599 Artisan Trail', '$2y$12$Tvp5ak/hGH/OSkv471/rhuQH/pxYDT.KNIN335yvKJhNzRZZCoLmK
', false);
INSERT INTO base_resto.users (userName, fullName, email, phone, address, password, admin) values ('Aloin', 'Aloin Trembath', 'atrembath3@boston.com', 384-897-5657, '50 Chinook Park', '$2y$12$Tvp5ak/hGH/OSkv471/rhuQH/pxYDT.KNIN335yvKJhNzRZZCoLmK
', true);
INSERT INTO base_resto.users (userName, fullName, email, phone, address, password, admin) values ('Armstrong', 'Armstrong Popping', 'apopping4@msu.edu', 306-338-7561, '4298 Elgar Road', '$2y$12$Tvp5ak/hGH/OSkv471/rhuQH/pxYDT.KNIN335yvKJhNzRZZCoLmK
', true);


INSERT INTO `base_resto`.`orders` (`products`, `address`, `userId`) VALUES ('yuca', 'asdfasdf asdf', '5');
INSERT INTO `base_resto`.`orders` (`products`, `address`, `userId`) VALUES ('papa', 'asdfasdf asdf', '4');
