using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Spiritual.server.Context;
using Spiritual.server.Models;

namespace Spiritual.server.Repository
{
    public class DevoteeRepo : IDevoteeRepo
    {
        private readonly DevoteeDbContext dbContext;

        public DevoteeRepo(DevoteeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<List<Devotee>> DeleteDevotee(int Devoteeid)
        {
            try
            {
                Devotee  devotee   = await dbContext.Devotees.FindAsync(Devoteeid);
                if (devotee != null)
                {
                    dbContext.Devotees.Remove(devotee);
                    await dbContext.SaveChangesAsync();
                }
                return await GetDevoteesAsync();
            }
            catch (Exception ex) {
                throw ;
            }
        }

        public async Task<List<Devotee>> GetDevoteeByDesc()
        {
            try
            {
                List<Devotee> Devotees = await dbContext.Devotees
               .Include(d => d.UserImage).OrderByDescending(d => d.devoteeLoginId).ToListAsync();

                return Devotees;
            }
            catch (Exception ex) {
                throw;
            }
        }

        public async Task<Devotee> GetDevoteeByID(int id)
        {
            try
            {
                Devotee devotee = await dbContext.Devotees .FindAsync(id);
                if(devotee != null)
                {
                    throw new  ArgumentNullException();
                }
                return devotee;
                
               
            }
            catch
            {
                throw new Exception();
            }
        }

        public async Task<List<Devotee>> GetDevoteesAsync()
        {
            try
            {
                List<Devotee> Devotees = await dbContext.Devotees
               .Include(d => d.UserImage).OrderBy(d => d.devoteeLoginId).ToListAsync();

                return Devotees;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
