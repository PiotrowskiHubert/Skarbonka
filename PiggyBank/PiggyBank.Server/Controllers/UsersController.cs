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

        [HttpGet(Name = "GetUsers")]
        public IEnumerable<Users> Get()
        {
            IEnumerable<Users> users = _usersService.GetUsers();
            return users;
        }
    }
}
