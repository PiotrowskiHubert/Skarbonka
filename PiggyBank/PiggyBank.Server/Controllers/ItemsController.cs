using Microsoft.AspNetCore.Mvc;
using PiggyBank.Models;
using PiggyBank.Repositories;
using PiggyBank.Services;

namespace PiggyBank.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : Controller
    {
        private readonly IItemsService _itemsService;
        public ItemsController(IItemsService itemsService) 
        {
            _itemsService = itemsService;
        }

        [HttpGet(Name = "GetItems")]
        public IEnumerable<Item> Get()
        {
            IEnumerable<Item> items = _itemsService.GetItems();
            return items;
        }

    }
}
