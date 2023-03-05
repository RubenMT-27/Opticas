using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace libProductosGrupos
{
    public class rnProductosGrupos : adProductosGrupos
    {
        public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnProductosGrupos() : base("cnOpticas")
        {
        }

        public void ListarProductosGruposGrid()
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

        public void ListarProductosGruposCombo()
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

        public void GuardarProductosGruposGrid()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarProductosGruposGrid()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarProductosGruposGrid()
        {
            Bandera = "u2";
            Actualizar();
        }
    }
}
