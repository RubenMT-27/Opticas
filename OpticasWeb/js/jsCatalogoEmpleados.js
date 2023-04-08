

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
        selectable: "multiple, row",
        pageable: true,
        toolbar: [
            {
             template: '<a id="newItemButton"">Nuevo</a>'
             },
            {
            template: '<a id="EditarItemButton"">Editar</a>'
            },
            {
             template: '<a id="EliminarItemButton"">Eliminar</a>'
            },
            "excel", "search"
        ],


        excel: {
            fileName: "Catálogo_De_Empleados.xlsx",
            allPages: true,
            filterable: true
        },
        search: {
            fields: ["IdEmpleado", "Nombre", "ApellidoPaterno", "ApellidoMaterno", "NumeroTelefono", "CorreoElectronico","Sucursal","Puesto","Genero"]
        },
        resizable: true,
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
    var btnActualizar = $("#kdBtnActualizar");
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

    //Crear Combo de Puesto (falata crear datasource)
    kdComboPuesto.kendoComboBox({
        dataSource: dataSourceKdComboPuestos,
        dataTextField: "Puesto",
        dataValueField: "IdPuesto",
        clearButton: false,
        index: -1,
        filter: "contains",
        suggest: true,
        label: {
            content: "Puesto",
            floating: true
        },
    });

    var fabric2 = $("#kdDdlPuesto").data("kendoComboBox");
    fabric2.input.attr("readonly", true)

    //Crear Combo de Genero (falata crear datasource)
    kdComboGenero.kendoComboBox({
        dataSource: [
            { IdGenero: 1, Genero: "Masculino" },
            { IdGenero: 2, Genero: "Femenino" }
        ],
        dataTextField: "Genero",
        dataValueField: "IdGenero",
        clearButton: false,
        index: -1,
        filter: "contains",
        suggest: true,
        label: {
            content: "Género",
            floating: true
        },
    });

    var fabric3 = $("#kdDdlGenero").data("kendoComboBox");
    fabric3.input.attr("readonly", true)

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

    //Crear boton actualizar
    btnActualizar.kendoButton({
        icon: "k-icon k-i-save",
        themeColor: "primary",
        click: ValidarControlesActualizar
    });


    // DISABLE inputs
    $("#kdDpFechaNacimiento").attr("readonly", true);
    $("#kdDpFechaIngreso").attr("readonly", true);

}

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
    var grid = $("#grdMisMuestras").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

            var dataItem = grid.dataItem(selectedRows[0]);
            var IdEmpleado= dataItem.IdEmpleado
         
        LimpiarControles();

        var kdNombre = $("#kdTxtNombre").data("kendoTextBox");
        var kdApellidoPaterno = $("#kdTxtApellidoPaterno").data("kendoTextBox");
        var kdApellidoMaterno = $("#kdTxtApellidoMaterno").data("kendoTextBox");
        var kdCorreoElectronico = $("#kdTxtCorreoElectronico").data("kendoTextBox");
        var kdNumeroTelefono = $("#kdTxtNumeroTelfono").data("kendoTextBox");
        var kdComboSucursal = $("#kdDdlSucursal").data("kendoComboBox");
        var kdComboPuesto = $("#kdDdlPuesto").data("kendoComboBox");
        var kdComboGenero = $("#kdDdlGenero").data("kendoComboBox");
        var kdDateNacimiento = $("#kdDpFechaNacimiento").data("kendoDatePicker");
        var kdDateIngreso = $("#kdDpFechaIngreso").data("kendoDatePicker");
        
     
        kdNombre.value(dataItem.Nombre);
        kdApellidoPaterno.value(dataItem.ApellidoPaterno);
        kdApellidoMaterno.value(dataItem.ApellidoMaterno);
        kdCorreoElectronico.value(dataItem.CorreoElectronico);
        kdNumeroTelefono.value(dataItem.NumeroTelefono)

        kdComboSucursal.select(function (dataItem2) {
            return dataItem2.Sucursal === dataItem.Sucursal;
        });

        kdComboPuesto.select(function (dataItem2) {
            return dataItem2.Puesto === dataItem.Puesto;
        });

        kdComboGenero.select(function (dataItem2) {
            return dataItem2.Genero === dataItem.Genero;
        });

        kdDateNacimiento.value(dataItem.FechaNacimiento)
        kdDateIngreso.value(dataItem.FechaIngreso)

        //kdComboSucursal.select(dataItem.dataTextField);
        //kdComboSucursal.trigger("change");

        $("#kdWindow").data("kendoWindow").open();
        $("#kdWindow").data("kendoWindow").title("Editar Empleado");




        

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar', '¡Seleccionar Elemento!', 'warning');
    }

}

function onEliminarClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#grdMisMuestras").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdEmpleado = dataItem.IdEmpleado

        Swal.fire({
            title: '¿Seguro de eliminar al empleado?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                EliminarEmpleado();
            } else if (result.isDenied) {
                Swal.fire('¡El empleado no fue eliminado!', '', 'info')
            }
        })
       
    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para eliminar', '¡Seleccionar Elemento!', 'warning');
    }

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

function ValidarControlesActualizar() {
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
        ActualizarEmpleado();
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
        oEmpleados.GuardarEmpleado();
   
}

function ActualizarEmpleado() {

    var grid = $("#grdMisMuestras").data("kendoGrid");
    var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        var IdEmpleado = dataItem.IdEmpleado

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
    oEmpleados.IdEmpleado = IdEmpleado;
    oEmpleados.ActualizarEmpleado();

}

function EliminarEmpleado() {

    var grid = $("#grdMisMuestras").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdEmpleado = dataItem.IdEmpleado

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libCatalogoEmpleados();

   
    oEmpleados.IdEmpleado = IdEmpleado;
    oEmpleados.EliminarEmpleado();

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

    this.ActualizarEmpleado = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "MisEmpleados/ActualizarEmpleado",
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
                        'Actualización Correcta!',
                        'Se actualizó correctamente el empleado!',
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

    this.EliminarEmpleado = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "MisEmpleados/EliminarEmpleado",
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
                        'Se eliminó correctamente el empleado!',
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

//Limpiar Controles
function LimpiarControles() {
    var kdDateNacimiento = $("#kdDpFechaNacimiento").data("kendoDatePicker")
    var kdDateIngreso = $("#kdDpFechaIngreso").data("kendoDatePicker")

    $("#kdTxtNombre").data("kendoTextBox").value("")
    $("#kdTxtApellidoPaterno").data("kendoTextBox").value("")
    $("#kdTxtApellidoMaterno").data("kendoTextBox").value("")
    $("#kdTxtCorreoElectronico").data("kendoTextBox").value("")
    $("#kdTxtNumeroTelfono").data("kendoTextBox").value("")
    $("#kdDdlSucursal").data("kendoComboBox").select(-1);
    $("#kdDdlPuesto").data("kendoComboBox").select(-1);
    $("#kdDdlGenero").data("kendoComboBox").select(-1);
    
    kdDateNacimiento.value(null);
    kdDateNacimiento.setOptions({ format: "MM/dd/yyyy" });

    kdDateIngreso.value(null);
    kdDateIngreso.setOptions({ format: "MM/dd/yyyy" });
   
}


