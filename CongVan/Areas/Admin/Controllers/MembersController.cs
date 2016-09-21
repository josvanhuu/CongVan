using System.Web.Mvc;
using System.Linq;
using CongVan.Entities;
using Kids.Helpers;

namespace CongVan.Areas.Admin.Controllers
{
    public class MembersController : Controller
    {
        // GET: Admin/Members
        public ActionResult Index()
        {
            var members = Kids.Kid.DBContext.FetchAll<Member>();
            ViewBag.Members = members.ToJSON();
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Action(string command)
        {
            if (command == "createmember")
            {
                var member = new Member();
                if (Request.Form["member-code"] != null)
                    member.MemberCode = Request.Form["member-code"];
                if (Request.Form["fullname"] != null)
                    member.FullName = Request.Form["fullname"];
                Kids.Kid.DBContext.Add(member);
            }

            return View("Index");
        }
    }
}