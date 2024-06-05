using PiggyBank.Server.Models;

namespace PiggyBank.Server.Repositories
{
    internal interface IUsersRepository
    {
        List<Users> GetUsers();
    }
    internal class UsersRepository : IUsersRepository
    {
        public List<Users> GetUsers()
        {
            using (var dbContext = new DbContext())
            {
                return dbContext.Users.ToList();
            }
        }
    }
}
