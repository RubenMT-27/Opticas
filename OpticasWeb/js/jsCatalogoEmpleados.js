$(document).ready(function () {
    CrearGrid();
    CrearDataGrid();
    CrearControles();
});

//Funciones Pantalla Principal
function CrearGrid() {
    var grdMisMuestras = $("#grdMisMuestras");
    grdMisMuestras.kendoGrid({
        scrollable: true,
        sortable: true,
        pageable: true,
        toolbar: ["excel", {
            template: '<a id="newItemButton"">Nuevo</a><span class="k-textbox k-grid-search k-display-flex form-right"><input autocomplete="off" placeholder="Buscar..." title="Buscar..." class="k-input form-control form-right"><span class="k-input-icon justify-content-end"><span class="k-icon k-i-search justify-content-end"></span></span></span>'
        }],


        excel: {
            fileName: "Catálogo_De_Empleados.xlsx",
            allPages: true,
            filterable: true
        },
        resizable: true,
        height: 400,
        //dataBound: function (e) {
        //    $("[data-toggle='tooltip']").tooltip();
        //},
        filterable: true,
        columns: [
            {
                field: "IdEmpleado",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Número de Empleado"
            },
            {
                field: "Nombre",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "Nombre(s)"

            },
            {
                field: "ApellidoPaterno",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 230,
                title: "Apellido Paterno"

            },
            {
                field: "ApellidoMaterno",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 230,
                title: "Apellido Materno"

            },
            {
                field: "NumeroTelefono",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Número de Teléfono"

            },
            {
                field: "CorreoElectronico",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 300,
                title: "Correo Electrónico"

            },
            {
                field: "Sucursal",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "Sucursal"

            },
            {
                field: "Puesto",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "Puesto"

            },
            {
                field: "Genero",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "Género"
            },
            {
                field: "FechaNacimiento",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Fecha de Nacimiento"

            },
            {
                field: "FechaIngreso",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Fecha de Ingreso"

            }
        ],





    }).after(() => {
        $('#newItemButton').kendoButton({
            icon: 'k-icon k-i-plus',
            click: onNewClick
        });
    });


    function myOpenEventHandler(e) {
        var confirm = window.confirm('Do you want to edit this record?');
        if (!confirm) {
            e.preventDefault()
        }
    }

}

function CrearDataGrid() {
    var grdMisMuestras = $("#grdMisMuestras");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {



                var oNotiApp = new libMisMuestras();
                //var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
                oNotiApp.IdEmpleado = 00004;
                oNotiApp.GetListMisMuestras(function (result) {
                    options.success(result.ListMuestras);
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de las Muestras!', "Error", "Error");
        },
        pageSize: 100,
        schema: {
            model: {
                fields: {
                    IdEmpleado: { type: "string" },
                    Nombre: { type: "string" },
                    ApellidoPaterno: { type: "string" },
                    ApellidoMaterno: { type: "string" },
                    NumeroTelefono: { type: "number" },
                    CorreoElectronico: { type: "string" },
                    Sucursal: { type: "string" },
                    Puesto: { type: "string" },
                    Genero: { type: "string" },
                    FechaNacimiento: { type: "string" },
                    FechaIngreso: { type: "string" }
                }
            }
        },
        dataSource: dataSource,
    });

    grdMisMuestras.data("kendoGrid").setDataSource(dataSource);
}

//Funciones pantalla nuevo registro
function CrearControles() {

    var kdNombre = $("#kdTxtNombre");
    var kdApellidoPaterno = $("#kdTxtApellidoPaterno");
    var kdApellidoMaterno = $("#kdTxtApellidoMaterno");
    var kdCorreoElectronico = $("#kdTxtCorreoElectronico");
    var kdNumeroTelefono = $("#kdTxtNumeroTelfono");
    var kdComboSucursal = $("#kdDdlSucursal");
    var kdComboPuesto = $("#kdDdlPuesto");
    var kdComboGenero = $("#kdDdlGenero");
    var kdDateNacimiento = $("#kdDpFechaNacimiento");
    var kdDateIngreso = $("#kdDpFechaIngreso");
    var kdDateBaja = $("#kdDpFechaBaja");
    var btnGuardar = $("#kdBtnGuardar");
    var kdWindow = $("#kdWindow");
    //Creación de Window para nuevo reistro
    kdWindow.kendoWindow({
        visible: false,
        modal: true,
        resizable: false,
        width: "850px",
        height: "550px",
        actions: ["Maximize", "Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Registrar Nuevo Empleado"
    }).data("kendoWindow").center();



    //Creacion de txtNombre
    kdNombre.kendoTextBox({
        label: {
            content: "Nombre(s)",
            floating: true
        }
    });

    //Creacion de txtApellidoPaterno
    kdApellidoPaterno.kendoTextBox({
        label: {
            content: "Apellido Paterno",
            floating: true
        }
    });

    //Creacion de txtApellidoMaterno
    kdApellidoMaterno.kendoTextBox({
        label: {
            content: "Apellido Materno",
            floating: true
        }
    });

    //Creacion de txtCorreoElectronico
    kdCorreoElectronico.kendoTextBox({
        label: {
            content: "Correo Electronico",
            floating: true
        }
    });

    //Creacion de txtNumeroTelefono
    kdNumeroTelefono.kendoTextBox({
        label: {
            content: "Número de Teléfono",
            floating: true
        }
    });

    //Crear Combo de Sucursal (falata crear datasource)
    kdComboSucursal.kendoComboBox({
        dataSource: dataSourceKdComboSucursal,
        dataTextField: "Sucursal",
        dataValueField: "IdSucursal",
        filter: "contains",
        suggest: true,
        label: {
            content: "Sucursal",
            floating: true
        },
    });

    //Crear Combo de Puesto (falata crear datasource)
    kdComboPuesto.kendoComboBox({
        dataSource: dataSourceKdComboPuestos,
        dataTextField: "Puesto",
        dataValueField: "IdPuesto",
        index: -1,
        filter: "contains",
        suggest: true,
        label: {
            content: "Puesto",
            floating: true
        },
    });

    //Crear Combo de Genero (falata crear datasource)
    kdComboGenero.kendoComboBox({
        dataSource: [
            { IdGenero: 1, Genero: "Masculino" },
            { IdGenero: 2, Genero: "Femenino" }
        ],
        dataTextField: "Genero",
        dataValueField: "IdGenero",
        index: -1,
        filter: "contains",
        suggest: true,
        label: {
            content: "Género",
            floating: true
        },
    });

    //Crear DatePicker Nacimiento
    kdDateNacimiento.kendoDatePicker({
        dateInput: true,
        format: "dd/MM/yyyy",
        label: {
            content: "Fecha de Nacimiento",
            floating: true
        }
    });

    //Crear DatePicker Ingreso
    kdDateIngreso.kendoDatePicker({
        dateInput: true,
        format: "dd/MM/yyyy",
        label: {
            content: "Fecha de Ingreso",
            floating: true
        }
    });

    //Crear DatePicker Baja
    kdDateBaja.kendoDatePicker({
        dateInput: true,
        enable: false,
        format: "dd/MM/yyyy",
        label: {
            content: "Fecha de Baja",
            floating: true
        }
    });

    //Crear boton guardar
    btnGuardar.kendoButton({
        icon: "k-icon k-i-save",
        themeColor: "primary",
        click: ValidarControlesGuardar
    });

}

function onNewClick() {
    $("#kdWindow").data("kendoWindow").open();





}

function ValidarControlesGuardar() {
    //var cont="0";
    //var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    //var nombre,apellidop,apellidom;
    //nombre = $("#kdTxtNombre").data("kendoTextBox").value();
    //ApellidoPaterno = $("#kdTxtNombre").data("kendoTextBox").value();
    //apellido = $("#kdTxtNombre").data("kendoTextBox").value();
    //nombre = $("#kdTxtNombre").data("kendoTextBox").value();
    //if (nombre=="") {
    //    popupNotification.show(kendo.toString("Ingresar Nombre del Empleado", "error"));
    //} else {
    //    cont="1"
    //}

    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        GuardarEmpleado();

    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }



}

function GuardarEmpleado() {
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libCatalogoEmpleados();

    oEmpleados.Nombre = $("#kdTxtNombre").data("kendoTextBox").value();
    oEmpleados.ApellidoPaterno = $("#kdTxtApellidoPaterno").data("kendoTextBox").value();
    oEmpleados.ApellidoMaterno = $("#kdTxtApellidoMaterno").data("kendoTextBox").value();
    oEmpleados.CorreoElectronico = $("#kdTxtCorreoElectronico").data("kendoTextBox").value();
    oEmpleados.NumeroTelefono = $("#kdTxtNumeroTelfono").data("kendoTextBox").value();
    oEmpleados.IdSucursal = $("#kdDdlSucursal").data("kendoComboBox").value();
    oEmpleados.IdPuesto = $("#kdDdlPuesto").data("kendoComboBox").value();
    oEmpleados.Genero = $("#kdDdlGenero").data("kendoComboBox").text();
    oEmpleados.FechaNacimiento = kendo.toString($("#kdDpFechaNacimiento").data("kendoDatePicker").value(), 'dd/MM/yyyy');
    oEmpleados.FechaIngreso = kendo.toString($("#kdDpFechaIngreso").data("kendoDatePicker").value(), 'dd/MM/yyyy');
    oEmpleados.FechaBaja = kendo.toString($("#kdDpFechaBaja").data("kendoDatePicker").value(), 'dd/MM/yyyy');
    oEmpleados.GuardarEmpleado();
}

function bsMsgBox(sMensaje, sTitulo, Icono) {
    var Icono;
    var htmlIcono;
    var typeswal;

    switch (Icono) {
        case "Warning":
            htmlIcono = '<img src="Imagenes/Formularios/Alert32.png" class="IconMsg" />'
            typeswal = "warning"
            break;
        case "Info":
            htmlIcono = '<img src="Imagenes/Formularios/Info32.png" class="IconMsg" />'
            typeswal = "info"
            break;
        case "Error":
            htmlIcono = '<img src="Imagenes/Formularios/Error32.png" class="IconMsg" />'
            typeswal = "error"
            break;
        case "Question":
            htmlIcono = '<img src="Imagenes/Formularios/Question32.png" class="IconMsg" />'
            typeswal = "info"
            break;
        default:
            htmlIcono = ''
    }







}

//Librerias

function libMisMuestras() {
    var IdEmpleado;
    var token = sessionStorage.getItem('token');
    var UrlWebGeneral = "http://localhost:44543/api/";

    this.GetListMisMuestras = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "MisEmpleados/GetListMisEmpleados",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                var obj = result;

                if (!obj.bError) {
                    if (typeof fnResult !== 'undefined') {
                        var fn = eval(fnResult);
                        fn(result);


                    } else {



                    }
                } else {
                    bsMsgBox(obj.Msg, "Error", "Error");

                    if (typeof fnError !== 'undefined') {
                        var fnErrorAux = eval(fnError);
                        fnErrorAux();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                bsMsgBox("¡Se genero un error de conectividad con el servidor!", "Error", "Error");

                if (typeof fnError !== 'undefined') {
                    var fnErrorAux = eval(fnError);
                    fnErrorAux();
                }
            }
        });
    }
}

function libCatalogoEmpleados() {
    var Nombre;
    var ApellidoPaterno;
    var ApellidoMaterno;
    var Correo;
    var Telefono;
    var IdSucursal;
    var IdPuesto;
    var Genero;
    var FechaNacimiento;
    var FechaIngreso;
    var FechaBaja;

    var token = sessionStorage.getItem('token');
    var UrlWebGeneral = "http://localhost:44543/api/";

    this.GuardarEmpleado = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "MisEmpleados/GuardarEmpleado",
            //data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            data: sparam,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                var obj = result;

                if (!obj.bError) {


                    //var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
                    //popupNotification.show(kendo.toString("EMPLEADO REGISTRADO CORRECTAMENTE!!", "success"));
                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Registro Correcto!',
                        'Se registró correctamente al empleado!',
                        'success'
                    )
                    CrearDataGrid();


                    if (typeof fnResult !== 'undefined') {
                        var fn = eval(fnResult);
                        fn(result);


                    }
                } else {
                    bsMsgBox(obj.Msg, "Error", "Error");

                    if (typeof fnError !== 'undefined') {
                        var fnErrorAux = eval(fnError);
                        fnErrorAux();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                bsMsgBox("¡Se genero un error de conectividad con el servidor!", "Error", "Error");

                if (typeof fnError !== 'undefined') {
                    var fnErrorAux = eval(fnError);
                    fnErrorAux();
                }
            }
        });
    }


}

function libSucursales() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');

    this.GetListSucursales = function (fnResult, fnError) {

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Sucursales/GetListSucursales",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                var obj = result;

                if (!obj.bError) {
                    if (typeof fnResult !== 'undefined') {
                        var fn = eval(fnResult);
                        fn(result);
                    }
                } else {
                    bsMsgBox(obj.Msg, "Error", "Error");

                    if (typeof fnError !== 'undefined') {
                        var fnErrorAux = eval(fnError);
                        fnErrorAux();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                bsMsgBox("¡Se genero un error de conectividad con el servidor!", "Error", "Error");

                if (typeof fnError !== 'undefined') {
                    var fnErrorAux = eval(fnError);
                    fnErrorAux();
                }
            }
        });
    }
}

function libPuestos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');

    this.GetListPuestos = function (fnResult, fnError) {

        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Puestos/GetListPuestos",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                var obj = result;

                if (!obj.bError) {
                    if (typeof fnResult !== 'undefined') {
                        var fn = eval(fnResult);
                        fn(result);
                    }
                } else {
                    bsMsgBox(obj.Msg, "Error", "Error");

                    if (typeof fnError !== 'undefined') {
                        var fnErrorAux = eval(fnError);
                        fnErrorAux();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                bsMsgBox("¡Se genero un error de conectividad con el servidor!", "Error", "Error");

                if (typeof fnError !== 'undefined') {
                    var fnErrorAux = eval(fnError);
                    fnErrorAux();
                }
            }
        });
    }
}

//Llenar Combos

//Llenar Sucursal
var dataSourceKdComboSucursal = new kendo.data.DataSource({
    transport: {
        read: function (options) {
            var oSolicitudesTipos = new libSucursales();

            oSolicitudesTipos.GetListSucursales(function (result) {
                options.success(result.ListMuestras);
            },
                function (e) {
                    options.error();
                });
        }
    },
    error: function (e) {
        bsMsgBox('¡Se genero un error al momento de obtener los datos de las Solicitudes!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdInventarioSolicitudTipo: { type: "number" },
                InventarioSolicitudTipo: { type: "string" },
            }
        }
    }
});

//Llenar Puesto
var dataSourceKdComboPuestos = new kendo.data.DataSource({
    transport: {
        read: function (options) {
            var oSolicitudesTipos = new libPuestos();

            oSolicitudesTipos.GetListPuestos(function (result) {
                options.success(result.ListMuestras);
            },
                function (e) {
                    options.error();
                });
        }
    },
    error: function (e) {
        bsMsgBox('¡Se genero un error al momento de obtener los datos de los Puestos!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdInventarioSolicitudTipo: { type: "number" },
                InventarioSolicitudTipo: { type: "string" },
            }
        }
    }
});


