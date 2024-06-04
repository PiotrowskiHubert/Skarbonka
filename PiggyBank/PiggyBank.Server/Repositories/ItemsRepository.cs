using PiggyBank.Models;

namespace PiggyBank.Repositories
{
    internal interface IItemsRepository
    {
        List<Item> GetItems();
    }

    internal class ItemsRepository : IItemsRepository
    {
        public List<Item> GetItems()
        {
            using (var dbContext = new ItemsDbContext())
            {
                return dbContext.Item.ToList();
            }
        }
    }
}
