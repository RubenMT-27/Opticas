using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Odbc;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace libProductos
{
    public class rnProductos : adProductos
    {
        public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnProductos() : base("cnOpticas")
        {
        }

        public void ListarProductosGrid()
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

        public void GuardarProductosGrid()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarProductosGrid()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarProductosGrid()
        {
            Bandera = "u2";
            Actualizar();
        }
    }
}
