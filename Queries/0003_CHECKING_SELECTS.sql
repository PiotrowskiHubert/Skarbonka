USE PiggyBank;

SELECT * FROM Users;

SELECT * FROM Item;

UPDATE Expense
SET RoomUserId = 1
WHERE Name LIKE 'AGD';

SELECT * FROM Expense;

SELECT * FROM Room;

SELECT * FROM RoomUser;

SELECT * FROM Room_RoomUser;

SELECT Name, RoomUserId FROM Room
INNER JOIN Room_RoomUser ON Room.Id = Room_RoomUser.RoomId;

SELECT Room.Name, Expense.Name, PurchaseDate, Item.Name, Item.Price FROM Room
INNER JOIN Expense ON Room.Id = Expense.RoomId
LEFT JOIN Item ON Expense.Id = Item.ExpenseId
INNER JOIN RoomUser ON Expense.RoomUserId = RoomUser.Id
WHERE RoomUser.Id = 1;

SELECT RoomUser.Id FROM RoomUser 
INNER JOIN Expense ON RoomUser.Id = Expense.RoomUserId; 