// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 02/03/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AnceSystem.libNivelesUsuarios
{

   public class rnNivelesUsuarios : adNivelesUsuarios
{
      public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnNivelesUsuarios() : base("cnOpticas")
       {
       }

        public void GuardarNivelUsuario()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarNivelUsuario()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarNivelUsuario()
        {
            Bandera = "u2";
            Actualizar();
        }

        public void ActualizarNivelEmpleado()
        {
            Bandera = "u3";
            Actualizar();
        }

        public void ListarNivelUsuario()
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

        public void ListarNiveles()
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

        

             public void ListarNivelEmpleado()
        {
            Bandera = "s3";
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
