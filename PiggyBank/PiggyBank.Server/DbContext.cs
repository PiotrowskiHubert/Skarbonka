using Microsoft.EntityFrameworkCore;
using PiggyBank.Models;
using PiggyBank.Server.Models;

namespace PiggyBank
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Item> Item { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Room_RoomUser> Room_RoomUser { get; set; }
        public DbSet<Users> Users { get; set; }

        public void AddRoomUserToRoom(int roomId, int roomUserId)
        {
            var roomRoomUser = new Room_RoomUser
            {
                RoomId = roomId,
                RoomUserId = roomUserId
            };

            // Add the instance to the context and save changes
            Room_RoomUser.Add(roomRoomUser);
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
                .HasKey(rr => new { rr.RoomId, rr.RoomUserId }); // Composite key definition
        }
    }
}
