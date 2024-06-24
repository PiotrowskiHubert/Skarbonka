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
            // Create and add the new Room_RoomUser record
            var roomRoomUser = new Room_RoomUser
            {
                RoomId = roomId,
                RoomUserId = roomUserId
            };

            Room_RoomUser.Add(roomRoomUser);

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

            SaveChanges();
        }

        public List<RoomExpenseDto> GetRoomUsers(int userId)
        {
            var result = from room in Room
                         join room_roomuser in Room_RoomUser on room.Id equals room_roomuser.RoomId
                         join roomUser in RoomUser on room_roomuser.RoomUserId equals roomUser.Id
                         where roomUser.Id == userId
                         join expense in Expense on room.Id equals expense.RoomId
                         join item in Item on expense.Id equals item.ExpenseId into items
                         from item in items.DefaultIfEmpty() // Left join with items
                         select new
                         {
                             RoomId = room.Id,
                             RoomName = room.Name,
                             ExpenseId = expense.Id,
                             ExpenseName = expense.Name,
                             PurchaseDate = expense.PurchaseDate,
                             ItemName = item != null ? item.Name : null,
                             ItemPrice = item != null ? item.Price : (double?)null,
                             ItemId = item != null ? item.Id : (int?)null
                         };

            var groupedResult = result
                .GroupBy(r => new { r.ExpenseId, r.ItemId })
                .Select(g => new RoomExpenseDto
                {
                    RoomId = g.First().RoomId,
                    RoomName = g.First().RoomName,
                    ExpenseId = g.First().ExpenseId,
                    ExpenseName = g.First().ExpenseName,
                    PurchaseDate = g.First().PurchaseDate,
                    ItemName = g.First().ItemName,
                    ItemPrice = g.First().ItemPrice,
                    ItemId = g.First().ItemId
                })
                .ToList();

            return groupedResult;
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

        public void RemoveItem(Item item)
        {
            Item.Remove(item);
            SaveChanges();
        }

        public void RemoveExpense(int expenseId)
        {
            var expense = Expense.Where(e => e.Id == expenseId).FirstOrDefault();
            var items = Item.Where(i => i.ExpenseId == expenseId);
            if (items != null)
            {
                foreach (var item in items) {
                    Item.Remove(item);
                }
            }
            SaveChanges();
            if (expense != null)
            {
                Expense.Remove(expense);
            }
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
