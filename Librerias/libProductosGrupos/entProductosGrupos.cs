using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace libProductosGrupos
{
    public class entProductosGrupos
    {
        public int IdProductoGrupo { get; set; }
        public string ProductoGrupo { get; set; }
        public string Descripcion { get; set; }
        public string FechaAlta { get; set; }
        public bool Activo { get; set; }
    }
}
