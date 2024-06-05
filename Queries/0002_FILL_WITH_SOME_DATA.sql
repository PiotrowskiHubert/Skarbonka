USE PiggyBank
GO

INSERT INTO Users(Username, Password) VALUES('PajdaZeSmalcem', 'smalec123');

SELECT * FROM Users;

INSERT INTO Item(Name, Price) VALUES('Szczypior', 9.99);

SELECT * FROM Item;

INSERT INTO Room(Name) VALUES('Marek_Sienkiewicza_10A');

SELECT * FROM Room;

INSERT INTO RoomUser(FirstName, Surname) VALUES('Marek', 'Lesny');

SELECT * FROM RoomUser;

SELECT * FROM Room_RoomUser;