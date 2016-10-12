
using Kids.Entities;
using Kids.Helpers;
using Kids.Services.Files;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CongVan.Entities
{

    public class File : FileEntity
    {

    }
    public class Document
    {
        public string Name { get; set; }
        public string VituarlPath { get; set; }
        //public List<User> DocumentUser { get; set; }
        public FileDirect FileDirect { get; set; }
    }
    [Table("Documents")]
    public class DocumentFolder : Entity
    {
        public string DocumentCode { get; set; }
        public string DocumentName { get; set; }
        public string DocumentDes { get; set; }
        public DateTime? DocumentDate { get; set; }
        public DateTime? DocumentDateAction { get; set; }
        public string DocumentType { get; set; }
        public string DocumentDepartment { get; set; }
        public string DocumentDepartmentAction { get; set; }
        public string DocumentOrganization { get; set; }
        public string DocumentUser { get; set; }
        public string DocumentUserAction { get; set; }

        private List<Document> _lstDoc;
        [NotMapped]
        public List<Document> ListDocument
        {
            get { return _lstDoc; }
            set
            {
                _lstDoc = value;
                AsyncHelper.RunAsync1(delegate {
                    if (_lstDoc != null && _lstDoc.Count > 0)
                    {
                        _lstJsonDoc = _lstDoc.ToJSON();
                    }
                });
            }
        }

        private string _lstJsonDoc;
        [Column("Document")]
        public string JsonListDocument
        {
            get
            {
                return _lstJsonDoc;
            }
            set
            {
                _lstJsonDoc = value;

                AsyncHelper.RunAsync1(delegate
                {
                    if (!string.IsNullOrEmpty(_lstJsonDoc))
                    {
                        _lstDoc = _lstJsonDoc.JsonToObject<List<Document>>();
                    }
                });
            }
        }
    }
}