using Spiritual.server.Models;
using Spiritual.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Spiritual.Server.Models.DTOs
{
    public class DevoteePostDTO
    {
        [Required(ErrorMessage = "First Name is required")]
        [MaxLength(15, ErrorMessage = "For First Name minimum 3 char required")]
        [MinLength(3, ErrorMessage = "For First Name maximum 15 char allowed")]
        public string firstname { get; set; }

        [Required(ErrorMessage = "Middle Name is required")]
        [MaxLength(15, ErrorMessage = "For Middle Name minimum 3 char required")]
        [MinLength(3, ErrorMessage = "For Middle Name maximum 15 char allowed")]
        public string middlename { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        [MaxLength(15, ErrorMessage = "For Last Name minimum 3 char required")]
        [MinLength(3, ErrorMessage = "For Last Name maximum 15 char allowed")]
        public string lastname { get; set; }


        [Required(ErrorMessage = "Email is Required")]
       // [DataType(DataType.EmailAddress)]
        [RegularExpression(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", ErrorMessage = "Please enter correct email")]
        public string emaidId { get; set; }
        public string? devoteeLoginId { get; set; }
        
        [Required(ErrorMessage = "Initiation Date is required")]
        public DateTime? InitiationDate { get; set; }

        [Required(ErrorMessage = "Flat Number is required")]
        public int flatno { get; set; }
        
        [Required(ErrorMessage ="Area is required")]
        public string area { get; set; }
        
        [Required(ErrorMessage = "City is required")]
        public string city { get; set; }
        
        [Required(ErrorMessage = "State is required")]
        public string state { get; set; }
        
        [Required(ErrorMessage = "Pincode is required")]
        [RegularExpression(@"^[0-9]+$",ErrorMessage = "Pincode should not contain non digit characters")]
        [StringLength(6,ErrorMessage = "For Pincode maximum 6 digit allowed")]
      

        public string pincode { get; set; }

        public IFormFile? UserImage { get; set; }
        public string? UserImageURL { get; set; }

        public ICollection<Donation> Donations { get; set; } = [];
        public int? CreatedByID { get; set; }
        public int? UpdatedByID { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
