using Microsoft.AspNetCore.Identity;
using System.Globalization;

namespace Spiritual.Server.Identity
{
    public class AppUser : IdentityUser<int>
    {
        public string? PassWord { get; set; }
        public string? Role {  get; set; }


        public string GetUsername()
        {
            return UserName;
        }
    }
}
