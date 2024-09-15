using Spiritual.Server.Identity;
using Microsoft.AspNetCore.Identity;

namespace Spiritual.Server.SeedData
{
    public class IdentitySeed
    {
        
        public static async Task SeedUser(RoleManager<AppRole> roleManager)
        {
            AppRole Role = new AppRole() { 
                Name = "admin",
            };
            AppRole Role1 = new AppRole()
            {
                Name = "devotee",
            };


            if (!roleManager.Roles.Any())
            {
                await roleManager.CreateAsync(Role);

                await roleManager.CreateAsync(Role1);
            }



        }
    }
}
