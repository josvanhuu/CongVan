using System.Web;
using System.Web.Mvc;
using Kids.User.Identity;
using Kids.Admin;
using System.Threading.Tasks;


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
                if (user == null) return Redirect("/Admin/Login");

                //Kids.Kid.Authentication.GetAuthenticatedUser() --- Get user for Cookies

                //var UserName = user.UserName;
                //var FullName = user.FullName;

                Kids.Kid.Authentication.SignIn(user, true);
                if (Request.UrlReferrer.ToString().ToLower().Contains("returnurl"))
                {
                    var action = Request.UrlReferrer.ToString().Split('?')[1];
                    action = HttpUtility.UrlDecode(action).Split('=')[1];
                    if (action.Trim() != string.Empty)
                        return Redirect(action);
                    else
                        return RedirectToAction("/Admin/Document?type=0");
                }
                return Redirect("/Admin/Document?type=0");
            }
            else if (command == "logout")
            {
                Kids.Kid.Authentication.SignOut();
                return Redirect("/Admin/Login");
            }

            return View("Index");
        }
    }
}