using Microsoft.EntityFrameworkCore;
using PiggyBank.Server.Models;

namespace PiggyBank.Server.Repositories
{
    internal interface IRoomsRepository
    {
        List<Room> GetRooms();
        void JoinRoom(Room_RoomUser room_RoomUser);
        void LeaveRoom(Room_RoomUser room_RoomUser);
        List<Room_RoomUser> GetUserRooms(int userId);
    }

    internal class RoomsRepository : IRoomsRepository
    {
        public List<Room> GetRooms()
        {
            using (var dbContext = new DbContext())
            {
                return dbContext.Room.ToList();
            }
        }

        public List<Room_RoomUser> GetUserRooms(int userId)
        {
            using (var dbContext = new DbContext())
            {
                var rooms = dbContext.Room_RoomUser.FromSqlRaw("SELECT * FROM Room_RoomUser WHERE RoomUserId = {0}", userId).ToList();
                return rooms;
            }
        }

        public void JoinRoom(Room_RoomUser roomRoomUser)
        {
            using (var dbContext = new DbContext())
            {
                // Call the method to add the RoomUser to the Room
                dbContext.AddRoomUserToRoom(roomRoomUser.RoomId, roomRoomUser.RoomUserId);
            }
        }

        public void LeaveRoom(Room_RoomUser roomRoomUser)
        {
            using (var dbContext = new DbContext())
            {
                // Call the method to add the RoomUser to the Room
                dbContext.RemoveRoomUserFromRoom(roomRoomUser.RoomId, roomRoomUser.RoomUserId);
            }
        }
    }
}
