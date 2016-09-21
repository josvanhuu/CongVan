
using System.Web.Mvc;

namespace CongVan.Controllers
{
   //[Route("Admin/Members")]
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult UserManagement()
        {
            return View();
        }

    }
}