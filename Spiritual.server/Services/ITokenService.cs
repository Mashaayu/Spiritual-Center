using Spiritual.Server.Identity;

namespace Spiritual.Server.Services
{
    public interface ITokenService
    {
        public  Task<string> CreateToken(AppUser User);
    }
}
