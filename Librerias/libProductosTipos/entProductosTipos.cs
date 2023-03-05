using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace libProductosTipos
{
    public class entProductosTipos
    {
        public int IdProductoTipo { get; set; }
        public string ProductoTipo { get; set; }
        public string Descripcion { get; set; }
        public string FechaAlta { get; set; }
        public bool Activo { get; set; }
    }
}
