using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using WealthClock_25_11_2019_NEW.Models;
using WealthClock_25_11_2019_NEW.CodeFile;
using System.Web.Security;
using System.IO;

namespace WealthClock_25_11_2019_NEW.Controllers.BeforeLoginController
{
    public class RegistrationController : Controller
    {
        // GET: Registration
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RegistrationPage()
        {
            return View();
        }
        public ActionResult UserRegistration()
        {
            AccountCodeFile acf = new AccountCodeFile();
            UserRegistration obj = new UserRegistration();
            string email = obj.uname = Request.Form.Get("_uname");
            obj.phn = Request.Form.Get("_phn");
            obj.email = Request.Form.Get("_email");
            string email2 = obj.email.ToString();
            obj.pass = Request.Form.Get("_pass");
            obj.advisor = Request.Form.Get("_advisor");
            string check = acf.checkExistingUserByMail(email2);
            if (check == "not found")
            {
                int i = Convert.ToInt32(acf.UserRegistration(obj));
                if (i > 0)
                {
                    //Mail setup
                    string bg = "Gourab";
                    string CreateBody()
                    {
                        string body = string.Empty;
                        using (StreamReader reader = new StreamReader(Server.MapPath("~/MailTemplate/NewRegistration.html")))
                        {
                            body = reader.ReadToEnd();
                        }
                        body = body.Replace("{0}", email);
                        body = body.Replace("{2}", "Your verification code is : ");
                        //body = body.Replace("{2.1}", "");
                        //body = body.Replace("{3}", otp);
                        //body = body.Replace("{4}", "Verification link : ");
                        //body = body.Replace("{5}", "");
                        return body;
                    }
                    Mail mail = new Mail();
                    mail.Mailgun(email2, "Welcome to Wealthclock Advisors", CreateBody());
                    //Mail setup
                    return Json("Success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("Not done", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json("already exist", JsonRequestBehavior.AllowGet);
            }

        }
    }
}