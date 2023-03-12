using libProductosSubGrupos;
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
    [RoutePrefix("api/ProductosSubGrupos")]
    public class ProductosSubGruposController : ApiController
    {
        [HttpGet]
        [Route("ListarProductosSubGruposGrid")]
        public ProductosSubGruposResult ListarProductosSubGruposGrid()
        {
            ProductosSubGruposResult oResult = new ProductosSubGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubGrupos oProductosSubGrupos = new rnProductosSubGrupos())
                {
                    oProductosSubGrupos.ListarProductosSubGruposGrid();

                    if (!oProductosSubGrupos.objError.bError)
                    {
                        oResult.ListProductosSubGrupos = oProductosSubGrupos.ListResult;
                    }
                    else
                    {
                        throw oProductosSubGrupos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de SubGrupos de Productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("ListarProductosSubGruposCombo")]
        public ProductosSubGruposResult ListarProductosSubGruposCombo()
        {
            ProductosSubGruposResult oResult = new ProductosSubGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubGrupos oProductosSubGrupos = new rnProductosSubGrupos())
                {
                    oProductosSubGrupos.ListarProductosSubGruposCombo();

                    if (!oProductosSubGrupos.objError.bError)
                    {
                        oResult.ListProductosSubGrupos = oProductosSubGrupos.ListResult;
                    }
                    else
                    {
                        throw oProductosSubGrupos.objError.uException;
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
        [Route("GuardarProductosSubGruposGrid")]
        public ProductosSubGruposResult GuardarProductosSubGruposGrid(ProductosSubGruposRequest oProductosSubGruposRequest)
        {
            ProductosSubGruposResult oResult = new ProductosSubGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubGrupos oProductosSubGrupos = new rnProductosSubGrupos())
                {
                    oProductosSubGrupos.IdProductoGrupo = oProductosSubGruposRequest.IdProductoGrupo;
                    oProductosSubGrupos.ProductoSubGrupo = oProductosSubGruposRequest.ProductoSubGrupo;
                    oProductosSubGrupos.GuardarProductosSubGruposGrid();

                    if (!oProductosSubGrupos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha guardado el nuevo SubGrupo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosSubGrupos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al guardar el SubGrupo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("ActualizarProductosSubGruposGrid")]
        public ProductosSubGruposResult ActualizarProductosSubGruposGrid(ProductosSubGruposRequest oProductosSubGruposRequest)
        {
            ProductosSubGruposResult oResult = new ProductosSubGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubGrupos oProductosSubGrupos = new rnProductosSubGrupos())
                {
                    oProductosSubGrupos.IdProductoSubGrupo = oProductosSubGruposRequest.IdProductoSubGrupo;
                    oProductosSubGrupos.IdProductoGrupo = oProductosSubGruposRequest.IdProductoGrupo;
                    oProductosSubGrupos.ProductoSubGrupo = oProductosSubGruposRequest.ProductoSubGrupo;
                    oProductosSubGrupos.ActualizarProductosSubGruposGrid();

                    if (!oProductosSubGrupos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha actualizado el SubGrupo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosSubGrupos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al actualizar el SubGrupo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("EliminarProductosSubGruposGrid")]
        public ProductosSubGruposResult EliminarProductosSubGruposGrid(ProductosSubGruposRequest oProductosSubGruposRequest)
        {
            ProductosSubGruposResult oResult = new ProductosSubGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosSubGrupos oProductosSubGrupos = new rnProductosSubGrupos())
                {
                    oProductosSubGrupos.IdProductoSubGrupo = oProductosSubGruposRequest.IdProductoSubGrupo;
                    oProductosSubGrupos.EliminarProductosSubGruposGrid();

                    if (!oProductosSubGrupos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha eliminado el SubGrupo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosSubGrupos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al eliminar el SubGrupo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}
