

$(document).ready(function () {
    CrearGrid();
    CrearDataGrid();
    CrearControles();
});


//Funciones Pantalla Principal
function CrearGrid() {
    var grdNivelUsuario = $("#grdNivelUsuario");
    grdNivelUsuario.kendoGrid({
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
            "search"
        ],
        search: {
            fields: ["NivelUsuario"]
        },
        resizable: true,
        height: 400,
        filterable: true,
        columns: [         
            {
                field: "NivelUsuario",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "Niveles"

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
    var grdNivelUsuario = $("#grdNivelUsuario");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                var oNotiApp = new libNivelUsuario();
              
                oNotiApp.GetListNivelUsuario(function (result) {
                    options.success(result.ListNivelUsuario);
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los Niveles!', "Error", "Error");
        },
        pageSize: 100,
        schema: {
            model: {
                fields: {
                    IdNivelUsuario: { type: "int" },
                    NivelUsuario: { type: "string" },
                    FechaAlta: { type: "string" }
                }
            }
        },
        dataSource: dataSource,
    });

    grdNivelUsuario.data("kendoGrid").setDataSource(dataSource);
}

//Funciones pantalla nuevo registro
function CrearControles() {

    var kdTxtNivelUsuario = $("#kdTxtNivelUsuario");
    var btnGuardar = $("#kdBtnGuardar");
    var btnActualizar = $("#kdBtnActualizar");
    var kdWindow = $("#kdWindow");
    //Creación de Window para nuevo reistro
    kdWindow.kendoWindow({
        visible: false,
        modal: true,
        resizable: false,
        width: "400px",
        height: "250px",
        actions: ["Maximize", "Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Registrar Nuevo Nivel"
    }).data("kendoWindow").center();



    //Creacion de TxtNivelUsuario
    kdTxtNivelUsuario.kendoTextBox({
        label: {
            content: "Nivel",
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
    var grid = $("#grdNivelUsuario").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdNivelUsuario = dataItem.IdNivelUsuario

        LimpiarControles();

        var kdTxtNivelUsuario = $("#kdTxtNivelUsuario").data("kendoTextBox");


        kdTxtNivelUsuario.value(dataItem.NivelUsuario);
       

        $("#kdWindow").data("kendoWindow").open();
        $("#kdWindow").data("kendoWindow").title("Editar Nivel Usuario");


    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar', '¡Seleccionar Elemento!', 'warning');
    }

}

function onEliminarClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#grdNivelUsuario").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdNivelUsuario = dataItem.IdNivelUsuario

        Swal.fire({
            title: '¿Estás seguro de eliminar el nivel?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                EliminarNivelUsuario();
            } else if (result.isDenied) {
                Swal.fire('¡El nivel no fue eliminado!', '', 'info')
            }
        })

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para eliminar', '¡Seleccionar Elemento!', 'warning');
    }

}



function ValidarControlesGuardar() {
   

    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        GuardarNivel();

    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }



}

function ValidarControlesActualizar() {
   

    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        ActualizarNivel();
    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }



}


function GuardarNivel() {

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libNivelUsuario();

    oEmpleados.NivelUsuario = $("#kdTxtNivelUsuario").data("kendoTextBox").value();
    oEmpleados.GuardarNivelUsuario();

}

function ActualizarNivel() {

    var grid = $("#grdNivelUsuario").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdNivelUsuario = dataItem.IdNivelUsuario

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libNivelUsuario();

    oEmpleados.NivelUsuario = $("#kdTxtNivelUsuario").data("kendoTextBox").value();
    oEmpleados.IdNivelUsuario = IdNivelUsuario;
    oEmpleados.ActualizarNivelUsuario();

}

function EliminarNivelUsuario() {

    var grid = $("#grdNivelUsuario").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdNivelUsuario = dataItem.IdNivelUsuario

    if (IdNivelUsuario == 1) {
        CrearAlerta("El nivel de ADMINISTRADOR no se puede eliminar por ser un elemento básico del sistema","¡No se puede eliminar!","info")
    } else {

        if (IdNivelUsuario == 2) {
            CrearAlerta("El nivel de USUARIO no se puede eliminar por ser un elemento básico del sistema", "¡No se puede eliminar!", "info")
        } else {
            var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
            var oEmpleados = new libNivelUsuario();


            oEmpleados.IdNivelUsuario = IdNivelUsuario;
            oEmpleados.EliminarNivelUsuario();
        }

        
    }

 

}

//Librerias

function libNivelUsuario() {
    var IdNivelUsuario;
    var token = sessionStorage.getItem('token');
    var UrlWebGeneral = "http://localhost:44543/api/";

    this.GetListNivelUsuario = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "NivelUsuario/GetListNivelUsuario",
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

    this.GuardarNivelUsuario = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "NivelUsuario/GuardarNivelUsuario",
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
                        'Se registró correctamente el Nivel!',
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

    this.ActualizarNivelUsuario = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "NivelUsuario/ActualizarNivelUsuario",
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
                        'Se actualizó correctamente el nivel!',
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

    this.EliminarNivelUsuario = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "NivelUsuario/EliminarNivelUsuario",
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
                        'Se eliminó correctamente el nivel!',
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
    
    $("#kdTxtNivelUsuario").data("kendoTextBox").value("");
    

}

