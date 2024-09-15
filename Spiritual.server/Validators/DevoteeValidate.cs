using Spiritual.server.Models;
using Spiritual.Server.Models.DTOs;
using System.Reflection;

namespace Spiritual.server.Validators
{
    public class DevoteeValidate
    {
        public static bool ValidDevotee(DevoteePostDTO devoteePost)
        {
            bool valid = true;

            Type dtotype = devoteePost.GetType();
            PropertyInfo[] dtoproperties = dtotype.GetProperties();
            foreach (PropertyInfo dtoprop in dtoproperties) {

                if(dtoprop.Name != "UserImage" || dtoprop.Name != "UserImageURL")
                {
                    if (dtoprop.GetValue(devoteePost) == null)
                    {
                       valid = true;
                    }
                }
                
            }

            return valid;
        }
    }
}
