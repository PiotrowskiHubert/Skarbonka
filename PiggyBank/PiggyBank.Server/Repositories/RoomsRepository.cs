using PiggyBank.Server.Models;

namespace PiggyBank.Server.Repositories
{
    internal interface IRoomsRepository
    {
        List<Room> GetRooms();
        void JoinRoom(Room_RoomUser room_RoomUser);
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

        public void JoinRoom(Room_RoomUser roomRoomUser)
        {
            using (var dbContext = new DbContext())
            {
                // Call the method to add the RoomUser to the Room
                dbContext.AddRoomUserToRoom(roomRoomUser.RoomId, roomRoomUser.RoomUserId);
            }
        }
    }
}
