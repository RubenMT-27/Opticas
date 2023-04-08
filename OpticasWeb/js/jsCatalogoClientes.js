

$(document).ready(function () {
    CrearGrid();
    CrearDataGrid();
  
        CrearControles();
   
});

//Funciones Pantalla Principal
function CrearGrid() {
    var grdClientes = $("#grdClientes");
    grdClientes.kendoGrid({
        scrollable: true,
        sortable: true,
       
        selectable: "multiple, row",
        pageable: true,
        toolbar: [{
        template: '<a id="newItemButton"">Nuevo</a>'
        }, {
            template: '<a id="EditarItemButton"">Editar</a>'
            },
            {
                template: '<a id="EliminarItemButton"">Eliminar</a>'
            },
            "excel", "search"
        ],


        excel: {
            fileName: "Catálogo_De_Pacientes.xlsx",
            allPages: true,
            filterable: true
        },
        search: {
            fields: ["IdCliente", "Nombre", "ApellidoPaterno", "ApellidoMaterno", "NumeroTelefono", "CorreoElectronico", "Sucursal"]
        },
        resizable: true,
        filterable: true,
        columns: [
            {
                field: "IdCliente",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Número de Paciente"
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
                field: "FechaNacimiento",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Fecha de Nacimiento"

            },
            {
                field: "Sucursal",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal Registro"

            },
            {
                field: "FechaAlta",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Fecha de Alta"

            }
        ],





    }).after(() => {
        $('#newItemButton').kendoButton({
            icon: 'k-icon k-i-plus k-button-icon',
            click: onNewClick
        });
        $('#EditarItemButton').kendoButton({
            icon: 'k-icon k-i-pencil k-button-icon',
            click: onEditClick
        });

        $('#EliminarItemButton').kendoButton({
            icon: 'k-icon k-i-trash k-button-icon',
            click: onEliminarClick
        });
    });




}

function CrearDataGrid() {
    var grdClientes = $("#grdClientes");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {



                var oNotiApp = new libClientes();
                oNotiApp.GetListClientes(function (result) {
                    options.success(result.ListClientes);
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de los Pacientes!', "Error", "Error");
        },
        pageSize: 100,
        schema: {
            model: {
                fields: {
                    IdCliente: { type: "string" },
                    Nombre: { type: "string" },
                    ApellidoPaterno: { type: "string" },
                    ApellidoMaterno: { type: "string" },
                    NumeroTelefono: { type: "number" },
                    CorreoElectronico: { type: "string" },
                    FechaNacimiento: { type: "string" },
                    FechaAlta: { type: "string" },
                    Sucursal: { type: "string" }
                }
            }
        },
        dataSource: dataSource,
    });

    grdClientes.data("kendoGrid").setDataSource(dataSource);
}

//Funciones pantalla nuevo registro
function CrearControles() {

    var kdNombre = $("#kdTxtNombre");
    var kdApellidoPaterno = $("#kdTxtApellidoPaterno");
    var kdApellidoMaterno = $("#kdTxtApellidoMaterno");
    var kdCorreoElectronico = $("#kdTxtCorreoElectronico");
    var kdNumeroTelefono = $("#kdTxtNumeroTelfono");
    var kdDateNacimiento = $("#kdDpFechaNacimiento");
    var btnGuardar = $("#kdBtnGuardar");
    var kdComboSucursal = $("#kdDdlSucursal");
    var btnActualizar = $("#kdBtnActualizar");
    var kdWindow = $("#kdWindow");
    //Creación de Window para nuevo reistro
    kdWindow.kendoWindow({
        visible: false,
        modal: true,
        resizable: false,
        width: "700px",
        height: "550px",
        actions: ["Maximize", "Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Registrar Nuevo Paciente"
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

    //Crear Combo de Sucursal (falata crear datasource)
    kdComboSucursal.kendoComboBox({
        dataSource: dataSourceKdComboSucursal,
        dataTextField: "Sucursal",
        dataValueField: "IdSucursal",
        clearButton: false,
        filter: "contains",
        suggest: true,
        label: {
            content: "Sucursal",
            floating: true
        },
    });

    var fabric = $("#kdDdlSucursal").data("kendoComboBox");
    fabric.input.attr("readonly", true)


    //Creacion de txtNumeroTelefono
    kdNumeroTelefono.kendoTextBox({
        label: {
            content: "Número de Teléfono",
            floating: true
        }
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


    //Crear boton guardar
    btnGuardar.kendoButton({
        icon: "k-icon k-i-save",
        themeColor: "primary",
        click: ValidarControlesGuardar
    });

    //Crear boton actualizar
    btnActualizar.kendoButton({
        icon: "k-icon k-i-save",
        themeColor: "primary",
        click: ValidarControlesActualizar
    });


    // DISABLE inputs
    $("#kdDpFechaNacimiento").attr("readonly", true);

}


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
                IdSucursal: { type: "number" },
                Sucursal: { type: "string" },
            }
        }
    }
});
//Abrir window nuevo registro
function onNewClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.show();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.hide();
   
    LimpiarControles();
    $("#kdWindow").data("kendoWindow").open();
   
}

//Abrir window Editar
function onEditClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#grdClientes").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

            var dataItem = grid.dataItem(selectedRows[0]);
        var IdCliente = dataItem.IdCliente
         
        LimpiarControles();

        var kdNombre = $("#kdTxtNombre").data("kendoTextBox");
        var kdApellidoPaterno = $("#kdTxtApellidoPaterno").data("kendoTextBox");
        var kdApellidoMaterno = $("#kdTxtApellidoMaterno").data("kendoTextBox");
        var kdCorreoElectronico = $("#kdTxtCorreoElectronico").data("kendoTextBox");
        var kdNumeroTelefono = $("#kdTxtNumeroTelfono").data("kendoTextBox");
        var kdDateNacimiento = $("#kdDpFechaNacimiento").data("kendoDatePicker");
        var kdComboSucursal = $("#kdDdlSucursal").data("kendoComboBox");
        
     
        kdNombre.value(dataItem.Nombre);
        kdApellidoPaterno.value(dataItem.ApellidoPaterno);
        kdApellidoMaterno.value(dataItem.ApellidoMaterno);
        kdCorreoElectronico.value(dataItem.CorreoElectronico);
        kdNumeroTelefono.value(dataItem.NumeroTelefono)

        kdDateNacimiento.value(dataItem.FechaNacimiento)

        kdComboSucursal.select(function (dataItem2) {
            return dataItem2.Sucursal === dataItem.Sucursal;
        });

        $("#kdWindow").data("kendoWindow").open();
        $("#kdWindow").data("kendoWindow").title("Editar Paciente");



    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar', '¡Seleccionar Elemento!', 'warning');
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

function onEliminarClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#grdClientes").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdCliente = dataItem.IdCliente

        Swal.fire({
            title: '¿Seguro de eliminar al paciente?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                EliminarCliente();
            } else if (result.isDenied) {
                Swal.fire('¡El paciente no fue eliminado!', '', 'info')
            }
        })
       
    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para eliminar', '¡Seleccionar Elemento!', 'warning');
    }

}

function ValidarControlesGuardar() {
  
    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
         GuardarCliente();

    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }



}

function ValidarControlesActualizar() {
  
    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        ActualizarCliente();
    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }
}

function GuardarCliente() {
   
        var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
        var oEmpleados = new libClientes();
        oEmpleados
        oEmpleados.Nombre = $("#kdTxtNombre").data("kendoTextBox").value();
        oEmpleados.ApellidoPaterno = $("#kdTxtApellidoPaterno").data("kendoTextBox").value();
        oEmpleados.ApellidoMaterno = $("#kdTxtApellidoMaterno").data("kendoTextBox").value();
        oEmpleados.CorreoElectronico = $("#kdTxtCorreoElectronico").data("kendoTextBox").value();
        oEmpleados.NumeroTelefono = $("#kdTxtNumeroTelfono").data("kendoTextBox").value();
    oEmpleados.FechaNacimiento = kendo.toString($("#kdDpFechaNacimiento").data("kendoDatePicker").value(), 'dd/MM/yyyy');
    oEmpleados.IdSucursalRegistro = $("#kdDdlSucursal").data("kendoComboBox").value();
        oEmpleados.GuardarCliente();
   
}

function ActualizarCliente() {

    var grid = $("#grdClientes").data("kendoGrid");
    var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        var IdCliente = dataItem.IdCliente

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libClientes();

    oEmpleados.Nombre = $("#kdTxtNombre").data("kendoTextBox").value();
    oEmpleados.ApellidoPaterno = $("#kdTxtApellidoPaterno").data("kendoTextBox").value();
    oEmpleados.ApellidoMaterno = $("#kdTxtApellidoMaterno").data("kendoTextBox").value();
    oEmpleados.CorreoElectronico = $("#kdTxtCorreoElectronico").data("kendoTextBox").value();
    oEmpleados.IdSucursalRegistro = $("#kdDdlSucursal").data("kendoComboBox").value();
    oEmpleados.NumeroTelefono = $("#kdTxtNumeroTelfono").data("kendoTextBox").value();
    oEmpleados.FechaNacimiento = kendo.toString($("#kdDpFechaNacimiento").data("kendoDatePicker").value(), 'dd/MM/yyyy');
    oEmpleados.IdCliente = IdCliente;
    oEmpleados.ActualizarCliente();

}

function EliminarCliente() {

    var grid = $("#grdClientes").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdCliente = dataItem.IdCliente

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libClientes();

   
    oEmpleados.IdCliente = IdCliente;
    oEmpleados.EliminarCliente();

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
function libClientes() {
    var Nombre;
    var ApellidoPaterno;
    var ApellidoMaterno;
    var Correo;
    var Telefono;
    var IdSucursal;
    var IdPuesto;
    var IdSucursalRegistro;
    var Genero;
    var FechaNacimiento;
    var FechaIngreso;
    var FechaBaja;

    var token = sessionStorage.getItem('token');
    var UrlWebGeneral = "http://localhost:44543/api/";

    this.GetListClientes = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "MisClientes/GetListClientes",
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

    this.GuardarCliente = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "MisClientes/GuardarCliente",
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

                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Registro Correcto!',
                        'Se registró correctamente al paciente!',
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

    this.ActualizarCliente = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "MisClientes/ActualizarCliente",
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

                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Actualización Correcta!',
                        'Se actualizó correctamente el paciente!',
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

    this.EliminarCliente = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "MisClientes/EliminarCliente",
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
                        'Eliminación Correcta!',
                        'Se eliminó correctamente el paciente!',
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

//Limpiar Controles
function LimpiarControles() {
    var kdDateNacimiento = $("#kdDpFechaNacimiento").data("kendoDatePicker")

    $("#kdTxtNombre").data("kendoTextBox").value("")
    $("#kdTxtApellidoPaterno").data("kendoTextBox").value("")
    $("#kdTxtApellidoMaterno").data("kendoTextBox").value("")
    $("#kdTxtCorreoElectronico").data("kendoTextBox").value("")
    $("#kdTxtNumeroTelfono").data("kendoTextBox").value("")
    $("#kdDdlSucursal").data("kendoComboBox").select(-1);
    kdDateNacimiento.value(null);
    kdDateNacimiento.setOptions({ format: "MM/dd/yyyy" });

}


