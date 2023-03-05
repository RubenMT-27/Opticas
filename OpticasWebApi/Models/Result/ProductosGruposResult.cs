using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Result
{
    public class ProductosGruposResult
    {
        public bool bError { get; set; }
        public string Msg { get; set; }
        public dynamic ListProductosGrupos { get; set; }
    }
}