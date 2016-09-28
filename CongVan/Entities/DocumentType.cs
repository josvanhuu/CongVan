using Kids.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CongVan.Entities
{
    [Table("kid_DocumentType")]
    public class DocumentType : Entity
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Des { get; set; }
    }
}