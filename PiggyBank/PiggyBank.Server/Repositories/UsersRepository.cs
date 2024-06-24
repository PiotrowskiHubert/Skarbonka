using PiggyBank.Models;
using PiggyBank.Server.Models;
using System.Text;
using System.Security.Cryptography;
using System.Drawing;
using PiggyBank.Server.Dtos;

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
                    string storedHashedPassword = user.Password;
                    byte[] storedSaltBytes = Convert.FromBase64String(user.Salt);

                    // Convert the stored salt and entered password to byte arrays
                    // byte[] storedSaltBytes = Convert.FromBase64String(user.Salt);
                    byte[] enteredPasswordBytes = Encoding.UTF8.GetBytes(password);

                    // Concatenate entered password and stored salt
                    byte[] saltedPassword = new byte[enteredPasswordBytes.Length + storedSaltBytes.Length];
                    Buffer.BlockCopy(enteredPasswordBytes, 0, saltedPassword, 0, enteredPasswordBytes.Length);
                    Buffer.BlockCopy(storedSaltBytes, 0, saltedPassword, enteredPasswordBytes.Length, storedSaltBytes.Length);

                    // Hash the concatenated value
                    string enteredPasswordHash = HashPassword(password, storedSaltBytes);
                    if (user.Password == enteredPasswordHash) {
                        var userFinal = new Users()
                        {
                            Id = user.Id,
                            Username = user.Username,
                            Password = user.Password,
                            RoomUserId = user.RoomUserId,
                        };
                        return userFinal;
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

        string HashPassword(string password, byte[] salt)
        {
            var sha256 = new SHA256Managed();
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] saltedPassword = new byte[passwordBytes.Length + salt.Length];

            // Concatenate password and salt
            Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
            Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

            // Hash the concatenated password and salt
            byte[] hashedBytes = sha256.ComputeHash(saltedPassword);

            // Concatenate the salt and hashed password for storage
            byte[] hashedPasswordWithSalt = new byte[hashedBytes.Length + salt.Length];
            Buffer.BlockCopy(salt, 0, hashedPasswordWithSalt, 0, salt.Length);
            Buffer.BlockCopy(hashedBytes, 0, hashedPasswordWithSalt, salt.Length, hashedBytes.Length);

            return Convert.ToBase64String(hashedPasswordWithSalt);
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

                    byte[] salt = new byte[16];
                    
                    using (var rng = new RNGCryptoServiceProvider())
                    {
                        rng.GetBytes(salt);
                    }

                    password = HashPassword(password, salt);

                    UsersDto user = new UsersDto
                    {
                        Username = username,
                        Password = password,
                        Salt = Convert.ToBase64String(salt),
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
