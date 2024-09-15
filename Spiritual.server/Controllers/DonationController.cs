
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Spiritual.server.Context;
using Microsoft.AspNetCore.Http.Headers;
using Spiritual.server.Models;
using Spiritual.server.Models.DTOs;
using Spiritual.server.Repository;
using Spiritual.Server.Models;
using System.Net;

namespace Spiritual.server.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class DonationController: ControllerBase
    {
        private readonly DevoteeDbContext dbContext;

        public DonationController(DevoteeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

       [HttpGet]
       [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<DonationDTO>>> GetDonationByAsc()
        {
            //Console.WriteLine("Token is :", RequestHeaders.Get<string>("this"));
            try
            {
                //  List<Donation> donations = await dbContext.Donations.FromSql($"SELECT * FROM Donations ORDER BY DonationAmount").ToListAsync();
                List<DonationDTO> donations = await dbContext.Database.SqlQueryRaw<DonationDTO>
                    ($"EXEC GetDonationGroupAsc").ToListAsync();

                return donations;
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
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
        public async Task<ActionResult<List<DonationDTO>>> GetDonationByDesc()
        {
            try
            {
                //List<Donation> donations = await dbContext.Donations.FromSql($"SELECT * FROM Donations ORDER BY DonationAmount DESC").ToListAsync();
                List<DonationDTO> donations = await dbContext.Database.SqlQueryRaw<DonationDTO>
                    ($"EXEC GetDonationGroupDESC").ToListAsync();
                return donations;
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
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

        [HttpGet("DevoteeDonation/{Devoteeid}")]
        [Authorize(Roles = "admin,devotee")]
        public async Task<ActionResult<IEnumerable<DonationDTO>>> GetDevoteesDonation(int Devoteeid)
        {

            try
            {
                List<DonationDTO> data = await dbContext.Database.SqlQueryRaw<DonationDTO>
                                            ($"EXEC GetDonationsForDevotee {Devoteeid}").ToListAsync();
                if (data == null)
                {
                    return NotFound("Count not found Donations");
                }
                return data;
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "devotee")]
        public async Task<ActionResult<Donation>> PostDonation(Donation donation)
        {
            try
            {
                 
                Devotee devotees = await dbContext.Devotees.FindAsync(donation.Devotee.Id);

                donation.DonationDate = DateTime.Now;
                donation.CreatedDate = DateTime.Now;
                donation.UpdatedDate = DateTime.Now;
                donation.CreatedByID = donation.Devotee.Id;
                donation.UpdatedByID = donation.Devotee.Id;

                // _context.Donations.Add(donation);

                try
                {
                    devotees.Donations.Add(donation);

                }
                catch(NotSupportedException ex)
                {
                    return StatusCode(StatusCodes.Status501NotImplemented);
                }

                await dbContext.SaveChangesAsync();

                return donation;

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


       


        [HttpDelete]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> DeleteDevotee(int Devoteeid)
        {
            try
            {
                Devotee devotee = await dbContext.Devotees.FindAsync(Devoteeid);
                dbContext.Devotees.Remove(devotee);

                await dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Unpaid")]
        public async Task<ActionResult<IEnumerable<Devotee>>> GetDevoteesNotPaidDonation()
        {
            try
            {
                var data = await dbContext.Devotees.FromSql($"EXEC GetDevoteesNotPaidDonation").ToListAsync();
                return data;
            }
            catch(ArgumentNullException ex)
            {
                return NotFound();
            }
            catch(OperationCanceledException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
