using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kids.User.Identity;
using Kids.Admin;
using System.Threading.Tasks;
using Kids.Helpers;

namespace CongVan.Areas.Admin.Controllers
{
    public class LoginController : AuthenticateController
    {
        // GET: Admin/Login
        public async Task<ActionResult> Index()
        {
            //var user = new KidUser() { UserName = "kim" };
            //var userStore = new TUserStore<KidUser>();
            //await userStore.SetPasswordHashAsync(user, "abc@123");
            //await userStore.CreateAsync(user);
            //if (!IsAuthenticated)
            //    return View("Admin/Index");
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Action(string command, string username, string password)
        {
            if (command == "login")
            {
                var userStore = new TUserStore<KidUser>();
                IUser user = userStore.ValidateUser(username, password);
                if (user == null) return RedirectToAction("Admin/Login");

                Kids.Kid.Authentication.SignIn(user, true);
                return RedirectToAction("Index");
            }
            else if (command == "logout")
            {
                Kids.Kid.Authentication.SignOut();
                return RedirectToAction("Admin/Login");
            }

            return View("Index");
        }
    }
}