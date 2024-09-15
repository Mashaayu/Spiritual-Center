using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spiritual.server.Models.SigalRModels;

namespace Spiritual.server.Controllers
{
    public class MessageController : ControllerBase
    {
        private readonly List<UserMessage> userMessages;

        public MessageController(List<UserMessage> UserMessages)
        {
            userMessages = UserMessages;
        }


        [Authorize(Roles = "admin,devotee")]
        [HttpGet]
        public async Task<ActionResult<List<UserMessage>>> GetMessages()
        {
            try
            {
                if (userMessages == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(userMessages);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "admin,devotee")]
        [HttpPost]
        public async Task<ActionResult<UserMessage>> PostUserMessage(UserMessageDTO userMessage)
        {
            try
            {
                if (userMessage != null)
                {
                    UserMessage Message = userMessages.Where(msg =>
                    msg.sentFrom == userMessage.sentFrom && msg.sentTo == userMessage.sentTo)
                        .FirstOrDefault();

                    if (Message == null)
                    {


                        var newMsg = new UserMessage()
                        {
                            Messages = new List<MessageData>() { new MessageData() { message = userMessage.message.message
                            ,
                            time = DateTime.Now
                            }
                            },
                            senderName = userMessage.senderName,
                            sentFrom = userMessage.sentFrom,
                            sentTo = userMessage.sentTo,
                        };
                        userMessages.Add(newMsg);
                    }
                    else
                    {
                        foreach (var msg in userMessages)
                        {
                            if (msg.sentFrom == userMessage.sentFrom && msg.sentTo == userMessage.sentTo)
                            {
                                msg.Messages.Add(userMessage.message);

                            }
                        }
                    }
                }
                return BadRequest(userMessage);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "admin,devotee")]
        [HttpPost("GetBetweenTwo")]
        public async Task<ActionResult<UserMessage>> GetMessageBetweenTwoUsers(SenderReceiverDTO data)
        {
            try
            {
                UserMessage Msg = new UserMessage();

                if (userMessages == null)
                {
                    return NotFound();
                }
                else
                {
                    foreach (var userMessage in userMessages)
                    {
                        if (userMessage.sentFrom == data.sender && userMessage.sentTo == data.receiver)
                        {
                            Msg = userMessage;
                        }
                    }
                    if (Msg != null)
                    {
                        return Msg;
                    }

                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [Authorize(Roles = "admin,devotee")]
        [HttpPost("GetMessagesForUser")]
        public async Task<ActionResult<List<UserMessage>>> GetMessagesForUser(string UserId)
        {
            try
            {
                List<UserMessage> data =  userMessages.Where(msg=>msg.sentFrom == UserId).ToList();
                if(data.Count > 0)
                {
                    return Ok(data);    
                }
                return NotFound("No messages found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
