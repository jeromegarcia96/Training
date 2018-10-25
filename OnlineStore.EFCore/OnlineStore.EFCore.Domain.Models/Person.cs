using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Person
    {

        private DateTime now = DateTime.Now;

   
        [Key]
        public Guid PersonId { get; set; }

        [MaxLength(60)]
        [Required]
        public string FirstName { get; set; }

        [MaxLength(60)]
        public string MiddleName { get; set; }

        [MaxLength(100)]
        [Required]
        public string LastName { get; set; }

        public string FullName
        {
            get
            {
               return this.FirstName + " " + this.LastName;
            }
        }

        public string FullNameWithCommaSpace
        {
            get
            {
                return this.LastName + ", " +  this.FirstName ;
            }
        }

        public string FullNameWithComma
        {
            get
            {
                return this.LastName + "," + this.FirstName;
            }
        }

        //public string FullNameWithComma
        //{
        //    get
        //    {
        //        return this.FirstName + this.LastName;
        //    }
        //}

        //[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Required]
        [Display(Name = "Age")]
        public int Age
        {
            get
            {
                DateTime n = DateTime.Now; // To avoid a race condition around midnight
                int age = n.Year - Birthday.Year;

                if (n.Month < Birthday.Month || (n.Month == Birthday.Month && n.Day < Birthday.Day))
                    age--;

                return age;
            }
            private set { }
        }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        [Required]
        public DateTime Birthday { get; set; }

        public byte[] Photo { get; set; }

        [MaxLength(10)]
        [Required]
        public string Gender { get; set; }

        [MaxLength(15)]
        [Required]
        public string RelationshipStatus { get; set; }

        [MaxLength(15)]
        [Required]
        public string Nationality { get; set; }

        [MaxLength(15)]
        [Required]
        public string PhoneNumber { get; set; }

        [MaxLength(60)]
        public string Religion { get; set; }

        [MaxLength(60)]
        [Required]
        public string StreetHouseNumBuilding { get; set; }

        [MaxLength(60)]
        public string BrgySubdv { get; set; }

        [MaxLength(60)]
        [Required]
        public string City { get; set; }

        [MaxLength(60)]
        [Required]
        public string Region { get; set; }


        [MaxLength(60)]
        [Required]
        public string Country { get; set; }

        [Required]
        public decimal PostalCode { get; set; }

        [Required]
        public decimal Latitude { get; set; }

        [Required]
        public decimal Longitude { get; set; }

    

    }
}
