using Spiritual.Server.Identity;
using Spiritual.Server.Identity.IdentityDTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Spirituals.Server.Services;
using Microsoft.Identity.Client;
using Spiritual.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Spiritual.server.Identity.IdentityDTOs;

namespace Spiritual.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInmanger;
        private readonly ITokenService tokenservice;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInmanger,
            ITokenService Tokenservice)
        {
            this.userManager = userManager;
            this.signInmanger = signInmanger;
            tokenservice = Tokenservice;
        }

        
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO logindto)
        {
            try
            {
                AppUser User =  await userManager.FindByNameAsync(logindto.Username);
                if (User == null) {
                    //  return NotFound(new ApiResponse(404));
                    return NotFound();
                }
                return new UserDTO()
                {
                    UserName = User.UserName,
                    Token = await tokenservice.CreateToken(User),
                    Role =  User.Role,
                };
            }
            catch (Exception ex) {
                throw ex;
            }
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDTO)
        {
            try
            {
                AppUser User = new AppUser()
                {
                    UserName = registerDTO.Username,
                    Email = registerDTO.Email,
                    PassWord = registerDTO.Password,
                    Role = registerDTO.Role,

                };

                await userManager.CreateAsync(User, registerDTO.Password);

                await userManager.AddToRoleAsync(User, registerDTO.Role);

                return User;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Admins")]
     //   [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<AppUser>>> ListAdmins()
        {
            try
            {
                IList<AppUser> admins = await userManager.GetUsersInRoleAsync("admin");
                return admins.ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("devotees")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<AppUser>>> ListDevotees()
        {
            try
            {
                IList<AppUser> devotees = await userManager.GetUsersInRoleAsync("devotee");
                return devotees.ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //test purpose
        [HttpPost("Email")]
        public async Task<ActionResult<TestDTO>> GetTokenByEmailAndPassWord(testDTO1 creds)
        {
            try
            {
                AppUser user = await userManager.FindByEmailAsync(creds.email);
                if (user == null)
                {
                    return BadRequest("No user Found");
                }
                return new TestDTO
                {
                    Token = await tokenservice.CreateToken(user)
                };
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
