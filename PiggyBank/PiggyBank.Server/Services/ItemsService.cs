using PiggyBank.Models;
using PiggyBank.Repositories;
using PiggyBank.Server.Dtos;
using PiggyBank.Server.Models;

namespace PiggyBank.Services
{
    public interface IItemsService
    {
        List<Item> GetItems();
        List<RoomExpenseDto> GetRoomExpenses(int userId);
        int AddItem(Item item);
        int AddExpense(Expense expense);
        void RemoveItem(Item item);
        void RemoveExpense(int expenseId);
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

        public List<RoomExpenseDto> GetRoomExpenses(int userId)
        {
            using (var dbContext = new DbContext())
            {
                return _itemsRepository.GetRoomExpenses(userId);
            }
        }

        public int AddItem(Item item)
        {
            return _itemsRepository.AddItem(item);
        }

        public int AddExpense(Expense expense)
        {
            return _itemsRepository.AddExpense(expense);
        }

        public void RemoveItem(Item item)
        {
            _itemsRepository.RemoveItem(item);
        }

        public void RemoveExpense(int expenseId)
        {
            _itemsRepository.RemoveExpense(expenseId);
        }
    }
}
