using Spiritual.server.Models;

namespace Spiritual.server.Repository
{
    public interface IGenericRepo<T> where T : BaseEntity
    {
        public Task<List<T>> GetAllAsync();
        public Task<T> GetByIdAsync(int id);
        public Task<List<T>> DeleteByIdAsync(int id);

    }
}
