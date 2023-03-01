using Newtonsoft.Json.Linq;
using Opticas.libEmpleadosUsuarios;
using OpticasWebApi.Models.Request;
using OpticasWebApi.Models.Result;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Script.Serialization;
using System.Windows.Forms;

namespace OpticasWebApi.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("echoping")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("echouser")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
        }

        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {
            LoginResult oResult = new LoginResult();
            //string PassEncrypt = EncriptarPassword.Encriptar.EncriptarPass(login.Contraseña);
            oResult.bError = true;
            try
            {
                using (rnEmpleadosUsuarios oEmpleados = new rnEmpleadosUsuarios())
                {
                    if (login == null)
                        throw new HttpResponseException(HttpStatusCode.BadRequest);

                    oEmpleados.EmpleadoUsuario = login.Usuario;
                    oEmpleados.ContraseñaText = login.Contraseña;
                    oEmpleados.IniciarSesion();

                    if (!oEmpleados.objError.bError)
                    {
                        if (oEmpleados.bUsuarioValido)
                        {
                            var token = TokenGenerador.GenerarTokenJwt(login.Usuario);

                            oResult.Token = token;
                            oResult.Pagina = ConfigurationManager.AppSettings["urlPaginaInicial"];
                            oResult.bUsuarioValido = oEmpleados.bUsuarioValido;
                            oResult.bError = false;
                            oResult.IdNivelUsuario = oEmpleados.NivelUsuario;

                            return Ok(oResult);
                        }
                        else
                        {
                            oResult.Token = "";
                            oResult.bUsuarioValido = oEmpleados.bUsuarioValido;
                            oResult.bError = false;
                            oResult.Msg = "El usuario o la contraseña son incorrectos";

                            return Content(HttpStatusCode.OK, oResult);
                        }
                    }
                    else
                    {
                        throw new HttpResponseException(HttpStatusCode.BadRequest);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest("¡Error al autenticar el usuario!" + ex.Message.ToString());
            }
        }

    }
}
