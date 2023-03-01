using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class ModulosNivelesRequest
    {
        public int IdModuloNivel { get; set; }
        public int IdModulo { get; set; }
        public int IdNivelUsuario { get; set; }
    }
}