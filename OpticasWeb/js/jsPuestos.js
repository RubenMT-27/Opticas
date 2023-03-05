$(document).ready(function () {
    var grd = $("#kdGridPuestos");
    var oPuestos = new libPuestos();

    var dataSourceGrid = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {
                oPuestos.GetListPuestosGrid(function (result) {
                    options.success(result.ListPuestos);
                }, function (e) {
                    options.error();
                });
            }
            //,
            //create: function (options) {
            //    oPuestos.Puesto = $("#txtPuesto").data("kendoTextBox").value();
            //    oPuestos.GuardarPuestoGrid();
            //},
            //update: function (options) {

            //}
        },
        schema: {
            model: {
                id: "IdPuesto",
                fields: {
                    Puesto: { type: "string" }
                }
            }
        },
        error: function (e) {
            CrearAlerta('¡Se genero un error al momento de obtener los datos de los Puestos!', "Error", "Error");
        }

    });

    grd.kendoGrid({
        dataSource: dataSourceGrid,
        scrollable: true,
        sortable: true,
        resizable: true,
        reorderable: true,
        filterable: false,
        selectable: true,
        persistSelection: true,
        groupable: false,
        pageable: {
            refresh: true,
            pageSize: true
        }
        ,
        toolbar: [
            {
                template: kendo.template($("#btnTemplates").html())
            },
            "excel",
            "search"],
        excel: {
            fileName: "ListaPuestos.xlsx",
            allPages: true,
            filterable: true
        },
        columns: [
            {
                field: "Puesto",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Puesto"
            }
        ]
        //,
        //change: ObtenerId
    });

    $("#btnNuevo").click(function () {
        NuevoRegistro();
    });

    $("#btnEditar").click(function () {
        EditarRegistro();
        //var bEditar = await CrearAlertaConfirm("¿Esta Seguro Editar el Puesto?", "Editar Puesto", 'question');

        //if (bEditar == true) {
        //    if (ValidarSeleccion() == true) {
        //        EditarRegistro();
        //    } else {
        //        CrearAlerta("¡Debe seleccionar un puesto para modificar!", "Selección Puesto", "warning")
        //    }
        //}
    });

    $("#btnEliminar").click(function () {
        Eliminar();
        //var bEliminar = await CrearAlertaConfirm("¿Esta Seguro Eliminar el Puesto?", "Eliminar Puesto", 'question');

        //if (bEliminar == true) {
        //    if (ValidarSeleccion() == true) {
        //        Eliminar();
        //    } else {
        //        CrearAlerta("¡Debe seleccionar un puesto para eliminar!", "Selección Puesto", "warning")
        //    }
        //}
    });

    $(document).on('click', '#btnGuardar', function () {
        Guardar();
    });

    $(document).on('click', '#btnCancelar', function () {
        CerrarWindow();
    });
});

function NuevoRegistro() {
    bTitulo = "Nuevo Puesto"
    CrearWindow(bTitulo);

    sessionStorage.setItem('TipoOperacion', $("#btnNuevo").attr("TipoOperacion"));

    $("#txtPuesto").val("");
    $("#hidIdPuesto").val("");
}

async function EditarRegistro() {
    var bEditar = await CrearAlertaConfirm("¿Esta Seguro Editar el Puesto?", "Editar Puesto", 'question');

    if (bEditar == true) {
        if (ValidarSeleccion() == true) {
            bTitulo = "Editar Puesto"
            CrearWindow(bTitulo);

            sessionStorage.setItem('TipoOperacion', $("#btnEditar").attr("TipoOperacion"));

            var grid = $("#kdGridPuestos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            $("#txtPuesto").data("kendoTextBox").value(selectedItem.Puesto);
            $("#hidIdPuesto").val(selectedItem.IdPuesto);
        } else {
            CrearAlerta("¡Debe seleccionar un puesto para modificar!", "Selección Puesto", "warning")
        }
    }
}

function CrearWindow(bTitulo) {
    $("#kdWindow").kendoWindow({
        width: "350px",
        height: "220px",
        actions: ["Close"],
        resizable: false
    }).data("kendoWindow").open().center().title(bTitulo).content(kendo.template($("#ControlesWindowTemplate").html()));

    CrearControlesWindow();
}

function CrearControlesWindow() {
    $("#txtPuesto").kendoTextBox({
        label: {
            content: "Puesto",
            floating: true
        }
    });
}

function ValidarSeleccion() {
    var grid = $("#kdGridPuestos").data("kendoGrid");
    var selectedItem = grid.select();

    if (selectedItem.length > 0) {
        return true;
    } else {
        return false;
    }
}

//function ObtenerId(e) {
//    var row = e.sender.select();

//    var grid = $("#kdGridPuestos").data("kendoGrid");
//    var dataItem = grid.dataItem(row)

//    $("#txtPuesto").val(dataItem.Puesto);
//    $("#hidIdPuesto").val(dataItem.Puesto);
//}

function Guardar() {
    var oPuestos = new libPuestos();
    var TipoOperacion = sessionStorage.getItem('TipoOperacion');

    if (TipoOperacion == 1) {
        oPuestos.Puesto = $("#txtPuesto").data("kendoTextBox").value();
        oPuestos.GuardarPuestoGrid();
    } else if (TipoOperacion == 2) {
        oPuestos.IdPuesto = $("#hidIdPuesto").val();
        oPuestos.Puesto = $("#txtPuesto").data("kendoTextBox").value();
        oPuestos.ActualizarPuestoGrid();
    }
}

async function Eliminar() {
    var bEliminar = await CrearAlertaConfirm("¿Esta Seguro Eliminar el Puesto?", "Eliminar Puesto", 'question');

    if (bEliminar == true) {
        if (ValidarSeleccion() == true) {
            var oPuestos = new libPuestos();
            var grid = $("#kdGridPuestos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            oPuestos.IdPuesto = selectedItem.IdPuesto;
            oPuestos.EliminarPuestoGrid();
        } else {
            CrearAlerta("¡Debe seleccionar un puesto para eliminar!", "Selección Puesto", "warning")
        }
    }
}

function CerrarWindow() {
    $("#kdWindow").data("kendoWindow").close();
    $("#txtPuesto").val("");
    $("#hidIdPuesto").val("");
    $('#kdGridPuestos').data('kendoGrid').clearSelection();
}

function libPuestos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdPuesto;
    var Puesto;

    this.GetListPuestosGrid = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Puestos/GetListPuestosGrid",
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    if (typeof fnResult !== 'undefined') {
                        var fn = eval(fnResult);
                        fn(result);
                    }
                } else {
                    CrearAlerta(result.Msg, "Error", "error");

                    if (typeof fnResult !== 'undefined') {
                        var fn = eval(fnError);
                        fn(result);
                    }
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.GuardarPuestoGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "Puestos/GuardarPuestoGrid",
            data: sparam,
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Exitoso", "success");
                    $('#kdGridPuestos').data('kendoGrid').dataSource.read();
                    $('#kdGridPuestos').data('kendoGrid').refresh();
                    $('#kdGridPuestos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridPuestos').data('kendoGrid').dataSource.read();
                    $('#kdGridPuestos').data('kendoGrid').refresh();
                    $('#kdGridPuestos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.ActualizarPuestoGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "Puestos/ActualizarPuestoGrid",
            data: sparam,
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Exitoso", "success");
                    $('#kdGridPuestos').data('kendoGrid').dataSource.read();
                    $('#kdGridPuestos').data('kendoGrid').refresh();
                    $('#kdGridPuestos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridPuestos').data('kendoGrid').dataSource.read();
                    $('#kdGridPuestos').data('kendoGrid').refresh();
                    $('#kdGridPuestos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.EliminarPuestoGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "Puestos/EliminarPuestoGrid",
            data: sparam,
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    CrearAlerta(result.Msg, "Exitoso", "success");
                    $('#kdGridPuestos').data('kendoGrid').dataSource.read();
                    $('#kdGridPuestos').data('kendoGrid').refresh();
                    $('#kdGridPuestos').data('kendoGrid').clearSelection();
                } else {
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridPuestos').data('kendoGrid').dataSource.read();
                    $('#kdGridPuestos').data('kendoGrid').refresh();
                    $('#kdGridPuestos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }
}