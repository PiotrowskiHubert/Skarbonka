USE PiggyBank;

INSERT INTO Users(Username, Password) VALUES('PajdaZeSmalcem', 'smalec123');
INSERT INTO Users(Username, Password, RoomUserId) VALUES('mareklesny', 'hotdog123', 1);

SELECT * FROM Users;

INSERT INTO Item(Name, Price) VALUES('Szczypior', 9.99);

SELECT * FROM Item;

INSERT INTO Expense(Name, PurchaseDate, RoomId) VALUES('Papier toaletowy', '05/06/2024', 1);

SELECT * FROM Expense;

INSERT INTO Room(Name) VALUES('Marek_Sienkiewicza_10A');
INSERT INTO Room(Name) VALUES('Jarek_Mandarynkowa_37');
INSERT INTO Room(Name, Password) VALUES('Lucek_Chrzanowa_07', 'hotdog123');

SELECT * FROM Room;

INSERT INTO RoomUser(FirstName, Surname) VALUES('Marek', 'Lesny');

SELECT * FROM RoomUser;

SELECT * FROM Room_RoomUser;