using Spiritual.server.Models;
using System.ComponentModel.DataAnnotations;

namespace Spiritual.Server.Models
{
    public class Donation:BaseEntity
    {
        [Required(ErrorMessage = "Amount is required")]
        [Range(100,int.MaxValue)]
        public int DonationAmount { get; set; }
        public DateTime DonationDate { get; set; }


        [Required(ErrorMessage = "Year is required")]
        public int year { get; set; }

        [Required(ErrorMessage = "Month is required")]
        public int month { get; set; }

        public  Devotee? Devotee { get; set; }

        public int? CreatedByID { get; set; }
        public int? UpdatedByID { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
