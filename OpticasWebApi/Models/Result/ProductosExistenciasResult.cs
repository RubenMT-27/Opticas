﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OpticasWebApi.Models.Result
{
    public class ProductosExistenciasResult
    {

        public bool bExistencia { get; set; }
        public bool bCantidades { get; set; }
        public bool bError { get; set; }
        public string Msg { get; set; }
        public dynamic ListProductos { get; set; }
    }
}