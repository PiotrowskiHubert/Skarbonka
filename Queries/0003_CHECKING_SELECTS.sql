USE PiggyBank;

SELECT * FROM Users;

SELECT * FROM Item;

SELECT * FROM Expense;

SELECT * FROM Room;

SELECT * FROM RoomUser;

SELECT * FROM Room_RoomUser;

SELECT Name, RoomUserId FROM Room
INNER JOIN Room_RoomUser ON Room.Id = Room_RoomUser.RoomId;

SELECT Room.Name, Expense.Name, PurchaseDate, Item.Name, Item.Price FROM Room
INNER JOIN Room_RoomUser ON Room_RoomUser.RoomId = Room.Id
INNER JOIN RoomUser ON Room_RoomUser.RoomUserId = RoomUser.Id
LEFT JOIN Expense ON Room.Id = Expense.RoomId
LEFT JOIN Item ON Expense.Id = Item.ExpenseId
WHERE RoomUser.Id = 1;