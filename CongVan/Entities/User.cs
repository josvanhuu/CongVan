using Kids.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CongVan.Entities
{
    [Table("kid_User")]
    public class User : Entity
    {
        
    }
    [Table("kid_Member")]
    public class Member : Entity
    {
        public string MemberCode { get; set; }
        public string FullName { get; set; }
        public DateTime? BirthDay { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Position { get; set; }
        public string DepartmentID { get; set; }
        public string Image { get; set; }
    }
}