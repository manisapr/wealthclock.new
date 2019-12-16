using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WealthClock_25_11_2019_NEW.Controllers.BeforeLoginController
{
    public class InsightsController : Controller
    {
        // GET: Insights
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Blog()
        {
            return View();
        }

        public ActionResult KnowledgeBytes()
        {
            return View();
        }

        public ActionResult Infographic()
        {
            return View();
        }

        public ActionResult Trending()
        {
            return View();
        }
    }
}