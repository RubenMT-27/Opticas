// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 21/02/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AnceSystem.libEmpleados
{

   public class rnEmpleados : adEmpleados
{
      public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnEmpleados() : base("cnOpticas")
       {
       }

      public void GuardarSolicitud()
      { 
         Bandera = "i1";
         Insertar();
       }

      public void ListarEmpleados()
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
