using CongVan.Entities;
using System.Linq;
using System.Web.Mvc;

namespace CongVan.Areas.Admin.Controllers
{
    public class DocumentController : Controller
    {
        // GET: Admin/Document
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Load()
        {
            var listDocument = Kids.Kid.DBContext.FetchAll<Document>().ToList();
            return Json(listDocument, JsonRequestBehavior.AllowGet);
        }
    }
}