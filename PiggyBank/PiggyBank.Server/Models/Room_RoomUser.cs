namespace PiggyBank.Server.Models
{
    public class Room_RoomUser
    {
        public int RoomId { get; set; }
        public Room Room { get; set; }
        public int RoomUserId { get; set; }
        public RoomUser RoomUser { get; set; }
    }
}
