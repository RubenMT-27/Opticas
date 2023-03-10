// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 09/03/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;

namespace AnceSystem.libClientesGraduaciones
{

   public class rnClientesGraduaciones : adClientesGraduaciones
{
      public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnClientesGraduaciones() : base("cnOpticas")
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

      public void ListarDatos()
      { 
         Bandera = "";
         dt = Listar();
       }

   }


}
