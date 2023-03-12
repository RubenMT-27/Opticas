using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opticas.libModulos
{
    public class rnModulos : adModulos
    {
        public DataTable dt { get; set; }
        public JArray ListResult { get; set; }
        public bool bUsuarioValido { get; set; }

        public rnModulos() : base("cnOpticas")
        {

        }

        public void ListarModulosSecciones()
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

        public void ListarModulos()
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

    }
}
