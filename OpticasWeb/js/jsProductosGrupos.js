$(document).ready(function () {
    var grd = $("#kdGridGruposProductos");
    var oProductosGrupos = new libProductosGrupos();

    var dataSourceGrid = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {
                oProductosGrupos.ListarProductosGruposGrid(function (result) {
                    options.success(result.ListProductosGrupos)
                }, function (e) {
                    options.error();
                });
            }
        },
        schema: {
            model: {
                id: "IdProductoGrupo",
                fields: {
                    ProductoGrupo: { type: "string" },
                    Descripcion: { type: "string" }
                }
            }
        },
        error: function (e) {
            CrearAlerta('¡Se genero un error al momento de obtener los datos de los Grupos de Productos!', "Error", "Error");
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
        },
        toolbar: [
            {
                template: kendo.template($("#btnTemplates").html())
            },
            "excel",
            "search"],
        excel: {
            fileName: "ListaGruposProductos.xlsx",
            allPages: true,
            filterable: true
        },
        columns: [
            {
                field: "ProductoGrupo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Grupos de Productos"
            },
            {
                field: "Descripcion",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Descripcion"
            }
        ]
    });

    $("#btnNuevo").click(function () {
        NuevoRegistro();
    });

    $("#btnEditar").click(function () {
        EditarRegistro();
    });

    $("#btnEliminar").click(function () {
        Eliminar();
    });

    $(document).on('click', '#btnGuardar', function () {
        Guardar();
    });

    $(document).on('click', '#btnCancelar', function () {
        CerrarWindow();
    });

    $(document).on('input', '#txtDescripcion', function (e) {
        $('.k-counter-container .k-counter-value').html($(e.target).val().length);
    });
});

function NuevoRegistro() {
    bTitulo = "Nuevo Grupo de Producto"
    CrearWindow(bTitulo);

    sessionStorage.setItem('TipoOperacion', $("#btnNuevo").attr("TipoOperacion"));

    $("#txtProductoGrupo").val("");
    $("#txtDescripcion").val("");
    $("#hidIdProductoGrupo").val("");
}

async function EditarRegistro() {
    var bEditar = await CrearAlertaConfirm("¿Esta Seguro Editar el Grupo de Producto?", "Editar Grupo de Producto", 'question');

    if (bEditar == true) {
        if (ValidarSeleccion() == true) {
            bTitulo = "Editar Grupo de Producto"
            CrearWindow(bTitulo);

            sessionStorage.setItem('TipoOperacion', $("#btnEditar").attr("TipoOperacion"));

            var grid = $("#kdGridGruposProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            var Contador = selectedItem.Descripcion.length;

            $("#hidIdProductoGrupo").val(selectedItem.IdProductoGrupo);
            $(".k-counter-value").html(Contador);
            $("#txtProductoGrupo").data("kendoTextBox").value(selectedItem.ProductoGrupo);
            $("#txtDescripcion").data("kendoTextArea").value(selectedItem.Descripcion);
            $("#txtDescripcion").data("kendoTextArea").floatingLabel.refresh();
        } else {
            CrearAlerta("¡Debe seleccionar un Grupo de Producto para modificar!", "Selección Grupo Producto", "warning")
        }
    }
}

function CrearWindow(bTitulo) {
    $("#kdWindow").kendoWindow({
        width: "350px",
        height: "400px",
        actions: ["Close"],
        resizable: false
    }).data("kendoWindow").open().center().title(bTitulo).content(kendo.template($("#ControlesWindowTemplate").html()));

    CrearControlesWindow();
}

function CrearControlesWindow() {
    $("#txtProductoGrupo").kendoTextBox({
        label: {
            content: "Grupo de Producto",
            floating: true
        }
    });

    $("#txtDescripcion").kendoTextArea({
        label: {
            content: "Descripción",
            floating: true
        },
        rows: 5,
        maxLength: 300
    });
}

function ValidarSeleccion() {
    var grid = $("#kdGridGruposProductos").data("kendoGrid");
    var selectedItem = grid.select();

    if (selectedItem.length > 0) {
        return true;
    } else {
        return false;
    }
}

function Guardar() {
    var oProductosGrupos = new libProductosGrupos();
    var TipoOperacion = sessionStorage.getItem('TipoOperacion');

    if (TipoOperacion == 1) {
        oProductosGrupos.ProductoGrupo = $("#txtProductoGrupo").data("kendoTextBox").value();
        oProductosGrupos.Descripcion = $("#txtDescripcion").data("kendoTextArea").value();
        oProductosGrupos.GuardarProductosGruposGrid();
    } else if (TipoOperacion == 2) {
        oProductosGrupos.IdProductoGrupo = $("#hidIdProductoGrupo").val();
        oProductosGrupos.ProductoGrupo = $("#txtProductoGrupo").data("kendoTextBox").value();
        oProductosGrupos.Descripcion = $("#txtDescripcion").data("kendoTextArea").value();
        oProductosGrupos.ActualizarProductosGruposGrid();
    }
}

async function Eliminar() {
    var bEliminar = await CrearAlertaConfirm("¿Esta Seguro Eliminar el Grupo de Producto?", "Eliminar Grupo de Producto", 'question');

    if (bEliminar == true) {
        if (ValidarSeleccion() == true) {
            var oProductosGrupos = new libProductosGrupos();
            var grid = $("#kdGridGruposProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            oProductosGrupos.IdProductoGrupo = selectedItem.IdProductoGrupo;
            oProductosGrupos.EliminarProductosGruposGrid();
        } else {
            CrearAlerta("¡Debe seleccionar un Grupo de Producto para eliminar!", "Selección Grupo Producto", "warning")
        }
    }
}

function CerrarWindow() {
    $("#kdWindow").data("kendoWindow").close();
    $("#txtProductoGrupo").val("");
    $("#txtDescripcion").val("");
    $("#hidIdProductoGrupo").val("");
    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
}

function libProductosGrupos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoGrupo;
    var ProductoGrupo;
    var Descripcion;

    this.ListarProductosGruposGrid = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosGrupos/ListarProductosGruposGrid",
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

    this.GuardarProductosGruposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosGrupos/GuardarProductosGruposGrid",
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
                    $('#kdGridGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.ActualizarProductosGruposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosGrupos/ActualizarProductosGruposGrid",
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
                    $('#kdGridGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.EliminarProductosGruposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosGrupos/EliminarProductosGruposGrid",
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
                    $('#kdGridGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
                } else {
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }
}