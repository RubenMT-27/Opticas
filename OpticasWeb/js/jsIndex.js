$(document).ready(function () {
    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    //Cargar Tipos de Modulos
    var oModulosTipos = new libModulosTipos();
    oModulosTipos.GetListModulosTipos();

    $(document).on('click', '.CerrarSesion', function () {
        CerrarSesion();
    });

});

async function CerrarSesion() {
    var bCerrarSesion = await CrearAlertaConfirm("¿Esta Seguro de Cerrar Sesión?", "Cerrar Sesión", 'question');

    if (bCerrarSesion == true) {
        sessionStorage.clear();
        window.location.href = "login.aspx";
    }
}

function libModulosTipos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');

    this.GetListModulosTipos = function (fnResult) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ModulosTipos/GetListModulosTipos",
            //data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    BindHtml(result.ListModulosTipos, "#TiposModulosFill", "#tmplTiposModulos")

                    var oModulos = new libModulos();
                    oModulos.IdNivelUsuario = sessionStorage.getItem('NivelUsuario');
                    oModulos.GetListModulos();

                } else {

                }
            }
        });
    }
}

function libModulos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdNivelUsuario;

    this.GetListModulos = function (fnResult) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Modulos/GetListModulos",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    /*BindHtml(result.ListModulos, "#SubMenuFill", "#tmplSubMenu")*/
                    result.ListModulosSecciones.forEach(function (item) {

                        if (item.bSubSeccion == 1) {
                            var Seccion = '<li><a class="dropdown-item" style="text-align: center;">' + item.Nombre + ' &raquo; </a><ul class="dropdown-menu dropdown-submenu" id="SubSeccionesMenuFill' + item.IdModuloSubTipo + '"></ul></li>  '
                            $('#SubMenuFill' + item.IdModuloTipo).append(Seccion);
                        } else if (item.bSubSeccion == 0) {
                            var Seccion = '<li><a class="dropdown-item" style="text-align: center;" href="' + item.Pagina + '" IdModulo="' + item.IdModulo + '" title="' + item.Descripcion + '">' + item.Nombre + '<span class="' + item.Icono + '" style="padding-left: 20px;"></span></a></li>'
                            $('#SubMenuFill' + item.IdModuloTipo).append(Seccion);
                        }
                    });

                    result.ListModulos.forEach(function (item) {
                        var liSeccionMenu = '<li><a class="dropdown-item" style="text-align: center;" href="' + item.Pagina + '" IdModulo="' + item.IdModulo + '" title="' + item.Descripcion + '">' + item.Nombre + '<span class="' + item.Icono + '" style="padding-left: 20px;"></span></a></li>'
                        $('#SubSeccionesMenuFill' + item.IdModuloSubTipo).append(liSeccionMenu);
                    });

                    var oEmpleadosUsuarios = new libEmpleadosUsuarios();
                    oEmpleadosUsuarios.EmpleadoUsuario = sessionStorage.getItem('Usuario');
                    oEmpleadosUsuarios.GetListDatosUsuario();

                } else {

                }
            }
        });
    }
}

function libEmpleadosUsuarios() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var EmpleadoUsuario;

    this.GetListDatosUsuario = function (fnReult) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "EmpleadosUsuarios/GetListDatosUsuario",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    BindHtml(result.ListEmpleadosUsuarios, "#DatosUsuarioFill", "#tmplDatosUsuarios")
                } else {

                }
            }
        });
    }
}