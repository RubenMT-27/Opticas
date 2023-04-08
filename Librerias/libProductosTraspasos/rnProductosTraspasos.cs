// Clase en C Sharp creada automaticamente by ..:: ANCE A.C.  ::.. .Clase creada el: 17/03/2023 12:00:00 a. m. Version 3.3.2
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;

namespace AnceSystem.libProductosTraspasos
{

    public class rnProductosTraspasos : adProductosTraspasos
{
      public DataTable dt { get; set; }

        public JArray ListResult { get; set; }

        public rnProductosTraspasos() : base("cnOpticas")
       {
       }

      public void GuardarProductosTraspasos()
      { 
         Bandera = "i1";
         Insertar();
       }




        public void EnviarTraspaso()
        {
            Bandera = "u1";
            Actualizar();
        }
        

             public void CancelarTraspaso()
        {
            Bandera = "u2";
            Actualizar();
        }
        public void AprobarTraspasoNuevo()
        {
            Bandera = "u3";
            Actualizar();
        }

        public void AprobarTraspasoActualizar()
        {
            Bandera = "u4";
            Actualizar();
        }

        public void RechazarTraspaso()
        {
            Bandera = "u5";
            Actualizar();
        }


        public void ListarProductosSalidasGrid()
      { 
         Bandera = "s1";
         dt = Listar();

            if (!objError.bError)
            {
                string jsonList;
                jsonList = JsonConvert.SerializeObject(dt);
                ListResult = JArray.Parse(jsonList);
            }
        }

        


              public void ListarProductosEntradasGrid()
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

        public void ListarProductosSeguimientoGrid()
        {
            Bandera = "s3";
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
