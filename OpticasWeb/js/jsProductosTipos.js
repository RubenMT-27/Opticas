$(document).ready(function () {
    var grd = $("#kdGridTiposProductos");
    var oProductosTipos = new libProductosTipos();

    var dataSourceGrid = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {
                oProductosTipos.ListarProductosTiposGrid(function (result) {
                    options.success(result.ListProductosTipos)
                }, function (e) {
                    options.error();
                });
            }
        },
        schema: {
            model: {
                id: "IdProductoTipo",
                fields: {
                    ProductoTipo: { type: "string" },
                    Descripcion: { type: "string" }
                }
            }
        },
        error: function (e) {
            CrearAlerta('¡Se genero un error al momento de obtener los datos de los Tipos de Productos!', "Error", "Error");
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
            fileName: "ListaTiposProductos.xlsx",
            allPages: true,
            filterable: true
        },
        columns: [
            {
                field: "ProductoTipo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Tipo de Producto"
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
    bTitulo = "Nuevo Tipo de Producto"
    CrearWindow(bTitulo);

    sessionStorage.setItem('TipoOperacion', $("#btnNuevo").attr("TipoOperacion"));

    $("#txtProductoTipo").val("");
    $("#txtDescripcion").val("");
    $("#hidIdProductoTipo").val("");
}

async function EditarRegistro() {
    var bEditar = await CrearAlertaConfirm("¿Esta Seguro Editar el Tipo de Producto?", "Editar Tipo de Producto", 'question');

    if (bEditar == true) {
        if (ValidarSeleccion() == true) {
            bTitulo = "Editar Tipo de Producto"
            CrearWindow(bTitulo);

            sessionStorage.setItem('TipoOperacion', $("#btnEditar").attr("TipoOperacion"));

            var grid = $("#kdGridTiposProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            var Contador = selectedItem.Descripcion.length;

            $("#hidIdProductoTipo").val(selectedItem.IdProductoTipo);
            $(".k-counter-value").html(Contador);
            $("#txtProductoTipo").data("kendoTextBox").value(selectedItem.ProductoTipo);
            $("#txtDescripcion").data("kendoTextArea").value(selectedItem.Descripcion);
            $("#txtDescripcion").data("kendoTextArea").floatingLabel.refresh();
        } else {
            CrearAlerta("¡Debe seleccionar un Tipo de Producto para modificar!", "Selección Tipo Producto", "warning")
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
    $("#txtProductoTipo").kendoTextBox({
        label: {
            content: "Tipo de Producto",
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
    var grid = $("#kdGridTiposProductos").data("kendoGrid");
    var selectedItem = grid.select();

    if (selectedItem.length > 0) {
        return true;
    } else {
        return false;
    }
}

function Guardar() {
    var oProductosTipos = new libProductosTipos();
    var TipoOperacion = sessionStorage.getItem('TipoOperacion');

    if (TipoOperacion == 1) {
        oProductosTipos.ProductoTipo = $("#txtProductoTipo").data("kendoTextBox").value();
        oProductosTipos.Descripcion = $("#txtDescripcion").data("kendoTextArea").value();
        oProductosTipos.GuardarProductosTiposGrid();
    } else if (TipoOperacion == 2) {
        oProductosTipos.IdProductoTipo = $("#hidIdProductoTipo").val();
        oProductosTipos.ProductoTipo = $("#txtProductoTipo").data("kendoTextBox").value();
        oProductosTipos.Descripcion = $("#txtDescripcion").data("kendoTextArea").value();
        oProductosTipos.ActualizarProductosTiposGrid();
    }
}

async function Eliminar() {
    var bEliminar = await CrearAlertaConfirm("¿Esta Seguro Eliminar el Tipo de Producto?", "Eliminar Tipo de Producto", 'question');

    if (bEliminar == true) {
        if (ValidarSeleccion() == true) {
            var oProductosTipos = new libProductosTipos();
            var grid = $("#kdGridTiposProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            oProductosTipos.IdProductoTipo = selectedItem.IdProductoTipo;
            oProductosTipos.EliminarProductosTiposGrid();
        } else {
            CrearAlerta("¡Debe seleccionar un Tipo de Producto para eliminar!", "Selección Tipo Producto", "warning")
        }
    }
}

function CerrarWindow() {
    $("#kdWindow").data("kendoWindow").close();
    $("#txtProductoTipo").val("");
    $("#txtDescripcion").val("");
    $("#hidIdProductoTipo").val("");
    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
}

function libProductosTipos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoTipo;
    var ProductoTipo;
    var Descripcion;

    this.ListarProductosTiposGrid = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTipos/ListarProductosTiposGrid",
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

    this.GuardarProductosTiposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosTipos/GuardarProductosTiposGrid",
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
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.ActualizarProductosTiposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosTipos/ActualizarProductosTiposGrid",
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
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.EliminarProductosTiposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosTipos/EliminarProductosTiposGrid",
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
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                } else {
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }
}