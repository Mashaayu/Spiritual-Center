namespace Spiritual.server.Models.SigalRModels
{
    public class UserMessageDTO
    {
        public string sentFrom { get; set; }
        public string sentTo { get; set; }
        public string senderName { get; set; }
        public MessageData message { get; set; }
    }
}
