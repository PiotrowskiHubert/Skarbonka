using Microsoft.EntityFrameworkCore;
using PiggyBank.Models;
using PiggyBank.Server.Dtos;
using PiggyBank.Server.Models;

namespace PiggyBank
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Item> Item { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Room_RoomUser> Room_RoomUser { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Expense> Expense { get; set; }
        public DbSet<RoomUser> RoomUser {  get; set; }

        public void AddRoomUserToRoom(int roomId, int roomUserId)
        {
            var roomRoomUser = new Room_RoomUser
            {
                RoomId = roomId,
                RoomUserId = roomUserId
            };

            Room_RoomUser.Add(roomRoomUser);

            var expensesToUpdate = Expense.Where(e => e.RoomId == roomId);

            foreach (var expense in expensesToUpdate)
            {
                expense.RoomUserId = roomUserId;
            }

            SaveChanges();
        }

        public void RemoveRoomUserFromRoom(int roomId, int roomUserId)
        {
            var roomRoomUser = new Room_RoomUser
            {
                RoomId = roomId,
                RoomUserId = roomUserId
            };

            Room_RoomUser.Remove(roomRoomUser);

            var expensesToUpdate = Expense.Where(e => e.RoomUserId == roomUserId);

            foreach (var expense in expensesToUpdate)
            {
                expense.RoomUserId = null;
            }

            SaveChanges();
        }

        public List<RoomExpenseDto> GetRoomUsers(int userId)
        {
            var result = from room in Room
                         join expense in Expense on room.Id equals expense.RoomId
                         join item in Item on expense.Id equals item.ExpenseId
                         join roomUser in RoomUser on expense.RoomUserId equals roomUser.Id
                         where roomUser.Id == userId
                         select new RoomExpenseDto
                         {
                             RoomId = room.Id,
                             RoomName = room.Name,
                             ExpenseId = expense.Id,
                             ExpenseName = expense.Name,
                             PurchaseDate = expense.PurchaseDate,
                             ItemName = item.Name,
                             ItemPrice = item.Price
                         };

            return result.ToList();
        }

        public void AddItem(Item item)
        {
            Item.Add(item);
            SaveChanges();
        }

        public void AddExpense(Expense expense)
        {
            Expense.Add(expense);
            SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=LAPTOP-C7FDP790\\SQLEXPRESS;Initial Catalog=PiggyBank;TrustServerCertificate=True;Integrated Security=SSPI;User ID=admin;Password=passwordpassword;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room_RoomUser>()
                .HasKey(rr => new { rr.RoomId, rr.RoomUserId });
        }
    }
}
