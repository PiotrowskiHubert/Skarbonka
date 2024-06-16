using Microsoft.AspNetCore.Mvc;
using PiggyBank.Models;
using PiggyBank.Server.Dtos;
using PiggyBank.Server.Models;
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

        [HttpPost("AddItem", Name = "AddItem")]
        public IActionResult AddItem([FromBody] Item item)
        {
            if (item != null)
            {
                _itemsService.AddItem(item);
                return Ok(new { message = "Successfully added new item" });
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("AddExpense", Name = "AddExpense")]
        public IActionResult AddExpense([FromBody] Expense expense)
        {
            if (expense != null)
            {
                _itemsService.AddExpense(expense);
                return Ok(new { message = "Successfully added new expense" });
            }
            else
            {
                return BadRequest("Invalid request");
            }
        }

        [HttpPost("RemoveItem", Name = "RemoveItem")]
        public IActionResult RemoveItem([FromBody] Item item)
        {
            if (item != null)
            {
                _itemsService.RemoveItem(item);
                return Ok(new { message = "Successfully removed item" });
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
