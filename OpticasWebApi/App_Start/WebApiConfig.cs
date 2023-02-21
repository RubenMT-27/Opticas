﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace OpticasWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de Web API
          

            //    config.EnableCors();
            //var enableCorsAttribute = new EnableCorsAttribute("*",
            //                                   "Origin, Content-Type, Accept",
            //                                   "GET, PUT, POST, DELETE, OPTIONS");
            //config.EnableCors(enableCorsAttribute);
            // Rutas de Web API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
