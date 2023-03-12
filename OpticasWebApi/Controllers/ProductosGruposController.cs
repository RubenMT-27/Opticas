
using libProductosGrupos;
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
    [RoutePrefix("api/ProductosGrupos")]
    public class ProductosGruposController : ApiController
    {
        [HttpGet]
        [Route("ListarProductosGruposGrid")]
        public ProductosGruposResult ListarProductosGruposGrid()
        {
            ProductosGruposResult oResult = new ProductosGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosGrupos oProductosGrupos = new rnProductosGrupos())
                {
                    oProductosGrupos.ListarProductosGruposGrid();

                    if (!oProductosGrupos.objError.bError)
                    {
                        oResult.ListProductosGrupos = oProductosGrupos.ListResult;
                    }
                    else
                    {
                        throw oProductosGrupos.objError.uException;
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

        [HttpGet]
        [Route("ListarProductosGruposCombo")]
        public ProductosGruposResult ListarProductosGruposCombo()
        {
            ProductosGruposResult oResult = new ProductosGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosGrupos oProductosGrupos = new rnProductosGrupos())
                {
                    oProductosGrupos.ListarProductosGruposCombo();

                    if (!oProductosGrupos.objError.bError)
                    {
                        oResult.ListProductosGrupos = oProductosGrupos.ListResult;
                    }
                    else
                    {
                        throw oProductosGrupos.objError.uException;
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
        [Route("GuardarProductosGruposGrid")]
        public ProductosGruposResult GuardarProductosGruposGrid(ProductosGruposRequest oProductosGruposRequest)
        {
            ProductosGruposResult oResult = new ProductosGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosGrupos oProductosGrupos = new rnProductosGrupos())
                {
                    oProductosGrupos.ProductoGrupo = oProductosGruposRequest.ProductoGrupo;
                    oProductosGrupos.Descripcion = oProductosGruposRequest.Descripcion;
                    oProductosGrupos.GuardarProductosGruposGrid();

                    if (!oProductosGrupos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha guardado el nuevo Grupo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosGrupos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al guardar el Grupo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("ActualizarProductosGruposGrid")]
        public ProductosGruposResult ActualizarProductosGruposGrid(ProductosGruposRequest oProductosGruposRequest)
        {
            ProductosGruposResult oResult = new ProductosGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosGrupos oProductosGrupos = new rnProductosGrupos())
                {
                    oProductosGrupos.IdProductoGrupo = oProductosGruposRequest.IdProductoGrupo;
                    oProductosGrupos.ProductoGrupo = oProductosGruposRequest.ProductoGrupo;
                    oProductosGrupos.Descripcion = oProductosGruposRequest.Descripcion;
                    oProductosGrupos.ActualizarProductosGruposGrid();

                    if (!oProductosGrupos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha actualizado el Grupo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosGrupos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al actualizar el Grupo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("EliminarProductosGruposGrid")]
        public ProductosGruposResult EliminarProductosGruposGrid(ProductosGruposRequest oProductosGruposRequest)
        {
            ProductosGruposResult oResult = new ProductosGruposResult();

            oResult.bError = true;
            try
            {
                using (rnProductosGrupos oProductosGrupos = new rnProductosGrupos())
                {
                    oProductosGrupos.IdProductoGrupo = oProductosGruposRequest.IdProductoGrupo;
                    oProductosGrupos.EliminarProductosGruposGrid();

                    if (!oProductosGrupos.objError.bError)
                    {
                        oResult.Msg = "¡Se ha eliminado el Grupo de Producto de forma correcta!";
                    }
                    else
                    {
                        throw oProductosGrupos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se ha producido un error al eliminar el Grupo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}

