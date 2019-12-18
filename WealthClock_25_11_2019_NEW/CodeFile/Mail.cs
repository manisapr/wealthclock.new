using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Net.Mail;
using RestSharp;
using RestSharp.Authenticators;


namespace WealthClock_25_11_2019_NEW.CodeFile
{
    public class Mail
    {
        public bool Mailgun(string recieverMail,string Subject,string mailbody)
        {
            bool ret = false;
            var response = SendSimpleMessage(recieverMail, Subject,mailbody);
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                ret = true;
            }
            else
            {
                ret = false;
            }
            return ret;

        }
        public static RestResponse SendSimpleMessage(string reciever,string MailSubject,string mailbody)
        {

            RestClient client = new RestClient();
            client.BaseUrl = new Uri("https://api.mailgun.net/v3");
            client.Authenticator = new HttpBasicAuthenticator("api", "key-520b4acf1333c7578b4f7fe898b10138");
            RestRequest request = new RestRequest();
            request.AddParameter("domain", "mg.wealthclockadvisors.com", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "Wealthclock Advisors <hello@wealthclockadvisors.com>");
            request.AddParameter("to", reciever);
            request.AddParameter("subject", MailSubject);
            //request.AddParameter("text",tempobj.TemplateBody);
            request.AddParameter("html",mailbody);

            //if (SendingMailType == "FP")
            //{

            //}
            //else if (SendingMailType == "REG")
            //{
            //    request.AddParameter("bcc", "siddharth@wealthclockadvisors.com");

            //}
            //else if (SendingMailType == "Support")
            //{
            //    request.AddParameter("bcc", "contact@wealthclockadvisors.com");

            //}
            request.AddParameter("text", mailbody);
            request.Method = Method.POST;
            return (RestResponse)client.Execute(request);
        }
    }
}