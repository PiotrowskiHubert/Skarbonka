namespace PiggyBank.Server.Dtos
{
    public class RoomExpenseDto
    {
        public string RoomName { get; set; }
        public string ExpenseName { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string ItemName { get; set; }
        public double ItemPrice { get; set; }
    }
}
