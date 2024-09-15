using Microsoft.AspNetCore.SignalR;
using System.hubs;
using Spiritual.server.Models.Message;
using Spiritual.server.Hubs.HubServices;


namespace Spiritual.server.Hubs
{
    public class UserHub : Hub
    {
        //ivate readonly AppIdentityDbContext context;


        private readonly static ConnectionMapping<string> _connections =
            new ConnectionMapping<string>();
        private readonly IMessageService messageService;

        public UserHub(IMessageService messageService)
        {
            this.messageService = messageService;
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.User.Identity.Name;
            List<Message> UserMessages = new List<Message>();
            if (userId != null)
            {
                UserMessages = await messageService.GetMessages(userId);
            }
            await Clients.Caller.SendAsync("OnConnected", UserMessages);
            /// extra
            if (userId != null)
                _connections.Add(userId, Context.ConnectionId);
        }

        public async Task<List<GroupMessageModel>> GetMyGroupMessages(string UserId)
        {
            List<GroupMessageModel> MyGroupMessages = await messageService.GetGroupMessages(UserId);
            return MyGroupMessages;
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            string name = Context.User.Identity.Name;

            _connections.Remove(name, Context.ConnectionId);
            
            return Task.CompletedTask;
        }

        public async Task SendNotification(string Message)
        {
            await Clients.All.SendAsync("ReceiveNotification", Message);
        }

        public async Task AddToGroupAsync(AddToGropModel model) {
            List<string> memebers = new List<string>();
            try
            {
                memebers = model.members;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            for (int i = 0; i < memebers.Count; i++) {

                foreach (var connectionId in _connections.GetConnections(memebers[i]))
                {
                    await Groups.AddToGroupAsync(connectionId, model.gropName);
                }
            }
           

        }
        public async Task SendGroupMessage(GroupMessage message, string GropName)
        {
            try
            {

                GroupMessageModel Model =  await messageService.PostGroupMessage(message,GropName);
                await Clients.Group(GropName).SendAsync("ReceiveGroupMessage", Model);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());   
            }
        }
        public async Task SendMessage(Message message)
        {
            try
            {
                string name = Context.User.Identity.Name;

                foreach (var connectionId in _connections.GetConnections(message.receiverID))
                {
                    await Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
                }
                await messageService.PostMessage(message);
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

        }
    }
}
