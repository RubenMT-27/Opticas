using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace libProductosSubGrupos
{
    public class rnProductosSubGrupos : adProductosSubGrupos
    {
        public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnProductosSubGrupos() : base("cnOpticas")
        {
        }

        public void ListarProductosSubGruposGrid()
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

        public void ListarProductosSubGruposCombo()
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

        public void GuardarProductosSubGruposGrid()
        {
            Bandera = "i1";
            Insertar();
        }

        public void ActualizarProductosSubGruposGrid()
        {
            Bandera = "u1";
            Actualizar();
        }

        public void EliminarProductosSubGruposGrid()
        {
            Bandera = "u2";
            Actualizar();
        }
    }
}
