using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class CatalogoClientesRequest
    {
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string CorreoElectronico { get; set; }
        public string NumeroTelefono { get; set; }
        public int IdSucursalRegistro { get; set; }
        public string FechaNacimiento { get; set; }
    }
}