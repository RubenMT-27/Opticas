using libProductosGrupos;
using libProductosSubTipos;
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
    [RoutePrefix("api/ProductosSubTipos")]
    public class ProductosSubTiposController : ApiController
    {
        [HttpGet]
        [Route("ListarProductosSubTiposGrid")]
        public ProductosSubTiposResult ListarProductosSubTiposGrid()
        {
            ProductosSubTiposResult oResult = new ProductosSubTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubTipos oProductosSubTipos = new rnProductosSubTipos())
                {
                    oProductosSubTipos.ListarProductosSubTiposGrid();

                    if (!oProductosSubTipos.objError.bError)
                    {
                        oResult.ListProductosSubTipos = oProductosSubTipos.ListResult;
                    }
                    else
                    {
                        throw oProductosSubTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de SubTipos de Productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


        [HttpGet]
        [Route("ListarProductosSubTiposCombo")]
        public ProductosSubTiposResult ListarProductosSubTiposCombo()
        {
            ProductosSubTiposResult oResult = new ProductosSubTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubTipos oProductosSubTipos = new rnProductosSubTipos())
                {
                    oProductosSubTipos.ListarProductosSubTiposCombo();

                    if (!oProductosSubTipos.objError.bError)
                    {
                        oResult.ListProductosSubTipos = oProductosSubTipos.ListResult;
                    }
                    else
                    {
                        throw oProductosSubTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de Grupos de Productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("GuardarProductosSubTiposGrid")]
        public ProductosSubTiposResult GuardarProductosSubTiposGrid(ProductosSubTiposRequest oProductosSubTiposRequest)
        {
            ProductosSubTiposResult oResult = new ProductosSubTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubTipos oProductosSubTipos = new rnProductosSubTipos())
                {
                    oProductosSubTipos.IdProductoTipo = oProductosSubTiposRequest.IdProductoTipo;
                    oProductosSubTipos.ProductoSubTipo = oProductosSubTiposRequest.ProductoSubTipo;
                    oProductosSubTipos.GuardarProductosSubTiposGrid();

                    if (!oProductosSubTipos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha guardado el nuevo SubTipo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosSubTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al guardar el SubTipo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("ActualizarProductosSubTiposGrid")]
        public ProductosSubTiposResult ActualizarProductosSubTiposGrid(ProductosSubTiposRequest oProductosSubTiposRequest)
        {
            ProductosSubTiposResult oResult = new ProductosSubTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubTipos oProductosSubTipos = new rnProductosSubTipos())
                {
                    oProductosSubTipos.IdProductoSubTipo = oProductosSubTiposRequest.IdProductoSubTipo;
                    oProductosSubTipos.IdProductoTipo = oProductosSubTiposRequest.IdProductoTipo;
                    oProductosSubTipos.ProductoSubTipo = oProductosSubTiposRequest.ProductoSubTipo;
                    oProductosSubTipos.ActualizarProductosSubTiposGrid();

                    if (!oProductosSubTipos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha actualizado el SubTipo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosSubTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al actualizar el SubTipo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("EliminarProductosSubTiposGrid")]
        public ProductosSubTiposResult EliminarProductosSubTiposGrid(ProductosSubTiposRequest oProductosSubTiposRequest)
        {
            ProductosSubTiposResult oResult = new ProductosSubTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubTipos oProductosSubTipos = new rnProductosSubTipos())
                {
                    oProductosSubTipos.IdProductoSubTipo = oProductosSubTiposRequest.IdProductoSubTipo;
                    oProductosSubTipos.EliminarProductosSubTiposGrid();

                    if (!oProductosSubTipos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha eliminado el SubTipo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosSubTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al eliminar el SubTipo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}

