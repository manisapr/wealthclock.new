using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WealthClock_25_11_2019_NEW.Controllers.AfterLogInController
{
    public class ReferAFriendController : Controller
    {
        // GET: ReferAFriend
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ReferAFriend()
        {
            if (Request.IsAuthenticated)
            {
                return View();
            }
            else
            {
                return RedirectToAction("LoginPage", "Login");
            }
        }
    }
}