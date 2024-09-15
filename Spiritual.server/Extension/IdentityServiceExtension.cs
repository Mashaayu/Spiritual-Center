using Spiritual.server.Context;
using Spiritual.Server.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;


namespace Spiritual.Server.Extension
{
    public static class IdentityServiceExtension
    {
        public static IServiceCollection AddIdentityService(this IServiceCollection services,IConfiguration configuration) {
            var builder = services.AddIdentityCore<AppUser>()
                            .AddRoles<AppRole>()
                                    .AddRoleManager<RoleManager<AppRole>>();
            builder = new IdentityBuilder(builder.UserType, builder.RoleType, builder.Services);

            builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            builder.AddUserManager<UserManager<AppUser>>();
            builder.AddRoleManager<RoleManager<AppRole>>();
            builder.AddSignInManager<SignInManager<AppUser>>();
            

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options => {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"])),
                        ValidIssuer = configuration["Token:Issuer"]
                            ,
                        ValidateIssuer = true,
                        ValidateAudience = false,
                    };
                    options.Authority = "https://localhost:7194";
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Headers["access_token"];

                            // If the request is for our hub...
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                (path.StartsWithSegments("/hubs/Userhub")))
                            {
                                // Read the token out of the query string
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                }
               
                );
           
            services.AddLogging();
            return services;

        }
    }
}
