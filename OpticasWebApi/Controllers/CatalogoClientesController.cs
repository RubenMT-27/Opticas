using AnceSystem.libClientes;
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
    [RoutePrefix("api/MisClientes")]
    public class CatalogoClientesController : ApiController
    {
        [HttpGet]
        [Route("GetListClientes")]
        public entResultListClientes GetListClientes([FromUri] string sparam)
        {
             entClientes eDatosSesion;
            entResultListClientes oResult = new entResultListClientes();

            eDatosSesion = (new JavaScriptSerializer()).Deserialize<entClientes>(sparam);

            oResult.bError = true;
            try
            {
                using (rnClientes oMuestras = new rnClientes())
                {
                    oMuestras.ListarClientes();

                    if (!oMuestras.objError.bError)
                    {
                        oResult.ListClientes = oMuestras.ListResult;
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
        [Route("GuardarCliente")]
        public entResultListClientes GuardarCliente([FromBody] CatalogoClientesRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultListClientes oResult = new entResultListClientes();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnClientes oSolicitudes = new rnClientes())
                {
                    oSolicitudes.Nombre = oEmpleados.Nombre;
                    oSolicitudes.ApellidoPaterno = oEmpleados.ApellidoPaterno;
                    oSolicitudes.ApellidoMaterno = oEmpleados.ApellidoMaterno;
                    oSolicitudes.CorreoElectronico = oEmpleados.CorreoElectronico;
                    oSolicitudes.NumeroTelefono = oEmpleados.NumeroTelefono;
                    oSolicitudes.FechaNacimiento = oEmpleados.FechaNacimiento;
                    oSolicitudes.IdSucursalRegistro = oEmpleados.IdSucursalRegistro;
                    oSolicitudes.GuardarCliente();

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


        [HttpPost]
        [Route("ActualizarCliente")]
        public entResultListClientes ActualizarCliente([FromBody] CatalogoClientesRequest oEmpleados)
        {
            //entInventariosSolicitudes oDatos;
            //entEmpleados eDatosSesion2;
            entResultListClientes oResult = new entResultListClientes();

            //eDatosSesion2 = (new JavaScriptSerializer()).Deserialize<entEmpleados>(sparam);
            //oDatos = (new JavaScriptSerializer()).Deserialize<entInventariosSolicitudes>(sparam);
            oResult.bError = true;
            try
            {
                using (rnClientes oSolicitudes = new rnClientes())
                {
                    oSolicitudes.Nombre = oEmpleados.Nombre;
                    oSolicitudes.ApellidoPaterno = oEmpleados.ApellidoPaterno;
                    oSolicitudes.ApellidoMaterno = oEmpleados.ApellidoMaterno;
                    oSolicitudes.CorreoElectronico = oEmpleados.CorreoElectronico;
                    oSolicitudes.NumeroTelefono = oEmpleados.NumeroTelefono;
                    oSolicitudes.IdSucursalRegistro = oEmpleados.IdSucursalRegistro;
                    oSolicitudes.FechaNacimiento = oEmpleados.FechaNacimiento;
                    oSolicitudes.IdCliente = oEmpleados.IdCliente;
                    oSolicitudes.ActualizarCliente();

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


        [HttpPost]
        [Route("EliminarCliente")]
        public entResultListClientes EliminarCliente([FromBody] CatalogoClientesRequest oEmpleados)
        {
            
            entResultListClientes oResult = new entResultListClientes();

           
            oResult.bError = true;
            try
            {
                using (rnClientes oSolicitudes = new rnClientes())
                {

                    oSolicitudes.IdCliente = oEmpleados.IdCliente;
                    oSolicitudes.EliminarCliente();

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



        //[HttpGet]
        //[Route("GetListClientesCombo")]
        //public entResultListClientes GetListNivelesUsuariosCombo([FromUri] string sparam)
        //{
        //    entClientes eDatosSesion;
        //    entResultListClientes oResult = new entResultListClientes();

        //    eDatosSesion = (new JavaScriptSerializer()).Deserialize<entClientes>(sparam);

        //    oResult.bError = true;
        //    try
        //    {
        //        using (rnClientes oSolicitudes = new rnClientes())
        //        {
        //            oSolicitudes.ListarClientesCombo();

        //            if (!oSolicitudes.objError.bError)
        //            {
        //                oResult.ListClientes = oSolicitudes.ListResult;
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
        //        oResult.Msg = "¡Se genero un error interno al momento de obtener los niveles!";
        //        oResult.Msg = ex.Message;
        //    }
        //    return oResult;
        //}



    }
}





