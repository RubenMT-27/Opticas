using AnceSystem.libClientesHistorialClinico;
using AnceSystem.libEmpleados;
using AnceSystem.libPuestos;
using AnceSystem.libSucursales;
using Opticas.libEmpleadosUsuarios;
using OpticasWebApi.Models;
using OpticasWebApi.Models.Request;
using OpticasWebApi.Models.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.UI;

namespace OpticasWebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Historial")]
    public class ConsultaHistorialClinicoController : ApiController
    {
        [HttpGet]
        [Route("GetListHistorial")]
        public entResultListHistorial GetListHistorial([FromUri] string sparam)
        {
            entClientesHistorialClinico eDatosSesion;
            entResultListHistorial oResult = new entResultListHistorial();

            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entClientesHistorialClinico>(sparam);

            oResult.bError = true;
            try
            {
                using (rnClientesHistorialClinico oMuestras = new rnClientesHistorialClinico())
                {
                    oMuestras.ListarHistorial();

                    if (!oMuestras.objError.bError)
                    {
                        oResult.ListHistorial = oMuestras.ListResult;
                    }
                    else
                    {
                        throw oMuestras.objError.uException;
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





