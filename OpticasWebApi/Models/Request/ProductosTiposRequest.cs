using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class ProductosTiposRequest
    {
        public int IdProductoTipo { get; set; }
        public int IdProductoGrupo { get; set; }
        public string ProductoTipo { get; set; }
        public string Descripcion { get; set; }
    }
}