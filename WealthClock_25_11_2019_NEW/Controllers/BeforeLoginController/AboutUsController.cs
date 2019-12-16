using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WealthClock_25_11_2019_NEW.Controllers.BeforeLoginController
{
    public class AboutUsController : Controller
    {
        // GET: AboutUs
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult WhyUs()
        {
            return View();
        }

        public ActionResult HowItWorks()
        {
            return View();
        }
    }
}