// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 24/02/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace AnceSystem.libPuestos
{

    public class rnPuestos : adPuestos
    {
        public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnPuestos() : base("cnOpticas")
        {
        }


        public void ListarPuestos()
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

        public void ListarPuestosGrid()
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

        public void GuardarPuestoGrid()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarPuestoGrid()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarPuestoGrid()
        {
            Bandera = "u2";
            Actualizar();
        }
    }


}
