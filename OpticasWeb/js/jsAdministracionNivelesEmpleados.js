

$(document).ready(function () {
    CrearComboBox();
    setTimeout(() => {
        CrearGrid();
        CrearDataGrid();
        CrearControles();
    }, 1000);
   
});


//Funciones Pantalla Principal
function CrearGrid() {
    var grdNivelEmpleado = $("#grdNivelEmpleado");
    grdNivelEmpleado.kendoGrid({
        scrollable: true,
        sortable: true,

        selectable: "multiple, row",
        pageable: true,
        toolbar: [{
                template: '<a id="EditarItemButton"">Editar</a>'
            },
            {
                template: '<span class="k-textbox k-grid-search k-display-flex form-right"><input autocomplete="off" placeholder="Buscar..." title="Buscar..." class="k-input form-control form-right"><span class="k-input-icon justify-content-end"><span class="k-icon k-i-search justify-content-end"></span></span></span>'
            }],
        resizable: true,
        height: 400,
        filterable: true,
        columns: [         
            {
                field: "IdEmpleado",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "# de Empleado"

            },
            {
                field: "Nombre",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Nombre"

            },
            {
                field: "NivelUsuario",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Nivel"

            },
            {
                field: "Sucursal",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucrusal"

            }
        ],





    }).after(() => {
       
        $('#EditarItemButton').kendoButton({
            icon: 'k-icon k-i-track-changes',
            click: onEditClick
        });

       
    });



}

function CrearDataGrid() {
    var grdNivelEmpleado = $("#grdNivelEmpleado");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var kdDdlComboNivel = $("#kdDdlComboNivel").data('kendoComboBox').value();
    if (kdDdlComboNivel == "") {
        $("#grdNivelEmpleado").data("kendoGrid").dataSource.data([]);
    } else {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    var oNotiApp = new libNivelEmpleado();
                    oNotiApp.IdNivelUsuario = kdDdlComboNivel
                    oNotiApp.GetListNivelEmpleado(function (result) {
                        options.success(result.ListNivelUsuario);
                    },
                        function (e) {
                            options.error();
                        });
                }
            },
            error: function (e) {
                bsMsgBox('¡Se genero un error al momento de obtener los Niveles Empleados!', "Error", "Error");
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

        grdNivelEmpleado.data("kendoGrid").setDataSource(dataSource);
    }
   
}

function CrearComboBox() {

    var kdDdlComboNivel = $("#kdDdlComboNivel");

    //Crear Combo de Nivel (falata crear datasource)
    kdDdlComboNivel.kendoComboBox({
        dataSource: dataSourceKdComboNivel,
        dataTextField: "NivelUsuario",
        dataValueField: "IdNivelUsuario",
        index: 0,
        clearButton: false,
        filter: "contains",
        suggest: true,
        change: function (e) {
            CrearDataGrid();
        },
        label: {
            content: "Nivel",
            floating: true
        },
    });

    var fabric = $("#kdDdlComboNivel").data("kendoComboBox");
    fabric.input.attr("readonly", true)
    
   




}

//Funciones pantalla nuevo registro
function CrearControles() {

    var kdTxtNombre = $("#kdTxtNombre");
    var kdDdlNivel = $("#kdDdlNivel"); 
    //var kdDdlComboNivel = $("#kdDdlComboNivel");
    var btnActualizar = $("#kdBtnActualizar");
    var kdWindow = $("#kdWindow");
    //Creación de Window para nuevo reistro
    kdWindow.kendoWindow({
        visible: false,
        modal: true,
        resizable: false,
        width: "400px",
        height: "350px",
        actions: ["Maximize", "Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Relacionar Nivel - Empleado"
    }).data("kendoWindow").center();



    //Creacion de TxtNivelUsuario
    kdTxtNombre.kendoTextBox({
        label: {
            content: "Nombre",
            floating: true
            
           
        },
        readonly: true
    });

    //Crear Combo de Nivel (falata crear datasource)
    kdDdlNivel.kendoComboBox({
        dataSource: dataSourceKdComboNivel,
        dataTextField: "NivelUsuario",
        dataValueField: "IdNivelUsuario",
        clearButton: false,
        filter: "contains",
        suggest: true,
        label: {
            content: "Nivel",
            floating: true
        },
    });
    var fabric = $("#kdDdlNivel").data("kendoComboBox");
    fabric.input.attr("readonly", true)
  
    //Crear boton actualizar
    btnActualizar.kendoButton({
        icon: "k-icon k-i-save",
        themeColor: "primary",
        click: ValidarControlesActualizar
    });

}


//Abrir window Editar
function onEditClick() {
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#grdNivelEmpleado").data("kendoGrid");
    var kdDdlNivel = $("#kdDdlNivel").data("kendoComboBox");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdEmpleado = dataItem.IdEmpleado

        LimpiarControles();

        var kdTxtNombre = $("#kdTxtNombre").data("kendoTextBox");


        kdTxtNombre.value(dataItem.Nombre);

        kdDdlNivel.select(function (dataItem2) {
            return dataItem2.NivelUsuario === dataItem.NivelUsuario;
        });

        $("#kdWindow").data("kendoWindow").open();


    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar', '¡Seleccionar Elemento!', 'warning');
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



var dataSourceKdComboNivel = new kendo.data.DataSource({
    transport: {
        read: function (options) {
            var oSolicitudesTipos = new libNivelesUsuarios();

            oSolicitudesTipos.GetListNivelesUsuarios(function (result) {
                options.success(result.ListNivelUsuario);
            },
                function (e) {
                    options.error();
                });
        }
    },
    error: function (e) {
        bsMsgBox('¡Se genero un error al momento de obtener los datos de los niveles!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdNivelUsuario: { type: "number" },
                NivelUsuario: { type: "string" },
            }
        }
    }
});


function ActualizarNivel() {

    var grid = $("#grdNivelEmpleado").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdEmpleado = dataItem.IdEmpleado

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libNivelEmpleado();

    oEmpleados.IdNivelUsuario = $("#kdDdlNivel").data("kendoComboBox").value();
    oEmpleados.IdEmpleado = IdEmpleado;
    oEmpleados.ActualizarNivelEmpleado();

}

//Librerias

function libNivelEmpleado() {
    var IdNivelUsuario;
    var IdEmpelado;
    var token = sessionStorage.getItem('token');
    var UrlWebGeneral = "http://localhost:44543/api/";

    this.GetListNivelEmpleado = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "NivelUsuario/GetListNivelEmpleado",
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

    this.ActualizarNivelEmpleado = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "NivelUsuario/ActualizarNivelEmpleado",
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

}

function libNivelesUsuarios() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');

    this.GetListNivelesUsuarios = function (fnResult, fnError) {

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "NivelUsuario/GetListNivelesUsuariosCombo",
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



//Limpiar Controles
function LimpiarControles() {
    
    $("#kdTxtNombre").data("kendoTextBox").value("");
    $("#kdDdlNivel").data("kendoComboBox").select(-1);

}

