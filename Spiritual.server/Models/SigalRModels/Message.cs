using Microsoft.EntityFrameworkCore;
using Spiritual.Server.Identity;
using System.ComponentModel.DataAnnotations;

namespace Spiritual.server.Models.Message
{
  
    public class Message
    {
        public string sender { get; set; }
        public string senderID { get; set; }
        public string receiver { get; set; }
        public string receiverID { get; set; }
        public string messageText { get; set; }
        public DateTime? time {  get; set; } = DateTime.UtcNow;

    }


    public class GroupMessage {

        public string sender { get; set; }
        public string senderID { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }

    }
    public class GroupMessageModel
    {
        public string groupName { get; set; }
        public List<GroupMessage> messages { get; set; }
    }

    public class AddToGropModel 
    {
    
        public string gropName { get; set; }
        public List<string> members { get; set; } 

    }

}
