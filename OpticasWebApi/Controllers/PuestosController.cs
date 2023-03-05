using AnceSystem.libPuestos;
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

        [HttpGet]
        [Route("GetListPuestosGrid")]
        public entResultListPuestos GetListPuestosGrid()
        {
            entResultListPuestos oResult = new entResultListPuestos();

            oResult.bError = true;
            try
            {
                using (rnPuestos oPuestos = new rnPuestos())
                {
                    oPuestos.ListarPuestosGrid();

                    if (!oPuestos.objError.bError)
                    {
                        oResult.ListPuestos = oPuestos.ListResult;
                    }
                    else
                    {
                        throw oPuestos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de puestos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("GuardarPuestoGrid")]
        public entResultListPuestos GuardarPuestoGrid(PuestosRequest oPuestosRequest)
        {
            entResultListPuestos oResult = new entResultListPuestos();

            oResult.bError = true;
            try
            {
                using (rnPuestos oPuestos = new rnPuestos())
                {
                    oPuestos.Puesto = oPuestosRequest.Puesto;
                    oPuestos.GuardarPuestoGrid();

                    if (!oPuestos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha guardado el nuevo puesto de forma correcta!";
                    }
                    else
                    {
                        throw oPuestos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al guardar el puesto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("ActualizarPuestoGrid")]
        public entResultListPuestos ActualizarPuestoGrid(PuestosRequest oPuestosRequest)
        {
            entResultListPuestos oResult = new entResultListPuestos();

            oResult.bError = true;
            try
            {
                using (rnPuestos oPuestos = new rnPuestos())
                {
                    oPuestos.IdPuesto = oPuestosRequest.IdPuesto;
                    oPuestos.Puesto = oPuestosRequest.Puesto;
                    oPuestos.ActualizarPuestoGrid();

                    if (!oPuestos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha actualizado el puesto de forma correcta!";
                    }
                    else
                    {
                        throw oPuestos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al actualizar el puesto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("EliminarPuestoGrid")]
        public entResultListPuestos EliminarPuestoGrid(PuestosRequest oPuestosRequest)
        {
            entResultListPuestos oResult = new entResultListPuestos();

            oResult.bError = true;
            try
            {
                using (rnPuestos oPuestos = new rnPuestos())
                {
                    oPuestos.IdPuesto = oPuestosRequest.IdPuesto;
                    oPuestos.EliminarPuestoGrid();

                    if (!oPuestos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha eliminado el puesto de forma correcta!";
                    }
                    else
                    {
                        throw oPuestos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al eliminar el puesto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}
