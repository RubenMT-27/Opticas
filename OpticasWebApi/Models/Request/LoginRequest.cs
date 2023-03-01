using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Request
{
    public class LoginRequest
    {
        public string Usuario { get; set; }
        public string Contraseña { get; set; }
    }
}