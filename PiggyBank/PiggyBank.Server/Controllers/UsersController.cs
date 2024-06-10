using Microsoft.AspNetCore.Mvc;
using PiggyBank.Server.Models;
using PiggyBank.Server.Services;

namespace PiggyBank.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;
        public UsersController(IUsersService usersService) {
            _usersService = usersService;
        }

        [HttpGet("GetUser", Name = "GetUser")]
        public IActionResult Get([FromQuery] string username, [FromQuery] string password)
        {
            Users user = _usersService.GetUser(username, password);
            if(user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
