using Spiritual.server.Models;

namespace Spiritual.Server.Models.DTOs
{
    public class DevoteeDTO:BaseEntity
    {

        public string firstname { get; set; }
        public string middlename { get; set; }
        public string lastname { get; set; }
        public string EmaidId { get; set; }
        public string DevoteeLoginId { get; set; }
        public DateTime InitiationDate { get; set; }
        public int flatno { get; set; }
        public string area { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int pincode { get; set; }

    }
}
