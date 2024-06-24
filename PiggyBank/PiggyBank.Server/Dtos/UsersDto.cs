namespace PiggyBank.Server.Dtos
{
    public class UsersDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public int? RoomUserId { get; set; }
    }
}
