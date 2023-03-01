using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Opticas.libEmpleadosUsuarios
{
    public class rnEmpleadosUsuarios : adEmpleadosUsuarios
    {
        public DataTable dt { get; set; }
        public JArray ListResult { get; set; }
        public bool bUsuarioValido { get; set; }
        public int NivelUsuario { get; set; }

        public rnEmpleadosUsuarios() : base("cnOpticas")
        {

        }

        public bool IniciarSesion()
        {
            Bandera = "s1";
            dt = Listar();

            if (dt.Rows.Count > 0)
            {
                bUsuarioValido = true;
                NivelUsuario = (int)dt.Rows[0]["IdNivelUsuario"];
                return true;
            }
            else
            {
                bUsuarioValido = false;
                return false;
            }
        }

        public void ListarDatosEmpleado()
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
