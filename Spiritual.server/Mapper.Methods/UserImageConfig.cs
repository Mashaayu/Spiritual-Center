using Spiritual.server.Context;
using Spiritual.Server.AWS;
using Spiritual.server.Models;
using Spiritual.Server.Models;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.EntityFrameworkCore;

namespace Spiritual.server.Mapper.Methods
{
    public class UserImageConfig
    {
        
        public static async Task<UserImage> SetUpUserImage(IFormFile UserImage,DevoteeDbContext dbContext)
        {
            
            UserImage userImage = new UserImage()
            {
               name = UserImage.FileName,
               size = UserImage.Length.ToString(),
               lastModified = "lastMod",
               lastModifiedDate = DateTime.Now,
               type = UserImage.ContentType,
               webkitRelativePath = "",
            };
            await dbContext.UserImages.AddAsync(userImage);

            await dbContext.SaveChangesAsync();
            return userImage;
        }
    }
}
