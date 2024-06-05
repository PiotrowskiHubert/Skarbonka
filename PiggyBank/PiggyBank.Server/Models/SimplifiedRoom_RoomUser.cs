namespace PiggyBank.Server.Models
{
    public class SimplifiedRoom_RoomUser
    {
        public SimplifiedRoom_RoomUser(int roomId, int roomUserId) {
            RoomId = roomId;
            RoomUserId = roomUserId;
        }
        public int RoomId { get; set; }
        public int RoomUserId { get; set; }
    }
}
