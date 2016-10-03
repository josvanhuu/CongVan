
using Kids.Entities;
using Kids.Services.Files;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CongVan.Entities
{
    public class Document : FileEntity
    {
        public string DocumentCode { get; set; }
        public string DocumentName { get; set; }
        public string DocumentDes { get; set; }
        public DateTime? DocumentDate { get; set; }
        public DateTime? DocumentDateAction { get; set; }
        public string DocumentType { get; set; }
        public string DocumentDepartment { get; set; }
        //public List<User> DocumentUser { get; set; }
    }
}