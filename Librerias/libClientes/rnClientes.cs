// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 03/03/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace AnceSystem.libClientes
{

   public class rnClientes : adClientes
{
      public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnClientes() : base("cnOpticas")
       {
       }

        public void GuardarCliente()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarCliente()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarCliente()
        {
            Bandera = "u2";
            Actualizar();
        }

        public void ListarClientes()
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
