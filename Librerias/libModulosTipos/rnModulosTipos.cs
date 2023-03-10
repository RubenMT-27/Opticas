using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opticas.libModulosTipos
{
    public class rnModulosTipos : adModulosTipos
    {
        public DataTable dt { get; set; }
        public JArray ListResult { get; set; }
        public bool bUsuarioValido { get; set; }

        public rnModulosTipos() : base("cnOpticas")
        {

        }

        public void ListarModulosTipos()
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
