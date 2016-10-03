using Kids.Entities;
using Kids.User.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CongVan.Entities
{
    public class User : KidUser
    {
        public string DepartmentId { get; set; }
        public string MemberCode { get; set; }
        public string Address { get; set; }
        public string Position { get; set; }
        public string Image { get; set; }
        public string Phone { get; set; }
    }
}