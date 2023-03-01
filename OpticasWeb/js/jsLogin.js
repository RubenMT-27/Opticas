$(document).ready(function () {

    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $(".toggle-password").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    $("#btnIniciarSesion").click(function () {
        IniciarSesion();
    });
});

function IniciarSesion() {
    //Cambiar este tipo de validacion por uno optimo
    if ($('#txtUsuario').val() != "" || $('#txtContraseña').val() != "") {

        $('#btnIniciarSesion').html('Iniciando Sesion...<i class="fa fa-spinner fa-spin fa-fw"></i>');

        var oInicioSesion = new libInicioSesion();

        oInicioSesion.Usuario = $('#txtUsuario').val();
        oInicioSesion.Contraseña = $('#txtContraseña').val();
        oInicioSesion.Authenticate();
    }
}

function BloquearPantalla() {
    var Pantalla = $(document.body);
    kendo.ui.progress(Pantalla, true);
}

function DesbloquearPantalla() {
    var Pantalla = $(document.body);
    kendo.ui.progress(Pantalla, false);
}

function libInicioSesion() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var UrlWebLogin = "http://localhost:44543/api/Login.aspx";
    var Usuario;
    var Contraseña;

    this.Authenticate = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "login/authenticate",
            data: sparam,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {
                BloquearPantalla()
            },
            complete: function () {
                DesbloquearPantalla()
            },
            success: function (result) {
                if (!result.bError) {
                    if (result.bUsuarioValido) {
                        if (sessionStorage.getItem('token') != null) sessionStorage.removeItem('token');
                        if (sessionStorage.getItem('urlPagina') != null) sessionStorage.removeItem('urlPagina');
                        if (sessionStorage.getItem('NivelUsuario') != null) sessionStorage.removeItem('NivelUsuario');
                        if (sessionStorage.getItem('Usuario') != null) sessionStorage.removeItem('Usuario');

                        sessionStorage.setItem('token', result.Token);
                        sessionStorage.setItem('urlPagina', UrlWebLogin);
                        sessionStorage.setItem('NivelUsuario', result.IdNivelUsuario);
                        sessionStorage.setItem('Usuario', $('#txtUsuario').val());


                        //Obtener Datos de Sesion y Accesos
                        window.location.href = result.Pagina;

                    } else {
                        $('#btnIniciarSesion').html("Iniciar Sesión");
                        CrearAlerta(result.Msg, "¡Acceso No Autorizado!", "info");
                    }
                } else {
                    $('#btnIniciarSesion').html("Iniciar Sesión");
                    CrearAlerta("¡Se genero un error interno al iniciar sesión!", "¡Error!", "error");
                }
            },
            error: function () {
                $('#btnIniciarSesion').html("Iniciar Sesión");
                CrearAlerta("¡Se genero un error interno al iniciar sesión!", "¡Error!", "error");
            }
        });
    }
}