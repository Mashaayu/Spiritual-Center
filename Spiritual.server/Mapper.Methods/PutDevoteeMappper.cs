using Spiritual.server.Models;
using Spiritual.Server.Models.DTOs;
using System.Reflection;

namespace Spiritual.server.Mapper.Methods
{
    public class PutDevoteeMappper
    {
        public static async Task MapDevotee(DevoteePostDTO devotee,Devotee Devotee)
        {
            Type dtotype = devotee.GetType();
            PropertyInfo[] dtoproperties = dtotype.GetProperties();

            Type type = Devotee.GetType();
            PropertyInfo[] properties = type.GetProperties();

            for (int i = 0; i < properties.Length; i++)
            {
                for (int j = 0; j < dtoproperties.Length; j++)
                {

                    if (dtoproperties[j].Name == properties[i].Name && dtoproperties[j].PropertyType == properties[i].PropertyType)
                    {
                        var x = dtoproperties[j].GetValue(devotee);

                        if (dtoproperties[j].GetValue(devotee) != null)
                        {
                            properties[i].SetValue(Devotee, x);

                        }
                    }

                }
            }
        }
    }
}
