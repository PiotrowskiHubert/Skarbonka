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
    }
}
