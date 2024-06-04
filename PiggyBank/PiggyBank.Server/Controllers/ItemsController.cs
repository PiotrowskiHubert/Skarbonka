using PiggyBank.Repositories;
using PiggyBank.Services;

namespace PiggyBank.Controllers
{
    public class ItemsController
    {
        private readonly IItemsService _itemsService;
        public ItemsController(IItemsService itemsService) 
        {
            _itemsService = itemsService;
        }

    }
}
