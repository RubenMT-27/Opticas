using Opticas.libEmpleadosUsuarios;
using OpticasWebApi.Models.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace OpticasWebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/InicioSesion")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("IniciarSesion")]
        public LoginResult IniciarSesion([FromUri] string sparam)
        {
            entEmpleadosUsuarios oDatos;
            LoginResult oResult = new LoginResult();

            oDatos = (new JavaScriptSerializer()).Deserialize<entEmpleadosUsuarios>(sparam);

            oResult.bError = true;

            try
            {
                string PassEncrypt = EncriptarPassword.Encriptar.EncriptarPass(oDatos.Contraseña);
                using (rnEmpleadosUsuarios oLogin = new rnEmpleadosUsuarios())
                {
                    oLogin.EmpleadoUsuario = oDatos.EmpleadoUsuario;
                    oLogin.Contraseña = PassEncrypt;
                    oLogin.IniciarSesion();

                    if (!oLogin.objError.bError)
                    {
                        if (oLogin.dt.Rows.Count > 0)
                        {
                            oResult.bPassworCorrecta = true;
                        }
                        else
                        {
                            oResult.bPassworCorrecta = false;
                        }
                    }
                    else
                    {
                        throw oLogin.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al intentar iniciar sesión!";
                oResult.Msg = ex.Message;
          
            }
            return oResult; 
        }
    }
}
