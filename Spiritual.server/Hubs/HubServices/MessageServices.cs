using Amazon.S3.Model.Internal.MarshallTransformations;
using Spiritual.server.Models.Message;
using System.Security.Cryptography.Xml;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Spiritual.server.Hubs.HubServices
{
    public class MessageService : IMessageService
    {

        public List<Message> Messages { get; set; } = new List<Message>();

        public List<GroupMessageModel> UserGroups {get;set;} = new List<GroupMessageModel>();

        public async Task<List<Message>> GetMessages(string UserId)
        {

            return await Task.Run(() =>
            {
                var data = Messages.Where(m => m.senderID == UserId || m.receiverID == UserId).ToList();
                return data;
            });
        }


        public async Task<Message> PostMessage(Message message)
        {

            return await Task.Run(() =>
            {
                Messages.Add(message);
                return message;
            });
        }

        public Task<GroupMessageModel> PostGroupMessage(GroupMessage message, string GroupName)
        {
            GroupMessageModel group = new GroupMessageModel();
            bool IsListEmpty = false;
            if(UserGroups.Count == 0)
            {
                IsListEmpty = true;
            }

            if (message != null && GroupName != null )
            {
                if (IsListEmpty) {
                    group = new GroupMessageModel() {
                        groupName = GroupName,
                        messages = new List<GroupMessage>() { message }
                    };
                    UserGroups.Add(group);
                    return Task.Run(()=> {
                        return group;
                    });
                }
                else
                {
                    GroupMessageModel GroupModel = UserGroups.Where(g => g.groupName == GroupName)
                        .FirstOrDefault();
                    if (GroupModel != null) {
                        GroupModel.messages.Add(message);
                    }
                    return Task.Run(() =>
                    {
                        return GroupModel;
                    });
                }
            }
            else
            {
                UserGroups.Add(group);
                return Task.Run(() => {
                    return group;
                });
            }
        }

        public Task<List<GroupMessageModel>> GetGroupMessages(string UserID)
        {
            List<GroupMessageModel> MyGroups = UserGroups.Select(g =>
                    new GroupMessageModel() { 
                          groupName = g.groupName,
                          messages = g.messages.Where(m=>m.senderID == UserID).ToList(),
                    })
                .ToList();
            return Task.Run(() =>
            {
                return MyGroups;
            });

        }

       
    }
}
