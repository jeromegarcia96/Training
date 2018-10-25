using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Course")]
    public class Course
    {
        [Key]
        public Guid CourseID { get; set; }

        [MaxLength(60)]
        [Required]
        public string CourseName { get; set; }

        [MaxLength(60)]
        [Required]
        public string Category { get; set; }

        [Required]
        public decimal CreditUnit { get; set; }

        [Required]
        public decimal CreditHours { get; set; }

        [Required]
        public Guid InstructionID { get; set; }

        [MaxLength(15)]
        [Required]
        public string Room { get; set; }

        [Required]
        public decimal StudentsInClass { get; set; }

        [MaxLength(15)]
        [Required]
        public string Department { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        public bool IsLecture { get; set; }

        public bool IsLaboratory { get; set; }

    }
}
