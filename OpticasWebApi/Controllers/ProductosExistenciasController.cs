using AnceSystem.libProductos;
using AnceSystem.libProductosCostos;
using AnceSystem.libProductosExistencias;
using AnceSystem.libProductosTraspasos;
using libProductos;
using libProductosTipos;
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
    [RoutePrefix("api/ProductosExistencias")]
    public class ProductosExistenciasController : ApiController
    {
        [HttpGet]
        [Route("ValidarCantidades")]
        public ProductosExistenciasResult ValidarCantidades([FromUri] string sparam)
        {
            entProductosExistencias oDatos;
            ProductosExistenciasResult oResult = new ProductosExistenciasResult();
            oDatos = (new JavaScriptSerializer()).Deserialize<entProductosExistencias>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosExistencias oProductos = new rnProductosExistencias())
                {
                    oProductos.Cantidad = oDatos.Cantidad;
                    oProductos.IdProductoExistencia = oDatos.IdProductoExistencia;
                    oProductos.ValidarCantidades();

                    if (!oProductos.objError.bError)
                    {
                        if (oProductos.dt.Rows.Count > 0)
                        {
                            oResult.bCantidades = true;
                        }
                        else
                        {
                            oResult.bCantidades = false;
                        }
                           
                    }
                    else
                    {
                        throw oProductos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de Productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("ValidarExistenciaProducto")]
        public ProductosExistenciasResult ValidarExistenciaProducto([FromUri] string sparam)
        {
            entProductosExistencias oDatos;
            entProductosTraspasos oDatos2;
            ProductosExistenciasResult oResult = new ProductosExistenciasResult();
            oDatos = (new JavaScriptSerializer()).Deserialize<entProductosExistencias>(sparam);
            oDatos2 = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosTraspasos oProductos2 = new rnProductosTraspasos())
                using (rnProductosExistencias oProductos = new rnProductosExistencias())
                {
                    oProductos.IdProducto = oDatos.IdProducto;
                    oProductos.IdSucursal = oDatos.IdSucursal;
                    oProductos.ValidarExistenciaProducto();

                    if (!oProductos.objError.bError)
                    {
                        if (oProductos.dt.Rows.Count > 0)
                        {
                            oProductos2.IdProductoTrasapaso = oDatos2.IdProductoTrasapaso;
                            oProductos2.EmpleadoRecibe = oDatos2.EmpleadoRecibe;
                            oProductos2.AprobarTraspasoActualizar();
                            oResult.bExistencia = true;   
                        }
                        else
                        {
                            oProductos2.IdProductoTrasapaso = oDatos2.IdProductoTrasapaso;
                            oProductos2.EmpleadoRecibe = oDatos2.EmpleadoRecibe;
                            oProductos2.AprobarTraspasoNuevo();
                            oResult.bExistencia = false;
                        }

                    }
                    else
                    {
                        throw oProductos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de Productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }



    }
}

