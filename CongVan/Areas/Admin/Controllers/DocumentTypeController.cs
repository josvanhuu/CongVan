using CongVan.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class DocumentTypeController : Controller
    {
        // GET: Admin/DocumentSettings
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Load(int pageIndex)
        {
            var pageSize = int.Parse(WebConfigurationManager.AppSettings["pagesize"]);
            var listDocumentType = Kids.Kid.DBContext.FetchAll<DocumentType>().ToList();
            if (listDocumentType.Any())
            {
                var pageCount = pageIndex * pageSize;
                if (listDocumentType.Count > pageCount)
                    listDocumentType = listDocumentType.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                else
                    listDocumentType = listDocumentType.Skip((pageIndex - 1) * pageSize).Take(listDocumentType.Count - ((pageIndex - 1) * pageSize)).ToList();
            }

            return Json(listDocumentType, JsonRequestBehavior.AllowGet);
        }
    }
}