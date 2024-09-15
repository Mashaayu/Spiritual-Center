namespace Spiritual.server.Models.SigalRModels
{
    public class MessageDTO
    {
        public string sender { get; set; }
        public string senderID { get; set; }
        public string receiver { get; set; }
        public string receiverID { get; set; }
        public List<MSG>? Messages { get; set; } = new List<MSG> ();
  
    }

    public class MSG
    {
        public string messageText { get; set; }
        public DateTime? time { get; set; } = DateTime.UtcNow;
    }
}
