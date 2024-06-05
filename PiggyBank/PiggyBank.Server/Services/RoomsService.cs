using PiggyBank.Models;
using PiggyBank.Server.Models;
using PiggyBank.Server.Repositories;

namespace PiggyBank.Server.Services
{
    public interface IRoomsService
    {
        List<Room> GetRooms();
        void JoinRoom(Room_RoomUser roomRoomUser);
    }
    internal class RoomsService : IRoomsService
    {
        private readonly IRoomsRepository _roomsRepository;

        public RoomsService(IRoomsRepository roomsRepository)
        {
            _roomsRepository = roomsRepository;
        }

        public List<Room> GetRooms()
        {
            return _roomsRepository.GetRooms();
        }

        public void JoinRoom(Room_RoomUser roomRoomUser)
        {
            _roomsRepository.JoinRoom(roomRoomUser);
        }
    }
}
