using Spiritual.Server.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Spiritual.Server.Services;

namespace Spirituals.Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<AppUser> userManger;
        private readonly IConfiguration configuration;
        private readonly SymmetricSecurityKey key;

        public TokenService(UserManager<AppUser> userManger,IConfiguration configuration
            )
        {
            this.userManger = userManger;
            this.configuration = configuration;
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"]));
        }


        public async Task<string> CreateToken(AppUser User)
        {
            var role = await userManger.GetRolesAsync(User);

            var Claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, User.UserName),
                new Claim(ClaimTypes.Email,User.Email),
                new Claim(ClaimTypes.Role,role.FirstOrDefault())
            };

            var creads = new SigningCredentials(key,SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(Claims),

                Expires = DateTime.Now.AddDays(3),
                SigningCredentials = creads,
                Issuer = configuration["Token:Issuer"],
                Audience = ""
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
