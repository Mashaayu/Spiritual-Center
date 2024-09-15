using Spiritual.server.Models.Message;

namespace Spiritual.server.Hubs.HubServices
{
    public interface IMessageService
    {

        public Task<List<Message>> GetMessages(string UserId);

        public Task<Message> PostMessage(Message message);

        public Task<GroupMessageModel> PostGroupMessage(GroupMessage message,string GroupName);

        public Task<List<GroupMessageModel>> GetGroupMessages(string UserID);

     
    }
}
