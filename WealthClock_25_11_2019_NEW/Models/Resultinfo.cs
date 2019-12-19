using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WealthClock_25_11_2019_NEW.Models
{
    public class Resultinfo<T>
    {
        public string Description { get; set; }
        public bool IsSuccess { get; set; }
        public int Code { get; set; }
        public T Info { get; set; }
    }
}