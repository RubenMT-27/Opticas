using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace libProductosSubTipos
{
    public class rnProductosSubTipos : adProductosSubTipos
    {
        public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnProductosSubTipos() : base("cnOpticas")
        {
        }

        public void ListarProductosSubTiposGrid()
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

        public void GuardarProductosSubTiposGrid()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarProductosSubTiposGrid()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarProductosSubTiposGrid()
        {
            Bandera = "u2";
            Actualizar();
        }
    }
}
