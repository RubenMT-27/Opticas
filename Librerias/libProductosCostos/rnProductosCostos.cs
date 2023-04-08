// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 16/03/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;


namespace AnceSystem.libProductosCostos
{

   public class rnProductosCostos : adProductosCostos
{
      public DataTable dt { get; set; }



       public rnProductosCostos() : base("cnOpticas")
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
