using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace libProductosSubGrupos
{
    public class entProductosSubGrupos
    {
        public int IdProductoSubGrupo { get; set; }
        public int IdProductoGrupo { get; set; }
        public string ProductoSubGrupo { get; set; }
        public string FechaAlta { get; set; }
        public bool Activo { get; set; }
    }
}
