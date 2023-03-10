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

        [HttpPost]
        [Route("GuardarProductosGrid")]
        public ProductosResult GuardarProductosGrid(ProductosRequest oProductosRequest)
        {
            ProductosResult oResult = new ProductosResult();

            oResult.bError = true;
            try
            {
                using (rnProductos oProductos = new rnProductos())
                {
                    oProductos.IdProductoTipo = oProductosRequest.IdProductoTipo;
                    oProductos.IdProductoSubTipo = oProductosRequest.IdProductoSubTipo;
                    oProductos.IdProductoGrupo = oProductosRequest.IdProductoGrupo;
                    oProductos.IdProductoSubGrupo = oProductosRequest.IdProductoSubGrupo;
                    oProductos.Producto = oProductosRequest.Producto;
                    oProductos.Descripcion = oProductosRequest.Descripcion;
                    oProductos.Marca = oProductosRequest.Marca;
                    oProductos.GuardarProductosGrid();

                    if (!oProductos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha guardado el nuevo Producto de forma correcta!";
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
                oResult.Msg = "¡Se ha producido un error al guardar el Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("ActualizarProductosGrid")]
        public ProductosResult ActualizarProductosGrid(ProductosRequest oProductosRequest)
        {
            ProductosResult oResult = new ProductosResult();

            oResult.bError = true;
            try
            {
                using (rnProductos oProductos = new rnProductos())
                {
                    oProductos.IdProducto = oProductosRequest.IdProducto;
                    oProductos.IdProductoTipo = oProductosRequest.IdProductoTipo;
                    oProductos.IdProductoSubTipo = oProductosRequest.IdProductoSubTipo;
                    oProductos.IdProductoGrupo = oProductosRequest.IdProductoGrupo;
                    oProductos.IdProductoSubGrupo = oProductosRequest.IdProductoSubGrupo;
                    oProductos.Producto = oProductosRequest.Producto;
                    oProductos.Descripcion = oProductosRequest.Descripcion;
                    oProductos.Marca = oProductosRequest.Marca;
                    oProductos.ActualizarProductosGrid();

                    if (!oProductos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha actualizado el Producto de forma correcta!";
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
                oResult.Msg = "¡Se ha producido un error al actualizar el Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("EliminarProductosGrid")]
        public ProductosResult EliminarProductosGrid(ProductosRequest oProductosRequest)
        {
            ProductosResult oResult = new ProductosResult();

            oResult.bError = true;
            try
            {
                using (rnProductos oProductos = new rnProductos())
                {
                    oProductos.IdProductoTipo = oProductosRequest.IdProductoTipo;
                    oProductos.EliminarProductosGrid();

                    if (!oProductos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha eliminado el Producto de forma correcta!";
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
                oResult.Msg = "¡Se ha producido un error al eliminar el Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }



    }
}

