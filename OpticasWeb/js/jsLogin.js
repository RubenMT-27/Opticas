(function ($) {

    "use strict";

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
})(jQuery);

function IniciarSesion() {
    //Cambiar este tipo de validacion por uno optimo
    if ($('#txtUsuario').val() != "" || $('#txtContraseña').val() != "") {
        var oInicioSesion = new libInicioSesion();

        oInicioSesion.Usuario = $('#txtUsuario').val();
        oInicioSesion.Contraseña = $('#txtContraseña').val();
        oInicioSesion.IniciarSesion();
    }
    
    //var txt = $('#txtUsuario').val();
}

function libInicioSesion() {
    var UrlWeb = "http://localhost:44543/api/"
    var Usuario;
    var Contraseña;

    this.IniciarSesion = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWeb + "InicioSesion/IniciarSesion",
            data: { 'sparam': sparam },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function () { },
            error: function () { }
        });
    }
}