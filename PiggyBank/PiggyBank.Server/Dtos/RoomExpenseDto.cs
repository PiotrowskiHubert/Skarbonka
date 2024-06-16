namespace PiggyBank.Server.Dtos
{
    public class RoomExpenseDto
    {
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public int ExpenseId { get; set; }
        public string ExpenseName { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string? ItemName { get; set; }
        public double? ItemPrice { get; set; }
    }
}
