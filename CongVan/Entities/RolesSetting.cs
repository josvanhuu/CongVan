using Kids.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CongVan.Entities
{
    [Table("kid_RolesSetting")]
    public class RolesSetting : Entity
    {
        public string Name { get; set; }
        public string Des { get; set; }
        public bool IsStatus { get; set; }
        public string Code { get; set; }
    }
}