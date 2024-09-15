using Microsoft.AspNetCore.Mvc;
using Spiritual.server.Models;

namespace Spiritual.server.Repository
{
    public interface IDevoteeRepo
    {

        public Task<List<Devotee>> GetDevoteesAsync();

        public  Task<List<Devotee>> GetDevoteeByDesc();

        public Task<Devotee> GetDevoteeByID(int id);

        public Task<List<Devotee>> DeleteDevotee(int Devoteeid);
    }
}
