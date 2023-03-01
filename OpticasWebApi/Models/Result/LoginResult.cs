using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace OpticasWebApi.Models.Result
{
    public class LoginResult
    {
        public string Token { get; set; }
        public string Pagina { get; set; }
        public bool bUsuarioValido { get; set; }
        public int IdNivelUsuario { get; set; }
        public bool bError { get; set; }
        public string Msg { get; set; }
    }
}