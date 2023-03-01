using AnceSystem.libEmpleados;
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
    [RoutePrefix("api/MisEmpleados")]
    public class CatalogoEmpleadosController : ApiController
    {
        [HttpGet]
        [Route("GetListMisEmpleados")]
        public entResultListMuestras GetListMisMuestras([FromUri] string sparam)
        {
            entEmpleados eDatosSesion;
            entResultListMuestras oResult = new entResultListMuestras();

            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);

            oResult.bError = true;
            try
            {
                using (rnEmpleados oMuestras = new rnEmpleados())
                {
                    oMuestras.IdEmpleado = eDatosSesion.IdEmpleado;
                    oMuestras.ListarEmpleados();

                    if (!oMuestras.objError.bError)
                    {
                        oResult.ListMuestras = oMuestras.ListResult;
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
                oResult.Msg = "¡Se genero un error interno al momento de obtener las notificaciones por sistema!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        [HttpPost]
        [Route("GuardarEmpleado")]
        public entResultListMuestras GuardarEmpleadoss([FromBody] CatalogoEmpleadosRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultListMuestras oResult = new entResultListMuestras();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnEmpleados oSolicitudes = new rnEmpleados())
                {
                    oSolicitudes.Nombre = oEmpleados.Nombre;
                    oSolicitudes.ApellidoPaterno = oEmpleados.ApellidoPaterno;
                    oSolicitudes.ApellidoMaterno = oEmpleados.ApellidoMaterno;
                    oSolicitudes.CorreoElectronico = oEmpleados.CorreoElectronico;
                    oSolicitudes.NumeroTelefono = oEmpleados.NumeroTelefono;
                    oSolicitudes.IdSucursal = oEmpleados.IdSucursal;
                    oSolicitudes.IdPuesto = oEmpleados.IdPuesto;
                    oSolicitudes.Genero = oEmpleados.Genero;
                    oSolicitudes.FechaNacimiento = oEmpleados.FechaNacimiento;
                    oSolicitudes.FechaIngreso = oEmpleados.FechaIngreso;
                    oSolicitudes.GuardarSolicitud();

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
                oResult.Msg = "¡Se genero un error interno al momento de guardar un nuevo empleado, favor de verificar!";
                oResult.Msg = ex.Message;
            }
            return oResult;
        }

        //[HttpGet]
        //[Route("GetListSucursales")]
        //public entResultListSucursales GetListSucursaless([FromUri] string sparam)
        //{
        //    entSucursales oDatos;
        //    entResultListSucursales oResult = new entResultListSucursales();

        //    oDatos = (new JavaScriptSerializer()).Deserialize<entSucursales>(sparam);

        //    oResult.bError = true;
        //    try
        //    {
        //        using (rnSucursales oSolicitudes = new rnSucursales())
        //        {
        //            oSolicitudes.ListarSucursales();

        //            if (!oSolicitudes.objError.bError)
        //            {
        //                oResult.ListMuestras = oSolicitudes.ListResult;
        //            }
        //            else
        //            {
        //                throw oSolicitudes.objError.uException;
        //            }
        //        }
        //        oResult.bError = false;
        //    }
        //    catch (Exception ex)
        //    {
        //        oResult.bError = true;
        //        oResult.Msg = "¡Se genero un error interno al momento de obtener las notificaciones por sistema!";
        //        oResult.Msg = ex.Message;
        //    }
        //    return oResult;
        //}


        //[HttpGet]
        //[Route("GetListPuestos")]
        //public entResultListPuestos GetListPuestoss([FromUri] string sparam)
        //{
        //    entPuestos oDatos;
        //    entResultListPuestos oResult = new entResultListPuestos();

        //    oDatos = (new JavaScriptSerializer()).Deserialize<entPuestos>(sparam);

        //    oResult.bError = true;
        //    try
        //    {
        //        using (rnPuestos oSolicitudes = new rnPuestos())
        //        {
        //            oSolicitudes.ListarPuestos();

        //            if (!oSolicitudes.objError.bError)
        //            {
        //                oResult.ListMuestras = oSolicitudes.ListResult;
        //            }
        //            else
        //            {
        //                throw oSolicitudes.objError.uException;
        //            }
        //        }
        //        oResult.bError = false;
        //    }
        //    catch (Exception ex)
        //    {
        //        oResult.bError = true;
        //        oResult.Msg = "¡Se genero un error interno al momento de obtener las notificaciones por sistema!";
        //        oResult.Msg = ex.Message;
        //    }
        //    return oResult;
        //}



    }
}





