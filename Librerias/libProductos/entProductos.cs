using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace libProductos
{
    public class entProductos
    {
        public int IdProducto { get; set; }
        public int IdProductoTipo { get; set; }
        public int IdProductoSubTipo { get; set; }
        public int IdProductoGrupo { get; set; }
        public int IdProductoSubGrupo { get; set; }
        public string Producto { get; set; }
        public string Descripcion { get; set; }
        public string Marca { get; set; }
        public string FechaAlta { get; set; }
        public bool Activo { get; set; }
    }
}
