using Opticas.libEmpleadosUsuarios;
using Opticas.libModulos;
using OpticasWebApi.Models.Request;
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
    [RoutePrefix("api/EmpleadosUsuarios")]
    public class EmpleadosUsuariosController : ApiController
    {
        [HttpGet]
        [Route("GetListDatosUsuario")]
        public EmpleadosUsuariosResult GetListDatosUsuario([FromUri] string sparam)
        {
            entEmpleadosUsuarios eEntEmpleados;
            EmpleadosUsuariosResult oResult = new EmpleadosUsuariosResult();

            eEntEmpleados = (new JavaScriptSerializer()).Deserialize<entEmpleadosUsuarios>(sparam);

            oResult.bError = true;
            try
            {
                using (rnEmpleadosUsuarios oEmpleados = new rnEmpleadosUsuarios())
                {
                    oEmpleados.EmpleadoUsuario = eEntEmpleados.EmpleadoUsuario;
                    oEmpleados.ListarDatosEmpleado();

                    if (!oEmpleados.objError.bError)
                    {
                        oResult.ListEmpleadosUsuarios = oEmpleados.ListResult;
                    }
                    else
                    {
                        throw oEmpleados.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener los modulos tipos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}
