using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace libProductosSubTipos
{
    public class entProductosSubTipos
    {
        public int IdProductoSubTipo { get; set; }
        public int IdProductoTipo { get; set; }
        public string ProductoSubTipo { get; set; }
        public string FechaAlta { get; set; }
        public bool Activo { get; set; }
    }
}
