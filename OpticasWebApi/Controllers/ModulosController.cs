using Opticas.libModulos;
using Opticas.libModulosTipos;
using OpticasWebApi.Models.Request;
using OpticasWebApi.Models.Result;
using System;
using System.Data.SqlTypes;
using System.EnterpriseServices;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace OpticasWebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Modulos")]
    public class ModulosController : ApiController
    {
        [HttpGet]
        [Route("GetListModulos")]
        public ModulosResult GetListModulos([FromUri] string sparam)
        {
            ModulosNivelesRequest eEntModulos;
            ModulosResult oResult = new ModulosResult();

            eEntModulos = (new JavaScriptSerializer()).Deserialize<ModulosNivelesRequest>(sparam);

            oResult.bError = true;
            try
            {
                using (rnModulos oModulos = new rnModulos())
                {
                    oModulos.sXML = eEntModulos.IdNivelUsuario.ToString();
                    oModulos.ListarModulos();

                    if (!oModulos.objError.bError)
                    {
                        oResult.ListModulos = oModulos.ListResult;
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
