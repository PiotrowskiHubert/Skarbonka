using PiggyBank.Models;
using PiggyBank.Server.Dtos;
using PiggyBank.Server.Models;

namespace PiggyBank.Repositories
{
    internal interface IItemsRepository
    {
        List<Item> GetItems();
        List<RoomExpenseDto> GetRoomExpenses(int userId);
        int AddItem(Item item);
        int AddExpense(Expense expense);
        void RemoveItem(Item item);
        void RemoveExpense(int expenseId);
    }

    internal class ItemsRepository : IItemsRepository
    {
        public List<Item> GetItems()
        {
            using (var dbContext = new DbContext())
            {
                return dbContext.Item.ToList();
            }
        }

        public List<RoomExpenseDto> GetRoomExpenses(int userId)
        {
            using (var dbContext = new DbContext())
            {
                return dbContext.GetRoomUsers(userId);
            }
        }

        public int AddItem(Item item)
        {
            int id;
            using (var dbContext = new DbContext())
            {
                id = dbContext.AddItem(item);
            }
            return id;
        }

        public int AddExpense(Expense expense)
        {
            int id;
            using (var dbContext = new DbContext())
            {
                id = dbContext.AddExpense(expense);
            }
            return id;
        }

        public void RemoveItem(Item item)
        {
            using (var dbContext = new DbContext())
            {
                dbContext.RemoveItem(item);
            }
        }

        public void RemoveExpense(int expenseId)
        {
            using (var dbContext = new DbContext())
            {
                dbContext.RemoveExpense(expenseId);
            }
        }
        
    }
}
