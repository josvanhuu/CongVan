
using Kids.Entities;
using Kids.Services.Files;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CongVan.Entities
{
    //[Table("kid_Document")]
    public class Document : FileEntity
    {
        public string Code { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DocumentType { get; set; }
    }
}