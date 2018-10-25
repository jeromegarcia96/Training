using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Student")]
    public class Student
    {
        [Key]
        public Guid StudentID { get; set; }

        [MaxLength(60)]
        [Required]
        public string FirstName { get; set; }

        [MaxLength(60)]
        [Required]
        public string LastName { get; set; }

        [MaxLength(60)]
        [Required]
        public string Email { get; set; }

        [Required]
        public decimal GPA { get; set; }

        [MaxLength(60)]
        [Required]
        public string Phone { get; set; }

        [MaxLength(60)]
        [Required]
        public string Major { get; set; }

        [MaxLength(100)]
        [Required]
        public string Address { get; set; }

        [MaxLength(15)]
        [Required]
        public string City { get; set; }

        [MaxLength(60)]
        [Required]
        public string ZipCode { get; set; }


        [MaxLength(60)]
        public string Religion { get; set; }

        public DateTime? DateEnrolled { get; set; }
        public bool IsEnrolled { get; set; }
    }
}
