using AnceSystem.libEmpleadosRepartidores;
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
    [RoutePrefix("api/Repartidores")]
    public class EmpleadosRepartidoresController : ApiController
    {
        [HttpGet]
        [Route("GetListRepartidoresComboTraspaso")]
        public entResultListEmpleadosRepartidores GetListRepartidoresComboTraspaso([FromUri] string sparam)
        {
            entEmpleadosRepartidores oDatos;
            entResultListEmpleadosRepartidores oResult = new entResultListEmpleadosRepartidores();

            oDatos = (new JavaScriptSerializer()).Deserialize<entEmpleadosRepartidores>(sparam);

            oResult.bError = true;
            try
            {
                using (rnEmpleadosRepartidores oSolicitudes = new rnEmpleadosRepartidores())
                {
                    oSolicitudes.ListarEmpleadosRepartidores();

                    if (!oSolicitudes.objError.bError)
                    {
                        oResult.ListRepartidores = oSolicitudes.ListResult;
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

        [HttpGet]
        [Route("GetListSucursalesComboTraspaso")]
        public entResultListSucursales GetListSucursalesComboTraspaso([FromUri] string sparam)
        {
            entSucursales oDatos;
            entResultListSucursales oResult = new entResultListSucursales();

            oDatos = (new JavaScriptSerializer()).Deserialize<entSucursales>(sparam);

            oResult.bError = true;
            try
            {
                using (rnSucursales oSolicitudes = new rnSucursales())
                {
                    oSolicitudes.IdSucursal = oDatos.IdSucursal;
                    oSolicitudes.ListarSucursalesComboTraspaso();

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
