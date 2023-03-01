using AnceSystem.libSucursales;
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
    [RoutePrefix("api/Sucursales")]
    public class SucursalesController : ApiController
    {
        [HttpGet]
        [Route("GetListSucursales")]
        public entResultListSucursales GetListSucursaless([FromUri] string sparam)
        {
            entSucursales oDatos;
            entResultListSucursales oResult = new entResultListSucursales();

            oDatos = (new JavaScriptSerializer()).Deserialize<entSucursales>(sparam);

            oResult.bError = true;
            try
            {
                using (rnSucursales oSolicitudes = new rnSucursales())
                {
                    oSolicitudes.ListarSucursales();

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
