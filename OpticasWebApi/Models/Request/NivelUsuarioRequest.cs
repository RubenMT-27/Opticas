using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class NivelUsuarioRequest
    {
        public int IdEmpleado { get; set; }
        public int IdNivelUsuario { get; set; }
        public string NivelUsuario { get; set; }
       
    }
}