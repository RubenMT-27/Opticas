// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 03/03/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace AnceSystem.libModulosNiveles
{

   public class rnModulosNiveles : adModulosNiveles
{
      public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnModulosNiveles() : base("cnOpticas")
       {
       }

      public void AgregarRelacion()
      { 
         Bandera = "i1";
         Insertar();
       }

      public void EliminarEmpleado()
      { 
         Bandera = "u1";
         Actualizar();
       }

      public void EliminarDatos()
      { 
         Bandera = "";
         Eliminar();
       }

      public void ListarModulosNiveles()
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

        

             public void ListarNivelModuloGrid()
        {
            Bandera = "s2";
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
