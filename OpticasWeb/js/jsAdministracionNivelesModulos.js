

$(document).ready(function () {
    CrearComboBox();
    setTimeout(() => {
        CrearControles();
        CrearGrid();
        CrearDataGrid();
        
    }, 2000);
   
});

function CrearControles() {

    var kdDdlComboModulo = $("#kdDdlComboModulo");
    //Crear Combo de modulos (falata crear datasource)
    kdDdlComboModulo.kendoComboBox({
        dataSource: dataSourceKdComboModulo,
        dataTextField: "NombreModulo",
        dataValueField: "IdModulo",
        clearButton: false,
        filter: "contains",
        suggest: true,

        label: {
            content: "Módulo(s)",
            floating: true
           
        },
    });
    var fabric = $("#kdDdlComboModulo").data("kendoComboBox");
    fabric.input.attr("readonly", true)

}

//Funciones Pantalla Principal
function CrearGrid() {
    var grdNivelModulo = $("#grdNivelModulo");
    grdNivelModulo.kendoGrid({
        scrollable: true,
        sortable: true,

        selectable: "multiple, row",
        pageable: true,
        toolbar: [{
                template: '<a id="AgregarItemButton"">Agregar</a>'
        },
            {
                template: '<a id="EliminarItemButton"">Eliminar</a>'
            },
            "search"
        ],
        search: {
            fields: ["NombreModulo", "ModuloTipo","NivelUsuario"]
        },
        resizable: true,
        height: 400,
        filterable: true,
        columns: [         
            {
                field: "NombreModulo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "Módulo(s)"

            },
            {
                field: "ModuloTipo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Tipo de Módulo(s)"

            },
            {
                field: "NivelUsuario",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Nivel(es)"

            }
        ],





    }).after(() => {
       
        $('#AgregarItemButton').kendoButton({
            icon: 'k-icon k-i-plus k-button-icon',
            click: ValidarControlesAgregar
        });

        $('#EliminarItemButton').kendoButton({
            icon: 'k-icon k-i-trash k-button-icon',
            click: ValidarControlesEliminar
        });
       
    });



}

function CrearDataGrid() {
    var grdNivelModulo = $("#grdNivelModulo");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var kdDdlComboNivel = $("#kdDdlComboNivel").data('kendoComboBox').value();
    if (kdDdlComboNivel == "") {
        $("#grdNivelModulo").data("kendoGrid").dataSource.data([]);
    } else {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    var oNotiApp = new libNivelesModulos();
                    oNotiApp.IdNivelUsuario = kdDdlComboNivel
                    oNotiApp.GetListNivelModulosGrid(function (result) {
                        options.success(result.ListNivelModulo);
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

        grdNivelModulo.data("kendoGrid").setDataSource(dataSource);
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
        suggest:true,
        clearButton: false,
        filter: "contains",
        change: function (e) {
            $("#grdNivelModulo").data("kendoGrid").dataSource.data([]);
            $("#kdDdlComboModulo").data("kendoComboBox").dataSource.data([]);

            //dataSource: dataSourceKdComboModulo

            var kdDdlComboModulo = $("#kdDdlComboModulo");
            //Crear Combo de modulos (falata crear datasource)
            kdDdlComboModulo.kendoComboBox({
                dataSource: dataSourceKdComboModulo,
                dataTextField: "NombreModulo",
                dataValueField: "IdModulo",
            });

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

var dataSourceKdComboModulo = new kendo.data.DataSource({
    transport: {
        read: function (options) {
            var kdDdlComboNivel = $("#kdDdlComboNivel").data('kendoComboBox').value();

            if (kdDdlComboNivel == "") {
                $("#grdNivelModulo").data("kendoGrid").dataSource.data([]);
                $("#kdDdlComboModulo").data("kendoComboBox").select(-1);
            } else {
                var oSolicitudesTipos = new libNivelesModulos();
                oSolicitudesTipos.IdNivelUsuario = kdDdlComboNivel
                oSolicitudesTipos.GetListNivelesModulos(function (result) {
                    options.success(result.ListNivelModulo);
                },
                    function (e) {
                        options.error();
                    });
            }

            
        }
    },
    error: function (e) {
        bsMsgBox('¡Se genero un error al momento de obtener los datos de los niveles!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdModulo: { type: "number" },
                NombreModulo: { type: "string" },
            }
        }
    }
});



function ValidarControlesEliminar() {
    
    var grid = $("#grdNivelModulo").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);

        Swal.fire({
            title: '¿Seguro de eliminar al registro?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                EliminarRelacion();
            } else if (result.isDenied) {
                Swal.fire('¡El registro no fue eliminado!', '', 'info')
            }
        })

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para eliminar', '¡Seleccionar Elemento!', 'warning');
    }
   



}

function ValidarControlesAgregar() {
    

    var validator = $("#kdCombos").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        AgregarRelacion();

    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }



}


//Eliminar

function EliminarRelacion() {

    var grid = $("#grdNivelModulo").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdNivelUsuario = dataItem.IdNivelUsuario
    var IdModulo = dataItem.IdModulo

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libNivelesModulos();

    oEmpleados.IdModulo = IdModulo;
    oEmpleados.IdNivelUsuario = IdNivelUsuario;
    oEmpleados.EliminarRelacion();

}

function AgregarRelacion() {

   
    
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libNivelesModulos();

    oEmpleados.IdModulo = $("#kdDdlComboModulo").data("kendoComboBox").value();
    oEmpleados.IdNivelUsuario = $("#kdDdlComboNivel").data("kendoComboBox").value();
    oEmpleados.AgregarRelacion();

}
//Librerias

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

function libNivelesModulos() {
    var IdNivelUsuario;
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');

    this.GetListNivelesModulos = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "NivelModulo/GetListNivelesModulos",
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

    this.GetListNivelModulosGrid = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "NivelModulo/GetListNivelesModulosGrid",
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

    this.EliminarRelacion = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "NivelModulo/EliminarRelacion",
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

                    Swal.fire(
                        'Eliminación Correcta!',
                        'Se eliminó correctamente la relación!',
                        'success'
                    )
                    $("#kdDdlComboModulo").data("kendoComboBox").dataSource.data([]);

                    var kdDdlComboModulo = $("#kdDdlComboModulo");
                    kdDdlComboModulo.kendoComboBox({
                        dataSource: dataSourceKdComboModulo,
                        dataTextField: "NombreModulo",
                        dataValueField: "IdModulo",
                    });
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

    this.AgregarRelacion = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "NivelModulo/AgregarRelacion",
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

                    Swal.fire(
                        'Registro Correcto!',
                        'Se agregó correctamente la relación!',
                        'success'
                    )
                    $("#kdDdlComboModulo").data("kendoComboBox").select(-1);
                    $("#kdDdlComboModulo").data("kendoComboBox").dataSource.data([]);

                    var kdDdlComboModulo = $("#kdDdlComboModulo");
                    kdDdlComboModulo.kendoComboBox({
                        dataSource: dataSourceKdComboModulo,
                        dataTextField: "NombreModulo",
                        dataValueField: "IdModulo",
                    });
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


