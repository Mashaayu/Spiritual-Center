namespace Spiritual.server.Models.SigalRModels
{
    public class UserMessage
    {
        public string sentFrom {  get; set; }
        public string sentTo { get; set; }
        public string senderName { get; set; }
        public List<MessageData> Messages { get; set; } = new List<MessageData>();
    }

    public class MessageData {
    
        public string message { get; set; }
        public DateTime time { get; set; }
    }

    public class SenderReceiverDTO { 
        public string sender { get; set; }
        public string receiver { get; set; }
    }
}
