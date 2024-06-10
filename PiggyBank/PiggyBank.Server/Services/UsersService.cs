﻿using PiggyBank.Server.Models;
using PiggyBank.Server.Repositories;

namespace PiggyBank.Server.Services
{
    public interface IUsersService
    {
        Users GetUser(string username, string password);
    }

    internal class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public Users GetUser(string username, string password) {
            return _usersRepository.GetUser(username, password);
        }
    }
}
