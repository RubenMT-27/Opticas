using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class PuestosRequest
    {
        public int IdPuesto { get; set; }
        public string Puesto { get; set; }
        public string FechaAlta { get; set; }
        public bool Activo { get; set; }
    }
}