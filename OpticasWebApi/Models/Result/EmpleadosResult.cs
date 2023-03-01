using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace OpticasWebApi.Models.Result
{
    public class entResultListMuestras
    {
        public bool bError { get; set; }
        public string Msg { get; set; }
        public dynamic ListMuestras { get; set; }
    }
}