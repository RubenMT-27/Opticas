// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 03/03/2023 12:00:00 a. m. Version 3.3.2
using System;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Configuration;

namespace AnceSystem.libClientes
{

   public class adClientes : entClientes
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
        /// <summary>
        ///Contructor de la clase
        /// </summary>
        /// <remarks></remarks>
      public adClientes(string sNombreCn = "")
        {
            cn = new SqlConnection(Conexion.Conectar.GenerarConexion(ConfigurationManager.ConnectionStrings[sNombreCn].ConnectionString));
            uspStoreProcedure = "uspClientes";
      }
      //Función que Elimina datos
        /// <summary>
        ///Metodo para eliminar, contiene todos los campos de la base de la tabla
        /// </summary>
        /// <remarks></remarks>
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
                  cmd.Parameters.AddWithValue ("@IdCliente", IdCliente);
                  cmd.Parameters.AddWithValue ("@IdSucursalRegistro", IdSucursalRegistro);
                  cmd.Parameters.AddWithValue ("@Nombre", Nombre);
                  cmd.Parameters.AddWithValue ("@ApellidoPaterno", ApellidoPaterno);
                  cmd.Parameters.AddWithValue ("@ApellidoMaterno", ApellidoMaterno);
                  cmd.Parameters.AddWithValue ("@NumeroTelefono", NumeroTelefono);
                  cmd.Parameters.AddWithValue ("@CorreoElectronico", CorreoElectronico);
                  cmd.Parameters.AddWithValue ("@FechaNacimiento", FechaNacimiento);
                  cmd.Parameters.AddWithValue ("@FechaAlta", FechaAlta);
                  cmd.Parameters.AddWithValue ("@Activo", Activo);
                  //|| TagParametros
                  //|| EndTagParametros
                  cmd.Parameters.AddWithValue ("@sXML",sXML);
                  cmd.Parameters.AddWithValue ("@Bandera",Bandera);

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


      //Actualizar datos
        /// <summary>
        ///Metodo para Actualizar, contiene todos los campos de la base de la tabla
        /// </summary>
        /// <remarks></remarks>
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
                  cmd.Parameters.AddWithValue ("@IdCliente", IdCliente);
                  cmd.Parameters.AddWithValue ("@IdSucursalRegistro", IdSucursalRegistro);
                  cmd.Parameters.AddWithValue ("@Nombre", Nombre);
                  cmd.Parameters.AddWithValue ("@ApellidoPaterno", ApellidoPaterno);
                  cmd.Parameters.AddWithValue ("@ApellidoMaterno", ApellidoMaterno);
                  cmd.Parameters.AddWithValue ("@NumeroTelefono", NumeroTelefono);
                  cmd.Parameters.AddWithValue ("@CorreoElectronico", CorreoElectronico);
                  cmd.Parameters.AddWithValue ("@FechaNacimiento", FechaNacimiento);
                  cmd.Parameters.AddWithValue ("@FechaAlta", FechaAlta);
                  cmd.Parameters.AddWithValue ("@Activo", Activo);
                  //|| TagParametros
                  //|| EndTagParametros
                  cmd.Parameters.AddWithValue ("@sXML",sXML);
                  cmd.Parameters.AddWithValue ("@Bandera",Bandera);

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


      //Rem Sub que Insertar datos
        /// <summary>
        /// Metodo para insertar, contiene todos los campos de la base de la tabla
        /// </summary>
        /// <remarks></remarks>
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
                  cmd.Parameters.AddWithValue ("@IdCliente", IdCliente);
                  cmd.Parameters.AddWithValue ("@IdSucursalRegistro", IdSucursalRegistro);
                  cmd.Parameters.AddWithValue ("@Nombre", Nombre);
                  cmd.Parameters.AddWithValue ("@ApellidoPaterno", ApellidoPaterno);
                  cmd.Parameters.AddWithValue ("@ApellidoMaterno", ApellidoMaterno);
                  cmd.Parameters.AddWithValue ("@NumeroTelefono", NumeroTelefono);
                  cmd.Parameters.AddWithValue ("@CorreoElectronico", CorreoElectronico);
                  cmd.Parameters.AddWithValue ("@FechaNacimiento", FechaNacimiento);
                  cmd.Parameters.AddWithValue ("@FechaAlta", FechaAlta);
                  cmd.Parameters.AddWithValue ("@Activo", Activo);
                  //|| TagParametros
                  //|| EndTagParametros
                  cmd.Parameters.AddWithValue ("@sXML",sXML);
                  cmd.Parameters.AddWithValue ("@Bandera",Bandera);

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


     // Funcion que LlenarDatos datos
        /// <summary>
        ///llena todas las propiedades en base a una consulta de sql o Linq
        /// </summary>
        /// <remarks></remarks>
      protected entClientes LlenarDatos()
      {
         entClientes LlenarDatos = new entClientes();
         DataTable dt = new DataTable("entClientes");

         try
         {
           objError.bError = false;
           cn.Open();
            using (SqlCommand cmd = new SqlCommand())
            {
                  cmd.CommandText = uspStoreProcedure;
                  cmd.CommandType = CommandType.StoredProcedure;
                  cmd.Connection = cn;
                  cmd.Parameters.AddWithValue ("@IdCliente", IdCliente);
                  cmd.Parameters.AddWithValue ("@IdSucursalRegistro", IdSucursalRegistro);
                  cmd.Parameters.AddWithValue ("@Nombre", Nombre);
                  cmd.Parameters.AddWithValue ("@ApellidoPaterno", ApellidoPaterno);
                  cmd.Parameters.AddWithValue ("@ApellidoMaterno", ApellidoMaterno);
                  cmd.Parameters.AddWithValue ("@NumeroTelefono", NumeroTelefono);
                  cmd.Parameters.AddWithValue ("@CorreoElectronico", CorreoElectronico);
                  cmd.Parameters.AddWithValue ("@FechaNacimiento", FechaNacimiento);
                  cmd.Parameters.AddWithValue ("@FechaAlta", FechaAlta);
                  cmd.Parameters.AddWithValue ("@Activo", Activo);
                  //|| TagParametros
                  //|| EndTagParametros
                  cmd.Parameters.AddWithValue ("@sXML",sXML);
                  cmd.Parameters.AddWithValue ("@Bandera",Bandera);

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
                LlenarDatos = javaScriptSerializer.Deserialize<entClientes>(jsonObject);
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


      //Rem Funcion que Lista datos
        /// <summary>
        ///Metodo que regresa un datatable o un query de Linq
        /// </summary>
        /// <remarks></remarks>
      protected DataTable Listar()
      {
         DataTable dt = new DataTable("Clientes");

         try
         {
               objError.bError = false;
               cn.Open();
               using (SqlCommand cmd = new SqlCommand())
               {
                  cmd.CommandText = uspStoreProcedure;
                  cmd.CommandType = CommandType.StoredProcedure;
                  cmd.Connection = cn;
                  cmd.Parameters.AddWithValue ("@IdCliente", IdCliente);
                  cmd.Parameters.AddWithValue ("@IdSucursalRegistro", IdSucursalRegistro);
                  cmd.Parameters.AddWithValue ("@Nombre", Nombre);
                  cmd.Parameters.AddWithValue ("@ApellidoPaterno", ApellidoPaterno);
                  cmd.Parameters.AddWithValue ("@ApellidoMaterno", ApellidoMaterno);
                  cmd.Parameters.AddWithValue ("@NumeroTelefono", NumeroTelefono);
                  cmd.Parameters.AddWithValue ("@CorreoElectronico", CorreoElectronico);
                  cmd.Parameters.AddWithValue ("@FechaNacimiento", FechaNacimiento);
                  cmd.Parameters.AddWithValue ("@FechaAlta", FechaAlta);
                  cmd.Parameters.AddWithValue ("@Activo", Activo);
                  //|| TagParametros
                  //|| EndTagParametros
                  cmd.Parameters.AddWithValue ("@sXML",sXML);
                  cmd.Parameters.AddWithValue ("@Bandera",Bandera);
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
                        Propiedades.Add(cols.ColumnName, !DBNull.Value.Equals( dr[cols.ColumnName])? dr[cols.ColumnName] : "");
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


#endregion

#region IDisposable Support
        private bool disposedValue; // To detect redundant calls
// IDisposable
        protected virtual void Dispose(bool disposing)
        {
                if (!disposedValue)
                {
                    if (disposing)
                    {
                    }
                }
            disposedValue = true;
        }
        
        //This code added by Visual Basic to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code.  Put cleanup code in Dispose(disposing As Boolean) above.
            Dispose(true);
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
