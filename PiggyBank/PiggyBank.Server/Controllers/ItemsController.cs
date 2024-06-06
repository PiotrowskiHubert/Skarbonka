using Microsoft.AspNetCore.Mvc;
using PiggyBank.Models;
using PiggyBank.Server.Dtos;
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

        [HttpGet("GetItems", Name = "GetItems")]
        public IEnumerable<Item> Get()
        {
            IEnumerable<Item> items = _itemsService.GetItems();
            return items;
        }

        [HttpGet("GetRoomExpenses", Name = "GetRoomExpenses")]
        public IEnumerable<RoomExpenseDto> GetUserRooms([FromQuery] int userId)
        {
            IEnumerable<RoomExpenseDto> items = _itemsService.GetRoomExpenses(userId);
            return items;
        }

    }
}
