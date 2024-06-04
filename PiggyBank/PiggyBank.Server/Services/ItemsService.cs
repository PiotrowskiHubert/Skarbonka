using PiggyBank.Models;
using PiggyBank.Repositories;

namespace PiggyBank.Services
{
    public interface IItemsService
    {
        List<Item> GetItems();
    }

    internal class ItemsService : IItemsService
    {
        private readonly IItemsRepository _itemsRepository;
        public ItemsService(IItemsRepository itemsRepository) {
            _itemsRepository = itemsRepository;
        }

        public List<Item> GetItems()
        {
            return _itemsRepository.GetItems(); 
        }
    }
}
