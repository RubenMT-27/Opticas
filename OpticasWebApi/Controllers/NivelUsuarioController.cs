using AnceSystem.libEmpleados;
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
    [RoutePrefix("api/NivelUsuario")]
    public class NivelUsuarioController : ApiController
    {
        [HttpGet]
        [Route("GetListNivelUsuario")]
        public entResultNivelUsuario GetListMisMuestras([FromUri] string sparam)
        {
            entNivelesUsuarios eDatosSesion;
            entResultNivelUsuario oResult = new entResultNivelUsuario();

            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entNivelesUsuarios>(sparam);

            oResult.bError = true;
            try
            {
                using (rnNivelesUsuarios oMuestras = new rnNivelesUsuarios())
                {
                    oMuestras.ListarNivelUsuario();

                    if (!oMuestras.objError.bError)
                    {
                        oResult.ListNivelUsuario = oMuestras.ListResult;
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
        [Route("GuardarNivelUsuario")]
        public entResultNivelUsuario GuardarEmpleadoss([FromBody] NivelUsuarioRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultNivelUsuario oResult = new entResultNivelUsuario();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnNivelesUsuarios oSolicitudes = new rnNivelesUsuarios())
                {
                    oSolicitudes.NivelUsuario = oEmpleados.NivelUsuario;                  
                    oSolicitudes.GuardarNivelUsuario();

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
                oResult.Msg = "¡Se genero un error interno al momento de guardar un nivel de usuario, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


        [HttpPost]
        [Route("ActualizarNivelUsuario")]
        public entResultNivelUsuario ActualizarNivelUsuario([FromBody] NivelUsuarioRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultNivelUsuario oResult = new entResultNivelUsuario();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnNivelesUsuarios oSolicitudes = new rnNivelesUsuarios())
                {
                    oSolicitudes.NivelUsuario = oEmpleados.NivelUsuario;
                    oSolicitudes.IdNivelUsuario = oEmpleados.IdNivelUsuario;
                    oSolicitudes.ActualizarNivelUsuario();

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
                oResult.Msg = "¡Se genero un error interno al momento de actualizar un nivel de usuario, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


        [HttpPost]
        [Route("EliminarNivelUsuario")]
        public entResultNivelUsuario EliminarNivelUsuario([FromBody] NivelUsuarioRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultNivelUsuario oResult = new entResultNivelUsuario();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnNivelesUsuarios oSolicitudes = new rnNivelesUsuarios())
                {

                    oSolicitudes.IdNivelUsuario = oEmpleados.IdNivelUsuario;
                    oSolicitudes.EliminarNivelUsuario();

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
                oResult.Msg = "¡Se genero un error interno al momento de eliminar un nivel de usuario, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


        [HttpGet]
        [Route("GetListNivelesUsuariosCombo")]
        public entResultNivelUsuario GetListNivelesUsuariosCombo([FromUri] string sparam)
        {
            entNivelesUsuarios oDatos;
            entResultNivelUsuario oResult = new entResultNivelUsuario();

            oDatos = (new JavaScriptSerializer()).Deserialize<entNivelesUsuarios>(sparam);

            oResult.bError = true;
            try
            {
                using (rnNivelesUsuarios oSolicitudes = new rnNivelesUsuarios())
                {
                    oSolicitudes.ListarNiveles();

                    if (!oSolicitudes.objError.bError)
                    {
                        oResult.ListNivelUsuario = oSolicitudes.ListResult;
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
        [Route("GetListNivelEmpleado")]
        public entResultNivelUsuario GetListNivelEmpleado([FromUri] string sparam)
        {
            entNivelesUsuarios eDatosSesion;
            entResultNivelUsuario oResult = new entResultNivelUsuario();

            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entNivelesUsuarios>(sparam);

            oResult.bError = true;
            try
            {
                using (rnNivelesUsuarios oMuestras = new rnNivelesUsuarios())
                {
                    oMuestras.IdNivelUsuario = eDatosSesion.IdNivelUsuario;
                    oMuestras.ListarNivelEmpleado();

                    if (!oMuestras.objError.bError)
                    {
                        oResult.ListNivelUsuario = oMuestras.ListResult;
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
        [Route("ActualizarNivelEmpleado")]
        public entResultNivelUsuario ActualizarNivelEmpleado([FromBody] NivelUsuarioRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultNivelUsuario oResult = new entResultNivelUsuario();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnNivelesUsuarios oSolicitudes = new rnNivelesUsuarios())
                {
                    oSolicitudes.sXML = oEmpleados.IdEmpleado.ToString(); 
                    oSolicitudes.IdNivelUsuario = oEmpleados.IdNivelUsuario;
                    oSolicitudes.ActualizarNivelEmpleado();

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
                oResult.Msg = "¡Se genero un error interno al momento de actualizar un nivel de usuario, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }


    }
}





