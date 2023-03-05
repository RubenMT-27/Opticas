using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class ProductosSubTiposRequest
    {
        public int IdProductoSubTipo { get; set; }
        public int IdProductoTipo { get; set; }
        public string ProductoSubTipo { get; set; }
    }
}