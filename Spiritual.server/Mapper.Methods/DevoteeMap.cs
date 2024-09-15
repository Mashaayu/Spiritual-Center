using Spiritual.server.Context;
using Spiritual.server.Models;
using Spiritual.Server.AWS;
using Spiritual.Server.Models;
using Spiritual.Server.Models.DTOs;
using static System.Net.Mime.MediaTypeNames;

namespace Spiritual.server.Mapper.Methods
{
    public class DevoteeMap
    {
        public static async Task<Devotee> MapDevoteeValues(DevoteePostDTO devotee)
        {
            string image = "";
            if(devotee.UserImage != null)
            {
                //upload on aws bucket and getting image access URL;
                image = await UploadUserImage.UploadDevoteeImage(devotee.UserImage); 
            }

            Devotee devotee1 = new Devotee() { 

                    firstname = devotee.firstname,
                    middlename = devotee.middlename,
                    flatno = devotee.flatno,
                    lastname = devotee.lastname,
                    area = devotee.area,
                    city = devotee.city,
                    state = devotee.state,
                    pincode = devotee.pincode,
                    InitiationDate = (DateTime)devotee.InitiationDate,
                    emaidId = devotee.emaidId,
                    UserImage =  null,
                    UserImageURL = image,
                    CreatedByID = devotee.CreatedByID,
                    UpdatedByID = devotee.UpdatedByID,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    devoteeLoginId = $"{DateTime.Now.Year}-{devotee.firstname.Substring(0, 2)}-{devotee.lastname.Substring(0, 2)}-{((DateTime)devotee.InitiationDate).Month}"

            };
           
            return devotee1;
        }

    }
}
