using Spiritual.server.Models;

namespace Spiritual.Server.Models
{
    public class UserImage : BaseEntity
    {
        
        public string name { get; set; }
        public string? size { get; set; }
        public string? type { get; set; }
        public  string? lastModified { get; set; }
        public DateTime? lastModifiedDate { get; set; }
        public string? webkitRelativePath { get; set; } = "default";


    }
}
