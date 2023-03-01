using Opticas.libEmpleadosUsuarios;
using Opticas.libModulosTipos;
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
    [RoutePrefix("api/ModulosTipos")]
    public class ModulosTiposController : ApiController
    {
        [HttpGet]
        [Route("GetListModulosTipos")]
        public ModulosTiposResult GetListModulosTipos()
        {
            //entModulosTipos oEntModulos;
            ModulosTiposResult oResult = new ModulosTiposResult();

            //oEntModulos = (new JavaScriptSerializer()).Deserialize<entModulosTipos>(sparam);

            oResult.bError = true;
            try
            {
                using (rnModulosTipos oModulos = new rnModulosTipos())
                {
                    oModulos.ListarModulosTipos();

                    if (!oModulos.objError.bError)
                    {
                        oResult.ListModulosTipos = oModulos.ListResult;
                    }
                    else
                    {
                        throw oModulos.objError.uException;
                    }
                }
                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener los modulos tipos!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }
    }
}
