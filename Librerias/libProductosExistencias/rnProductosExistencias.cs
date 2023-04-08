// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 16/03/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;


namespace AnceSystem.libProductosExistencias
{

   public class rnProductosExistencias : adProductosExistencias
{
      public DataTable dt { get; set; }

        public bool bCantidades { get; set; }
        public bool bExistencia { get; set; }


        public rnProductosExistencias() : base("cnOpticas")
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

      public void ValidarCantidades()
      { 
         Bandera = "s1";
         dt = Listar();
          
        }

        public void ValidarExistenciaProducto()
        {
            Bandera = "s2";
            dt = Listar();

        }

        

    }


}
