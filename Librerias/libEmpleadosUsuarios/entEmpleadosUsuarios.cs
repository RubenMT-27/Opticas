
using System;

namespace Opticas.libEmpleadosUsuarios
{
    public class entEmpleadosUsuarios
    {
        public int IdEmpleado { get; set; }
        public string EmpleadoUsuario { get; set; }
        public byte Contraseña { get; set; }
        public string ContraseñaText { get; set; }
        public int IdNivelUsuario { get; set; }
        public string FechaAlta { get; set; }
        public bool Activo { get; set; }
    }
}
