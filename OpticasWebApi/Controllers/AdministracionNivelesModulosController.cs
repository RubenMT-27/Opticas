using AnceSystem.libEmpleados;
using AnceSystem.libModulosNiveles;
using AnceSystem.libNivelesUsuarios;
using AnceSystem.libPuestos;
using AnceSystem.libSucursales;
using Opticas.libEmpleadosUsuarios;
using OpticasWebApi.Models;
using OpticasWebApi.Models.Request;
using OpticasWebApi.Models.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.UI;

namespace OpticasWebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/NivelModulo")]
    public class AdministracionNivelesModulosController : ApiController
    {
       
        [HttpGet]
        [Route("GetListNivelesModulos")]
        public entResultNivelModulo GetListNivelesModulos([FromUri] string sparam)
        {
            entModulosNiveles oDatos;
            entResultNivelModulo oResult = new entResultNivelModulo();

            oDatos = (new JavaScriptSerializer()).Deserialize<entModulosNiveles>(sparam);

            oResult.bError = true;
            try
            {
                using (rnModulosNiveles oSolicitudes = new rnModulosNiveles())
                {
                    oSolicitudes.IdNivelUsuario = oDatos.IdNivelUsuario;
                    oSolicitudes.ListarModulosNiveles();

                    if (!oSolicitudes.objError.bError)
                    {
                        oResult.ListNivelModulo = oSolicitudes.ListResult;
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
                oResult.Msg = "¡Se genero un error interno al momento de obtener los niveles!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpGet]
        [Route("GetListNivelesModulosGrid")]
        public entResultNivelModulo GetListNivelesModulosGrid([FromUri] string sparam)
        {
            entModulosNiveles eDatosSesion;
            entResultNivelModulo oResult = new entResultNivelModulo();

            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entModulosNiveles>(sparam);

            oResult.bError = true;
            try
            {
                using (rnModulosNiveles oMuestras = new rnModulosNiveles())
                {
                    oMuestras.IdNivelUsuario = eDatosSesion.IdNivelUsuario;
                    oMuestras.ListarNivelModuloGrid();

                    if (!oMuestras.objError.bError)
                    {
                        oResult.ListNivelModulo = oMuestras.ListResult;
                    }
                    else
                    {
                        throw oMuestras.objError.uException;
                    }
                }

                oResult.bError = false;
            }
            catch (Exception ex)
            {
                oResult.bError = true;
                oResult.Msg = "¡Se genero un error interno al momento de obtener listado de Niveles de Usuario!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("EliminarRelacion")]
        public entResultNivelModulo EliminarRelacion([FromBody] ModulosNivelesRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultNivelModulo oResult = new entResultNivelModulo();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnModulosNiveles oSolicitudes = new rnModulosNiveles())
                {

                    oSolicitudes.IdNivelUsuario = oEmpleados.IdNivelUsuario;
                    oSolicitudes.IdModulo = oEmpleados.IdModulo;
                    oSolicitudes.EliminarEmpleado();

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
                oResult.Msg = "¡Se genero un error interno al momento de eliminar un nuevo empleado, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


        [HttpPost]
        [Route("AgregarRelacion")]
        public entResultNivelModulo AgregarRelacion([FromBody] ModulosNivelesRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultNivelModulo oResult = new entResultNivelModulo();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnModulosNiveles oSolicitudes = new rnModulosNiveles())
                {

                    oSolicitudes.IdNivelUsuario = oEmpleados.IdNivelUsuario;
                    oSolicitudes.IdModulo = oEmpleados.IdModulo;
                    oSolicitudes.AgregarRelacion();

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
                oResult.Msg = "¡Se genero un error interno al momento de eliminar un nuevo empleado, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

    }
}





