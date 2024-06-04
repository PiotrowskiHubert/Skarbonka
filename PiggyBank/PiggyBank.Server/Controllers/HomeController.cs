using Microsoft.AspNetCore.Mvc;
using PiggyBank.Models;
using PiggyBank.Services;

namespace PiggyBank.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IItemsService _itemsService;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, IItemsService itemsService)
        {
            _logger = logger;
            _itemsService = itemsService;
        }

        [HttpGet(Name = "GetHome")]
        public IEnumerable<Item> Get()
        {
            IEnumerable<Item> items = _itemsService.GetItems();
            return items;
        }
    }
}
