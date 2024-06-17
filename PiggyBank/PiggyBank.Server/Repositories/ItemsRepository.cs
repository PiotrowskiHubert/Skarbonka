using Microsoft.EntityFrameworkCore;
using PiggyBank.Models;
using PiggyBank.Server.Dtos;
using PiggyBank.Server.Models;

namespace PiggyBank.Repositories
{
    internal interface IItemsRepository
    {
        List<Item> GetItems();
        List<RoomExpenseDto> GetRoomExpenses(int userId);
        void AddItem(Item item);
        void AddExpense(Expense expense);
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

        public void AddItem(Item item)
        {
            using (var dbContext = new DbContext())
            {
                dbContext.AddItem(item);
            }
        }

        public void AddExpense(Expense expense)
        {
            using (var dbContext = new DbContext())
            {
                dbContext.AddExpense(expense);
            }
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
