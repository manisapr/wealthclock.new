using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WealthClock_25_11_2019_NEW.Controllers.AfterLogInController
{
    public class ProfileController : Controller
    {
        // GET: Profile
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Profile()
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
        public ActionResult ScheduleAPickup()
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
        public ActionResult UploadDocuments()
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