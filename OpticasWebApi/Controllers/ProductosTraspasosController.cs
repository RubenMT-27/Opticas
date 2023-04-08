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
    [RoutePrefix("api/ProductosTraspasos")]
    public class ProductosTraspasosController : ApiController
    {
        [HttpGet]
        [Route("ListarProductosGrid")]
        public ProductosResult ListarProductosGrid()
        {
            ProductosResult oResult = new ProductosResult();

            oResult.bError = true;
            try
            {
                using (rnProductos oProductos = new rnProductos())
                {
                    oProductos.ListarProductosGrid();

                    if (!oProductos.objError.bError)
                    {
                        oResult.ListProductos = oProductos.ListResult;
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
        [Route("ListarProductosTraspasosSalidasGrid")]
        public ProductosTraspasosResult ListarProductosTraspasosSalidasGrid([FromUri] string sparam)
        {
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosTraspasos oProductos = new rnProductosTraspasos())
                {
                    oProductos.EmpleadoRegistra = eDatosSesion.EmpleadoRegistra;
                    oProductos.ListarProductosSalidasGrid();

                    if (!oProductos.objError.bError)
                    {
                        oResult.ListTraspasos = oProductos.ListResult;
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
        [Route("ListarProductosTraspasosEntradasGrid")]
        public ProductosTraspasosResult ListarProductosTraspasosEntradasGrid([FromUri] string sparam)
        {
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosTraspasos oProductos = new rnProductosTraspasos())
                {
                    oProductos.EmpleadoRecibe = eDatosSesion.EmpleadoRecibe;
                    oProductos.ListarProductosEntradasGrid();

                    if (!oProductos.objError.bError)
                    {
                        oResult.ListTraspasos = oProductos.ListResult;
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
        [Route("ListarProductosTraspasosSeguimientoGrid")]
        public ProductosTraspasosResult ListarProductosTraspasosSeguimientoGrid([FromUri] string sparam)
        {
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosTraspasos oProductos = new rnProductosTraspasos())
                {
                    oProductos.EmpleadoRecibe = eDatosSesion.EmpleadoRecibe;
                    oProductos.ListarProductosSeguimientoGrid();

                    if (!oProductos.objError.bError)
                    {
                        oResult.ListTraspasos = oProductos.ListResult;
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
        [Route("GuardarProductosTraspasos")]
        public ProductosTraspasosResult GuardarProductosTraspasos([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {
              
                using (rnProductosTraspasos oSolicitudes = new rnProductosTraspasos())
                {
                    oSolicitudes.IdProductoExistencia = eDatosSesion.IdProductoExistencia;
                    oSolicitudes.IdSucursalDestino = eDatosSesion.IdSucursalDestino;
                    oSolicitudes.CantidadTraspaso = eDatosSesion.CantidadTraspaso;
                    oSolicitudes.EmpleadoRegistra = eDatosSesion.EmpleadoRegistra;
                    oSolicitudes.GuardarProductosTraspasos();

                    if (!oSolicitudes.objError.bError)
                    {

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
                oResult.Msg = "¡Se genero un error interno al momento de guardar un nuevo empleado, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("EnviarTraspasos")]
        public ProductosTraspasosResult EnviarTraspasos([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {

                using (rnProductosTraspasos oSolicitudes = new rnProductosTraspasos())
                {
                    oSolicitudes.IdProductoTrasapaso = eDatosSesion.IdProductoTrasapaso;
                    oSolicitudes.IdProductoTraspasoStatus = eDatosSesion.IdProductoTraspasoStatus;
                    oSolicitudes.EmpleadoEnvia = eDatosSesion.EmpleadoEnvia;
                    oSolicitudes.EnviarTraspaso();

                    if (!oSolicitudes.objError.bError)
                    {

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
                oResult.Msg = "¡Se genero un error interno al momento de enviar un traspaso, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("RechazarTraspasos")]
        public ProductosTraspasosResult RechazarTraspasos([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {

                using (rnProductosTraspasos oSolicitudes = new rnProductosTraspasos())
                {
                    oSolicitudes.IdProductoTrasapaso = eDatosSesion.IdProductoTrasapaso;
                    oSolicitudes.IdProductoTraspasoStatus = eDatosSesion.IdProductoTraspasoStatus;
                    oSolicitudes.EmpleadoRechaza = eDatosSesion.EmpleadoRechaza;
                    oSolicitudes.MotivoRechazo = eDatosSesion.MotivoRechazo;
                    oSolicitudes.RechazarTraspaso();

                    if (!oSolicitudes.objError.bError)
                    {

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
                oResult.Msg = "¡Se genero un error interno al momento de enviar un traspaso, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


        [HttpGet]
        [Route("CancelarTraspasos")]
        public ProductosTraspasosResult CancelarTraspasos([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {

                using (rnProductosTraspasos oSolicitudes = new rnProductosTraspasos())
                {
                    oSolicitudes.IdProductoTrasapaso = eDatosSesion.IdProductoTrasapaso;
                    oSolicitudes.CancelarTraspaso();

                    if (!oSolicitudes.objError.bError)
                    {

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
                oResult.Msg = "¡Se genero un error interno al momento de enviar un traspaso, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("AprobarTraspasosNuevo")]
        public ProductosTraspasosResult AprobarTraspasosNuevo([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {

                using (rnProductosTraspasos oSolicitudes = new rnProductosTraspasos())
                {
                   

                    if (!oSolicitudes.objError.bError)
                    {

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
                oResult.Msg = "¡Se genero un error interno al momento de enviar un traspaso, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("AprobarTraspasosActualizar")]
        public ProductosTraspasosResult AprobarTraspasosActualizar([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosTraspasosResult oResult = new ProductosTraspasosResult();
            entProductosTraspasos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTraspasos>(sparam);
            oResult.bError = true;
            try
            {

                using (rnProductosTraspasos oSolicitudes = new rnProductosTraspasos())
                {
                   
                    if (!oSolicitudes.objError.bError)
                    {

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
                oResult.Msg = "¡Se genero un error interno al momento de enviar un traspaso, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }







    }
}

