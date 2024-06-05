using Microsoft.AspNetCore.Mvc;
using PiggyBank.Server.Models;
using PiggyBank.Server.Services;

namespace PiggyBank.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomsController : Controller
    {
        private readonly IRoomsService _roomsService;
        public RoomsController(IRoomsService roomsService)
        {
            _roomsService = roomsService;
        }
        
        [HttpGet(Name = "GetRooms")]
        public IEnumerable<Room> Get()
        {
            IEnumerable<Room> items = _roomsService.GetRooms();
            return items;
        }

        [HttpPost]
        public IActionResult JoinRoom([FromBody] Room_RoomUser room_RoomUser)
        {
            if (room_RoomUser == null || room_RoomUser.RoomId <= 0 || room_RoomUser.RoomUserId <= 0)
            {
                return BadRequest("Invalid request");
            }

            _roomsService.JoinRoom(room_RoomUser);

            return Ok(new { message = "Successfully joined room" });
        }
    }
}
