using Amazon.S3.Model;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using Spiritual.server.Context;
using Spiritual.server.Models;

namespace Spiritual.server.Repository
{
    public class GenericRepo<T> : IGenericRepo<T> where T : BaseEntity
    {
        private readonly DevoteeDbContext dbcontext;

        public GenericRepo(DevoteeDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        public async Task<List<T>> GetAllAsync()
        {
            try
            {
                return await dbcontext.Set<T>().ToListAsync();
            }
            catch (Exception ex) {
                throw ex;
            }
           
        }

        public async Task<T> GetByIdAsync(int id)
        {
            try
            {
                return await dbcontext.Set<T>().FindAsync(id);
            }
            catch (Exception ex) {

                throw ex;     
            }
        }
        public async Task<List<T>> DeleteByIdAsync(int id)
        {
           
            try
            {
                T data = await dbcontext.Set<T>().FindAsync(id);
                dbcontext.Set<T>().Remove(data);
                await dbcontext.SaveChangesAsync();

                return await GetAllAsync();
                
            }
            catch (Exception ex) {

                Console.WriteLine(ex.Message);
                throw ex;
            }
           
        }

       
    }
}
