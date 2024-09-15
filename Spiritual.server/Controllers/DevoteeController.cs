using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Spiritual.server.Context;
using Spiritual.server.Mapper.Methods;
using Spiritual.server.Models;
using Spiritual.server.Models.DTOs;
using Spiritual.server.Repository;
using Spiritual.Server.AWS;
using Spiritual.Server.Identity;
using Spiritual.Server.Identity.IdentityDTOs;
using Spiritual.Server.Models;
using Spiritual.Server.Models.DTOs;

namespace Spiritual.server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DevoteeController : ControllerBase
    {
        private readonly DevoteeDbContext dbContext;
        private readonly UserManager<AppUser> userManger;
        private readonly IDevoteeRepo devoteeRepo;
   

        public DevoteeController(DevoteeDbContext dbContext, UserManager<AppUser> userManger,
            IDevoteeRepo devoteeRepo
           )
        {
            this.dbContext = dbContext;
            this.userManger = userManger;
            this.devoteeRepo = devoteeRepo;
           
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<Devotee>>> GetDevoteeByAsc()
        {
            try
            {
                List<Devotee> Devotees = await devoteeRepo.GetDevoteesAsync();
                if(Devotees == null)
                {
                    return NoContent();
                }
                return Devotees;
            }
            catch (ArgumentNullException ex)
            {
                return NotFound(422);   //UnprocessableEntity
            }
            catch (OperationCanceledException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ActiveUsers")]
        [Authorize(Roles = "admin,devotee")]
        public async Task<ActionResult<List<UserNameIDDto>>> GetDevoteeIDs()
        {
            try
            {
                List<Devotee> Devotees = await devoteeRepo.GetDevoteeByDesc();
                if (Devotees == null)
                {
                    return NoContent();
                }
                return Devotees.Select(d =>
                
                    new UserNameIDDto()
                    {
                        ID = d.devoteeLoginId,
                        Name = d.firstname,
                    }
                ).ToList();
            }
            catch (ArgumentNullException ex)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity);
            }
            catch (OperationCanceledException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("desc")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<Devotee>>> GetDevoteeByDesc()
        {
            try
            {
                List<Devotee> Devotees = await devoteeRepo.GetDevoteeByDesc();
                if (Devotees == null)
                {
                    return NoContent();
                }
                return Devotees;
            }
            catch (ArgumentNullException ex)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity);
            }
            catch (OperationCanceledException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       
        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Devotee>> GetDevoteeByID(int id)
        {
            try
            {
                Devotee devotee = await devoteeRepo.GetDevoteeByID(id);
                if (devotee == null)
                {
                    return NotFound("User not found");
                }
                return devotee;
            }
            catch (ArgumentNullException ex) {
                return NotFound(ex.Message);
            }
        }
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Devotee>> RegisterDevotee( DevoteePostDTO devotee)
        {
            try
            {
                Devotee Devotee = new Devotee();
                UserImage devoteeImage = new UserImage();

                if (devotee == null)
                {
                    return NotFound();
                }
                //mapping devotee
                Devotee = await DevoteeMap.MapDevoteeValues(devotee);

                if (devotee.UserImage != null)
                {
                    //mapping User Image
                     devoteeImage = await UserImageConfig.SetUpUserImage(devotee.UserImage, dbContext);
                }
                Devotee.UserImage = devoteeImage;


                try
                {
                    await dbContext.Devotees.AddAsync(Devotee);
                    await dbContext.SaveChangesAsync();


                    AppUser devoteeuser = new AppUser()
                    {
                        UserName = Devotee.devoteeLoginId,
                        PassWord = "password",
                        Role = "devotee",
                        Email = Devotee.emaidId,
                        
                    };

                    var createres = await userManger.CreateAsync(devoteeuser);
                    var roleres = await userManger.AddToRoleAsync(devoteeuser, "devotee");

                    if (!createres.Succeeded || !roleres.Succeeded)
                    {
                        return StatusCode(400);
                    }


                    return Ok(devotee);
                }
                catch(DbUpdateConcurrencyException e)
                {
                    return StatusCode(422);
                }
                catch (OperationCanceledException e)
                {
                    return StatusCode(StatusCodes.Status421MisdirectedRequest);
                }
                catch (DbUpdateException e)
                {
                    return StatusCode(422);
                }

               
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DevoteeLogin")]
        [AllowAnonymous]
        public async Task<ActionResult<Devotee>> LoginDevotee(LoginDevoteeDTO dto)
        {
            try
            {
                Devotee devotee = await dbContext.Devotees.FromSql($"SELECT TOP 1 * FROM Devotees WHERE devoteeLoginId = {dto.username}").FirstOrDefaultAsync();
                
                AppUser DevoteeUser = await userManger.FindByNameAsync(dto.username);

                if (devotee == null || DevoteeUser == null)
                {
                    return NotFound("Devotee Not found");
                }

                return devotee;

            }
            catch(ArgumentNullException e)
            {
                return NotFound(e.Message);
            }
            catch (OperationCanceledException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{DevoteeID}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Devotee>> Putdevotee(int DevoteeID, DevoteePostDTO devotee)
        {
            try
            {
            
                Devotee Devotee = await dbContext.Devotees.FindAsync(DevoteeID);

                //mapping objects 
                await PutDevoteeMappper.MapDevotee(devotee, Devotee);

               if(devotee.UserImage != null) 
               {
                    Devotee.UserImageURL = await UploadUserImage.UploadDevoteeImage(devotee.UserImage);
                    Devotee.UserImage = await UserImageConfig.SetUpUserImage(devotee.UserImage, dbContext);
               };

                await dbContext.SaveChangesAsync();

                return Ok(Devotee);
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{Devoteeid}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> DeleteDevotee(int Devoteeid)
        {
            try
            {

                 List<Devotee> data = await devoteeRepo.DeleteDevotee(Devoteeid);

                if(data != null)
                {
                    return NotFound(data.Count);
                }
                
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
