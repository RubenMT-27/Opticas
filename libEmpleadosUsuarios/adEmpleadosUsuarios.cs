using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace Opticas.libEmpleadosUsuarios
{
    public class adEmpleadosUsuarios : entEmpleadosUsuarios
        , IDisposable
    {
        #region "Propiedades de la clase"
        protected string Bandera { get; set; }
        public string sXML { get; set; }
        public PropertyCollection Propiedades { get; set; }
        public Errores objError { get; set; } = new Errores() { bError = false, uException = null };
       
        private SqlConnection cn;        
        protected string uspStoreProcedure { get; set; }
        #endregion

        #region "Metodos de la Clase"
        public adEmpleadosUsuarios(string sNombreCn = "")
        {
            cn = new SqlConnection(Conexion.Conectar.GenerarConexion(sNombreCn));
            uspStoreProcedure = "uspEmpleadosUsuarios";
        }

        protected void Insertar()
        {
            try
            {
                objError.bError = false;
                cn.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = uspStoreProcedure;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = cn;
                    
                    cmd.Parameters.AddWithValue("@IdEmpleado", IdEmpleado);
                    cmd.Parameters.AddWithValue("@EmpleadoUsuario", EmpleadoUsuario);
                    cmd.Parameters.AddWithValue("@Contraseña", Contraseña);
                    cmd.Parameters.AddWithValue("@FechaAlta", FechaAlta);
                    cmd.Parameters.AddWithValue("@Activo", Activo);

                    cmd.Parameters.AddWithValue("@sXML", sXML);
                    cmd.Parameters.AddWithValue("@Bandera", Bandera);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                objError.bError = true;
                objError.uException = ex;
            }
            finally
            {
                cn.Close();
            }
        }

        protected void Actualizar()
        {
            try
            {
                objError.bError = false;
                cn.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = uspStoreProcedure;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = cn;
                    
                    cmd.Parameters.AddWithValue("@IdEmpleado", IdEmpleado);
                    cmd.Parameters.AddWithValue("@EmpleadoUsuario", EmpleadoUsuario);
                    cmd.Parameters.AddWithValue("@Contraseña", Contraseña);
                    cmd.Parameters.AddWithValue("@FechaAlta", FechaAlta);
                    cmd.Parameters.AddWithValue("@Activo", Activo);

                    cmd.Parameters.AddWithValue("@sXML", sXML);
                    cmd.Parameters.AddWithValue("@Bandera", Bandera);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                objError.bError = true;
                objError.uException = ex;
            }
            finally
            {
                cn.Close();
            }
        }

        protected void Eliminar()
        {
            try
            {
                objError.bError = false;
                cn.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = uspStoreProcedure;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = cn;
                    
                    cmd.Parameters.AddWithValue("@IdEmpleado", IdEmpleado);
                    cmd.Parameters.AddWithValue("@EmpleadoUsuario", EmpleadoUsuario);
                    cmd.Parameters.AddWithValue("@Contraseña", Contraseña);
                    cmd.Parameters.AddWithValue("@FechaAlta", FechaAlta);
                    cmd.Parameters.AddWithValue("@Activo", Activo);

                    cmd.Parameters.AddWithValue("@sXML", sXML);
                    cmd.Parameters.AddWithValue("@Bandera", Bandera);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                objError.bError = true;
                objError.uException = ex;
            }
            finally
            {
                cn.Close();
            }
        }

        protected DataTable Listar()
        {
            DataTable dt = new DataTable();

            try
            {
                objError.bError = false;
                cn.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = uspStoreProcedure;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = cn;
                    
                    cmd.Parameters.AddWithValue("@IdEmpleado", IdEmpleado);
                    cmd.Parameters.AddWithValue("@EmpleadoUsuario", EmpleadoUsuario);
                    cmd.Parameters.AddWithValue("@Contraseña", Contraseña);
                    cmd.Parameters.AddWithValue("@FechaAlta", FechaAlta);
                    cmd.Parameters.AddWithValue("@Activo", Activo);

                    cmd.Parameters.AddWithValue("@sXML", sXML);
                    cmd.Parameters.AddWithValue("@Bandera", Bandera);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }

                    if (dt.Rows.Count >= 1)
                    {
                        Propiedades = new PropertyCollection();
                        DataRow dr = dt.Rows[0];
                        foreach (DataColumn cols in dt.Columns)
                        {
                            Propiedades.Add(cols.ColumnName, !DBNull.Value.Equals(dr[cols.ColumnName]) ? dr[cols.ColumnName] : "");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                objError.bError = true;
                objError.uException = ex;
            }
            finally
            {
                cn.Close();
            }
            return dt;
        }

        protected entEmpleadosUsuarios LlenarDatos()
        {
            entEmpleadosUsuarios LlenarDatos = new entEmpleadosUsuarios();
            DataTable dt = new DataTable("entEmpleadosUsuarios");

            try
            {
                objError.bError = false;
                cn.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.CommandText = uspStoreProcedure;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = cn;
                    
                    cmd.Parameters.AddWithValue("@IdEmpleado", IdEmpleado);
                    cmd.Parameters.AddWithValue("@EmpleadoUsuario", EmpleadoUsuario);
                    cmd.Parameters.AddWithValue("@Contraseña", Contraseña);
                    cmd.Parameters.AddWithValue("@FechaAlta", FechaAlta);
                    cmd.Parameters.AddWithValue("@Activo", Activo);

                    cmd.Parameters.AddWithValue("@sXML", sXML);
                    cmd.Parameters.AddWithValue("@Bandera", Bandera);


                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                }

                if (dt.Rows.Count > 0)
                {
                    JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                    string jsonObject;
                    jsonObject = JsonConvert.SerializeObject(dt);
                    LlenarDatos = javaScriptSerializer.Deserialize<entEmpleadosUsuarios>(jsonObject);
                }
                else
                {
                    LlenarDatos = null;
                }
            }
            catch (Exception ex)
            {
                objError.bError = true;
                objError.uException = ex;
            }
            finally
            {
                cn.Close();
            }
            return LlenarDatos;
        }
        #endregion

        #region "IDisposable Support"
        private bool disposedValue;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: eliminar el estado administrado (objetos administrados)
                }

                // TODO: liberar los recursos no administrados (objetos no administrados) y reemplazar el finalizador
                // TODO: establecer los campos grandes como NULL
                disposedValue = true;
            }
        }

        // // TODO: reemplazar el finalizador solo si "Dispose(bool disposing)" tiene código para liberar los recursos no administrados
        // ~adEmpleadosUsuarios()
        // {
        //     // No cambie este código. Coloque el código de limpieza en el método "Dispose(bool disposing)".
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            // No cambie este código. Coloque el código de limpieza en el método "Dispose(bool disposing)".
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        #endregion

    }

    public class Errores
    {
        public bool bError { get; set; }
        public Exception uException { get; set; }
        public string sMensaje { get; set; }
    }
}
