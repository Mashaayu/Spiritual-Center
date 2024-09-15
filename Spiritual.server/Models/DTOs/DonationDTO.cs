using System.ComponentModel.DataAnnotations;

namespace Spiritual.server.Models.DTOs
{
    public class DonationDTO : BaseEntity
    {
        
            [Required(ErrorMessage = "Amount is required")]
            [Range(100, int.MaxValue)]
            public int DonationAmount { get; set; }


            [Required(ErrorMessage = "Year is required")]
            public int year { get; set; }

            [Required(ErrorMessage = "Month is required")]
            public int month { get; set; }
           
            public string DevoteeId { get; set; }
        
        }
}


