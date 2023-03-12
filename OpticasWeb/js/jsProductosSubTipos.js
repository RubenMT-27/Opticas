$(document).ready(function () {
    var grd = $("#kdGridTiposSubProductos");
    var oProductosSubTipos = new libProductosSubTipos();

    var dataSourceGrid = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {
                oProductosSubTipos.ListarProductosSubTiposGrid(function (result) {
                    options.success(result.ListProductosSubTipos)
                }, function (e) {
                    options.error();
                });
            }
        },
        schema: {
            model: {
                id: "IdProductoSubTipo",
                fields: {
                    IdProductoTipo: { type: "number" },
                    ProductoTipo: { type: "string" },
                    ProductoSubTipo: { type: "string" }
                }
            }
        },
        error: function (e) {
            CrearAlerta('¡Se genero un error al momento de obtener los datos de los SubTipos de Productos!', "Error", "Error");
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
            fileName: "ListaSubTiposProductos.xlsx",
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
                field: "ProductoSubTipo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "SubTipo de Producto"
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
});

function NuevoRegistro() {
    bTitulo = "Nuevo Tipo de SubProducto"
    CrearWindow(bTitulo);

    sessionStorage.setItem('TipoOperacion', $("#btnNuevo").attr("TipoOperacion"));

    $("#txtProductoSubTipo").val("");
    $("#ddlProductoTipo").val("");
    $("#hidIdProductoSubTipo").val("");
}

async function EditarRegistro() {
    var bEditar = await CrearAlertaConfirm("¿Esta Seguro Editar el SubTipo de Producto?", "Editar SubTipo de Producto", 'question');

    if (bEditar == true) {
        if (ValidarSeleccion() == true) {
            bTitulo = "Editar Tipo de SubProducto"
            CrearWindow(bTitulo);

            sessionStorage.setItem('TipoOperacion', $("#btnEditar").attr("TipoOperacion"));

            var grid = $("#kdGridTiposSubProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            $("#hidIdProductoSubTipo").val(selectedItem.IdProductoSubTipo);
            $("#txtProductoSubTipo").data("kendoTextBox").value(selectedItem.ProductoSubTipo);
            $("#ddlProductoTipo").data("kendoDropDownList").value(selectedItem.IdProductoTipo);
        } else {
            CrearAlerta("¡Debe seleccionar un SubTipo de Producto para modificar!", "Selección SubTipo Producto", "warning")
        }
    }
}

function CrearWindow(bTitulo) {
    $("#kdWindow").kendoWindow({
        width: "350px",
        height: "300px",
        actions: ["Close"],
        resizable: false
    }).data("kendoWindow").open().center().title(bTitulo).content(kendo.template($("#ControlesWindowTemplate").html()));

    CrearControlesWindow();
}

function CrearControlesWindow() {
    var oProductosTipos = new libProductosTipos();

    $("#txtProductoSubTipo").kendoTextBox({
        label: {
            content: "SubTipo de Producto",
            floating: true
        }
    });

    $("#ddlProductoTipo").kendoDropDownList({
        label: {
            content: "Tipo de Producto",
            floating: true
        },
        optionLabel: "Seleccione un Tipo de Producto",
        dataTextField: "ProductoTipo",
        dataValueField: "IdProductoTipo",
        dataSource: {
            transport: {
                read: function (options) {
                    oProductosTipos.ListarProductosTiposCombo(function (result) {
                        options.success(result.ListProductosTipos)
                    }, function (e) {
                        options.error();
                    });
                }
            }
        }
    });

    $(".k-input").attr("readonly", "readonly");
}

function ValidarSeleccion() {
    var grid = $("#kdGridTiposSubProductos").data("kendoGrid");
    var selectedItem = grid.select();

    if (selectedItem.length > 0) {
        return true;
    } else {
        return false;
    }
}

function Guardar() {
    var oProductosSubTipos = new libProductosSubTipos();
    var TipoOperacion = sessionStorage.getItem('TipoOperacion');

    if (TipoOperacion == 1) {
        oProductosSubTipos.IdProductoTipo = $("#ddlProductoTipo").data("kendoDropDownList").value();
        oProductosSubTipos.ProductoSubTipo = $("#txtProductoSubTipo").data("kendoTextBox").value();
        oProductosSubTipos.GuardarProductosSubTiposGrid();
    } else if (TipoOperacion == 2) {
        oProductosSubTipos.IdProductoSubTipo = $("#hidIdProductoSubTipo").val();
        oProductosSubTipos.IdProductoTipo = $("#ddlProductoTipo").data("kendoDropDownList").value();
        oProductosSubTipos.ProductoSubTipo = $("#txtProductoSubTipo").data("kendoTextBox").value();
        oProductosSubTipos.ActualizarProductosSubTiposGrid();
    }
}

async function Eliminar() {
    var bEliminar = await CrearAlertaConfirm("¿Esta Seguro Eliminar el SubTipo de Producto?", "Eliminar SubTipo de Producto", 'question');

    if (bEliminar == true) {
        if (ValidarSeleccion() == true) {
            var oProductosSubTipos = new libProductosSubTipos();
            var grid = $("#kdGridTiposSubProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            oProductosSubTipos.IdProductoSubTipo = selectedItem.IdProductoSubTipo;
            oProductosSubTipos.EliminarProductosSubTiposGrid();
        } else {
            CrearAlerta("¡Debe seleccionar un SubTipo de Producto para eliminar!", "Selección SubTipo Producto", "warning")
        }
    }
}

function CerrarWindow() {
    $("#kdWindow").data("kendoWindow").close();
    $("#txtProductoSubTipo").val("");
    $("#ddlProductoTipo").val("");
    $("#hidIdProductoSubTipo").val("");
    $('#kdGridTiposSubProductos').data('kendoGrid').clearSelection();
}


function libProductosSubTipos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoTipo;
    var ProductoSubTipo;
    var IdProductoSubTipo;

    this.ListarProductosSubTiposGrid = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosSubTipos/ListarProductosSubTiposGrid",
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

    this.GuardarProductosSubTiposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosSubTipos/GuardarProductosSubTiposGrid",
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
                    $('#kdGridTiposSubProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposSubProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposSubProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridTiposSubProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposSubProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposSubProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.ActualizarProductosSubTiposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosSubTipos/ActualizarProductosSubTiposGrid",
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
                    $('#kdGridTiposSubProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposSubProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposSubProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridTiposSubProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposSubProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposSubProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.EliminarProductosSubTiposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosSubTipos/EliminarProductosSubTiposGrid",
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
                    $('#kdGridTiposSubProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposSubProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposSubProductos').data('kendoGrid').clearSelection();
                } else {
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridTiposSubProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposSubProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposSubProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }
}

function libProductosTipos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoTipo;
    var ProductoTipo;
    var Descripcion;


    this.ListarProductosTiposCombo = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTipos/ListarProductosTiposCombo",
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
}