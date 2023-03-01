// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 24/02/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace AnceSystem.libSucursales
{

   public class rnSucursales : adSucursales
{
      public DataTable dt { get; set; }

        public JArray ListResult { get; set; }


        public rnSucursales() : base("cnOpticas")
       {
       }

      public void InsertarDatos()
      { 
         Bandera = "";
         Insertar();
       }

      public void ActualizarDatos()
      { 
         Bandera = "";
         Actualizar();
       }

      public void EliminarDatos()
      { 
         Bandera = "";
         Eliminar();
       }

      public void ListarSucursales()
      { 
         Bandera = "s1";
         dt = Listar();

            if (!objError.bError)
            {
                string jsonList;
                jsonList = JsonConvert.SerializeObject(dt);
                ListResult = JArray.Parse(jsonList);
            }
        }

   }


}
