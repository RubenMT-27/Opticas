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

        public rnEmpleadosUsuarios() : base("cnOpticas")
        {

        }

        public void IniciarSesion()
        {
            Bandera = "s1";
            dt = Listar();
        }
    }
}
