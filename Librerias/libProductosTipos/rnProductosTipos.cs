using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace libProductosTipos
{
    public class rnProductosTipos : adProductosTipos
    {
        public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnProductosTipos() : base("cnOpticas")
        {
        }

        public void ListarProductosTiposGrid()
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

        public void ListarProductosTiposCombo()
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

        public void GuardarProductosTiposGrid()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarProductosTiposGrid()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarProductosTiposGrid()
        {
            Bandera = "u2";
            Actualizar();
        }
    }
}
