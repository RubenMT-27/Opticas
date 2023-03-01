using AnceSystem.libPuestos;
using OpticasWebApi.Models.Request;
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
    [RoutePrefix("api/Puestos")]
    public class PuestosController : ApiController
    {
        [HttpGet]
        [Route("GetListPuestos")]
        public entResultListPuestos GetListPuestoss([FromUri] string sparam)
        {
            entPuestos oDatos;
            entResultListPuestos oResult = new entResultListPuestos();

            oDatos = (new JavaScriptSerializer()).Deserialize<entPuestos>(sparam);

            oResult.bError = true;
            try
            {
                using (rnPuestos oSolicitudes = new rnPuestos())
                {
                    oSolicitudes.ListarPuestos();

                    if (!oSolicitudes.objError.bError)
                    {
                        oResult.ListMuestras = oSolicitudes.ListResult;
                    }
                    else
                    {
                        throw oSolicitudes.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener las notificaciones por sistema!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}
