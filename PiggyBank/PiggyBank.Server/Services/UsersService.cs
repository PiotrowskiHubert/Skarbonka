using PiggyBank.Server.Models;
using PiggyBank.Server.Repositories;

namespace PiggyBank.Server.Services
{
    public interface IUsersService
    {
        List<Users> GetUsers();
    }

    internal class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public List<Users> GetUsers() {
            return _usersRepository.GetUsers();
        }
    }
}
