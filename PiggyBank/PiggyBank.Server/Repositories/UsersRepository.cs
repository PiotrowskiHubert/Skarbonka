using PiggyBank.Models;
using PiggyBank.Server.Models;

namespace PiggyBank.Server.Repositories
{
    internal interface IUsersRepository
    {
        Users GetUser(string username, string password);
        bool RegisterUser(string username, string password, string firstName, string surname);
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

        public bool RegisterUser(string username, string password, string firstName, string surname) 
        {
            using (var dbContext = new DbContext())
            {
                var existingUser = dbContext.Users.FirstOrDefault(u => u.Username == username);
                if (existingUser == null)
                {
                    RoomUser roomUser = new RoomUser
                    {
                        FirstName = firstName,
                        Surname = surname
                    };

                    dbContext.RoomUser.Add(roomUser);
                    dbContext.SaveChanges();

                    Users user = new Users
                    {
                        Username = username,
                        Password = password,
                        RoomUserId = roomUser.Id
                    };
                    dbContext.Users.Add(user);
                    dbContext.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
