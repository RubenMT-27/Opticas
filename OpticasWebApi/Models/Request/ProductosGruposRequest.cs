using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class ProductosGruposRequest
    {
        public int IdProductoGrupo { get; set; }
        public string ProductoGrupo { get; set; }
        public string Descripcion { get; set; }
    }
}