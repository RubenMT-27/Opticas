using AnceSystem.libProductos;
using AnceSystem.libProductosCostos;
using AnceSystem.libProductosExistencias;
using libProductos;
using libProductosTipos;
using Opticas.libEmpleadosUsuarios;
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
    [RoutePrefix("api/Productos")]
    public class ProductosController : ApiController
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
        [Route("GuardarProductosGrid")]
        public ProductosResult GuardarProductosGrid([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosResult oResult = new ProductosResult();
            entProductos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductos>(sparam);
            entProductosCostos eDatosSesion2;
            eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entProductosCostos>(sparam);
            entProductosExistencias eDatosSesion3;
            eDatosSesion3 = (new JavaScriptSerializer()).Deserialize<entProductosExistencias>(sparam);
            oResult.bError = true;
            try
            {
                string sXMLDatos = "<XML><Datos PrecioCompra='"+ eDatosSesion2.PrecioCompra + "' PrecioVenta='" + eDatosSesion2.PrecioVenta + "' Cantidad='" + eDatosSesion3.Cantidad + "'/></XML>";
               
                using (rnProductos oSolicitudes = new rnProductos())
                {
                    oSolicitudes.Modelo = eDatosSesion.Modelo;
                    oSolicitudes.Marca = eDatosSesion.Marca;
                    oSolicitudes.Descripcion = eDatosSesion.Descripcion;
                    oSolicitudes.IdProductoGrupo = eDatosSesion.IdProductoGrupo;
                    oSolicitudes.IdProductoTipo = eDatosSesion.IdProductoTipo;
                    oSolicitudes.sXML = sXMLDatos;
                    oSolicitudes.GuardarProductosGrid();

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
        [Route("ActualizarProductosGrid")]
        public ProductosResult ActualizarProductosGrid([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosResult oResult = new ProductosResult();
            entProductos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductos>(sparam);
            entProductosCostos eDatosSesion2;
            eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entProductosCostos>(sparam);
            entProductosExistencias eDatosSesion3;
            eDatosSesion3 = (new JavaScriptSerializer()).Deserialize<entProductosExistencias>(sparam);
            oResult.bError = true;
            try

            { 
                 string sXMLDatos = "<XML><Datos PrecioCompra='" + eDatosSesion2.PrecioCompra + "' PrecioVenta='" + eDatosSesion2.PrecioVenta + "' Cantidad='" + eDatosSesion3.Cantidad + "' IdProductoExistencia='" + eDatosSesion3.IdProductoExistencia + "'/></XML>";

            using (rnProductos oSolicitudes = new rnProductos())
                {
                    oSolicitudes.Modelo = eDatosSesion.Modelo;
                    oSolicitudes.Marca = eDatosSesion.Marca;
                    oSolicitudes.Descripcion = eDatosSesion.Descripcion;
                    oSolicitudes.IdProductoGrupo = eDatosSesion.IdProductoGrupo;
                    oSolicitudes.IdProductoTipo = eDatosSesion.IdProductoTipo;
                    oSolicitudes.sXML = sXMLDatos;
                    oSolicitudes.IdProducto = eDatosSesion.IdProducto;
                    oSolicitudes.ActualizarProductosGrid();

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
        [Route("EliminarProductosGrid")]
        public ProductosResult EliminarProductosGrid([FromUri] string sparam)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            ProductosResult oResult = new ProductosResult();
            entProductos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductos>(sparam);
            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductos oSolicitudes = new rnProductos())
                {
                    oSolicitudes.IdProducto = eDatosSesion.IdProducto;
                    oSolicitudes.EliminarProductosGrid();

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
                oResult.Msg = "¡Se genero un error interno al momento de eliminar un nuevo producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


        [HttpGet]
        [Route("ListarProductosTraspasosGrid")]
        public ProductosResult ListarProductosTraspasosGrid([FromUri] string sparam)
        {
            ProductosResult oResult = new ProductosResult();
          
            entEmpleadosUsuarios eDatosSesion2;
            eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleadosUsuarios>(sparam);
            oResult.bError = true;
            try
            {
                string sXMLDatos = "<XML><Datos EmpleadoUsuario='" + eDatosSesion2.EmpleadoUsuario +"'/></XML>";

                using (rnProductos oProductos = new rnProductos())
                {
                    oProductos.sXML = sXMLDatos;
                    oProductos.ListarProductosTraspasosGrid();

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


    }
}

