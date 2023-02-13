function ObtenerUrlWeb() {
    var Url = '@System.Configuration.ConfigurationManager.AppSettings["UrlWeb"]';

    return Url;
}