using AnceSystem.libProductosTipos;
using libProductosTipos;
using OpticasWebApi.Models.Request;
using OpticasWebApi.Models.Result;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;

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
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de Tipos de Productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("ListarProductosTiposCombo")]
        public ProductosTiposResult ListarProductosTiposCombo([FromUri] string sparam)
        {
            ProductosTiposResult oResult = new ProductosTiposResult();

            entProductosTipos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTipos>(sparam);

            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.IdProductoGrupo = eDatosSesion.IdProductoGrupo;
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
                oResult.Msg = "¡Se genero un error interno al momento de obtener el listado de Tipos de Productos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("GuardarProductosTiposGrid")]
        public ProductosTiposResult GuardarProductosTiposGrid([FromUri] string sparam)
        {
            ProductosTiposResult oResult = new ProductosTiposResult();
            entProductosTipos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTipos>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.IdProductoGrupo = eDatosSesion.IdProductoGrupo;
                    oProductosTipos.ProductoTipo = eDatosSesion.ProductoTipo;
                    oProductosTipos.Descripcion = eDatosSesion.Descripcion;
                    oProductosTipos.GuardarProductosTiposGrid();

                    if (!oProductosTipos.objError.bError)
                    {
                       
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
                oResult.Msg = "¡Se ha producido un error al guardar el Tipo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("ActualizarProductosTiposGrid")]
        public ProductosTiposResult ActualizarProductosTiposGrid([FromUri] string sparam)
        {
            ProductosTiposResult oResult = new ProductosTiposResult();
            entProductosTipos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTipos>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.IdProductoGrupo = eDatosSesion.IdProductoGrupo;
                    oProductosTipos.IdProductoTipo = eDatosSesion.IdProductoTipo;
                    oProductosTipos.ProductoTipo = eDatosSesion.ProductoTipo;
                    oProductosTipos.Descripcion = eDatosSesion.Descripcion;
                    oProductosTipos.ActualizarProductosTiposGrid();

                    if (!oProductosTipos.objError.bError)
                    {
                       
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
                oResult.Msg = "¡Se ha producido un error al actualizar el Tipo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("EliminarProductosTiposGrid")]
        public ProductosTiposResult EliminarProductosTiposGrid([FromUri] string sparam)
        {
            ProductosTiposResult oResult = new ProductosTiposResult();
            entProductosTipos eDatosSesion;
            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entProductosTipos>(sparam);
            oResult.bError = true;
            try
            {
                using (rnProductosTipos oProductosTipos = new rnProductosTipos())
                {
                    oProductosTipos.IdProductoTipo = eDatosSesion.IdProductoTipo;
                    oProductosTipos.EliminarProductosTiposGrid();

                    if (!oProductosTipos.objError.bError)
                    {
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
                oResult.Msg = "¡Se ha producido un error al eliminar el Tipo de Producto, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}

