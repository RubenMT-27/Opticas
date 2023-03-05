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
    [RoutePrefix("api/ProductosTipos")]
    public class ProductosTiposController : ApiController
    {
        [HttpGet]
        [Route("ListarProductosTiposGrid")]
        public ProductosTiposResult ListarProductosTiposGrid()
        {
            ProductosTiposResult oResult = new ProductosTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.ListarProductosTiposGrid();

                    if (!oProductosTipos.objError.bError)
                    {
                        oResult.ListProductosTipos = oProductosTipos.ListResult;
                    }
                    else
                    {
                        throw oProductosTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de tipos de productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("ListarProductosTiposCombo")]
        public ProductosTiposResult ListarProductosTiposCombo()
        {
            ProductosTiposResult oResult = new ProductosTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.ListarProductosTiposCombo();

                    if (!oProductosTipos.objError.bError)
                    {
                        oResult.ListProductosTipos = oProductosTipos.ListResult;
                    }
                    else
                    {
                        throw oProductosTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de tipos de productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("GuardarProductosTiposGrid")]
        public ProductosTiposResult GuardarProductosTiposGrid(ProductosTiposRequest oProductosTiposRequest)
        {
            ProductosTiposResult oResult = new ProductosTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.ProductoTipo = oProductosTiposRequest.ProductoTipo;
                    oProductosTipos.Descripcion = oProductosTiposRequest.Descripcion;
                    oProductosTipos.GuardarProductosTiposGrid();

                    if (!oProductosTipos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha guardado el nuevo tipo de producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al guardar el tipo de producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("ActualizarProductosTiposGrid")]
        public ProductosTiposResult ActualizarProductosTiposGrid(ProductosTiposRequest oProductosTiposRequest)
        {
            ProductosTiposResult oResult = new ProductosTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.IdProductoTipo = oProductosTiposRequest.IdProductoTipo;
                    oProductosTipos.ProductoTipo = oProductosTiposRequest.ProductoTipo;
                    oProductosTipos.Descripcion = oProductosTiposRequest.Descripcion;
                    oProductosTipos.ActualizarProductosTiposGrid();

                    if (!oProductosTipos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha actualizado el tipo de producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al actualizar el tipo de producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("EliminarProductosTiposGrid")]
        public ProductosTiposResult EliminarProductosTiposGrid(ProductosTiposRequest oProductosTiposRequest)
        {
            ProductosTiposResult oResult = new ProductosTiposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.IdProductoTipo = oProductosTiposRequest.IdProductoTipo;
                    oProductosTipos.EliminarProductosTiposGrid();

                    if (!oProductosTipos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha eliminado el tipo de producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosTipos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al eliminar el tipo de producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}

