using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class ProductosSubGruposRequest
    {
        public int IdProductoSubGrupo { get; set; }
        public int IdProductoGrupo { get; set; }
        public string ProductoSubGrupo { get; set; }
    }
}