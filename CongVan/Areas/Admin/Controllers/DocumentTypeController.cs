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
        [HttpPost]
        public async System.Threading.Tasks.Task<JsonResult> Update(string eid, string code, string name, string des)
        {
            var documenttype = new DocumentType();
            documenttype.Name = name;
            documenttype.Code = code;
            documenttype.Des = des;
            try
            {
                if (eid == string.Empty)
                {
                    await Kids.Kid.DBContext.AddAsync(documenttype);
                }
                else
                {
                    documenttype.EID = eid;
                    await Kids.Kid.DBContext.UpdateAsync(documenttype);
                }

            }
            catch (Exception)
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public async System.Threading.Tasks.Task<JsonResult> Delete(string eid)
        {
            var documenttype = new DocumentType();

            var listDocumentByType = Kids.Kid.DBContext.FetchAll<Document>().Where(x => x.DocumentType == eid).ToList();
            if (listDocumentByType.Any())
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
            else
            {
                documenttype.EID = eid;

                await Kids.Kid.DBContext.DeleteAsync(documenttype);
            }
            return Json(1, JsonRequestBehavior.AllowGet);
        }
    }
}