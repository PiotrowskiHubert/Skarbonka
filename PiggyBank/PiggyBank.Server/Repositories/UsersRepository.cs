using PiggyBank.Server.Models;

namespace PiggyBank.Server.Repositories
{
    internal interface IUsersRepository
    {
        Users GetUser(string username, string password);
    }
    internal class UsersRepository : IUsersRepository
    {
        public Users GetUser(string username, string password)
        {
            using (var dbContext = new DbContext())
            {
                var user = dbContext.Users.FirstOrDefault(u => u.Username == username);
                if (user != null)
                {
                    if(user.Password == password) { 
                        return user;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
