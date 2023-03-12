$(document).ready(function () {
    var grd = $("#kdGridSubGruposProductos");
    var oProductosSubGrupos = new libProductosSubGrupos();

    var dataSourceGrid = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {
                oProductosSubGrupos.ListarProductosSubGruposGrid(function (result) {
                    options.success(result.ListProductosSubGrupos)
                }, function (e) {
                    options.error();
                });
            }
        },
        schema: {
            model: {
                id: "IdProductoSubGrupo",
                fields: {
                    IdProductoGrupo: { type: "number" },
                    ProductoGrupo: { type: "string" },
                    ProductoSubGrupo: { type: "string" }
                }
            }
        },
        error: function (e) {
            CrearAlerta('¡Se genero un error al momento de obtener los datos de los SubGrupos de Productos!', "Error", "Error");
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
            fileName: "ListaSubGruposProductos.xlsx",
            allPages: true,
            filterable: true
        },
        columns: [
            {
                field: "ProductoGrupo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Grupo de Producto"
            },
            {
                field: "ProductoSubGrupo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "SubGrupo de Producto"
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
    bTitulo = "Nuevo SubGrupo de Producto"
    CrearWindow(bTitulo);

    sessionStorage.setItem('TipoOperacion', $("#btnNuevo").attr("TipoOperacion"));

    $("#txtSubGrupo").val("");
    $("#ddlGrupo").val("");
    $("#hidIdSubGrupo").val("");
}

async function EditarRegistro() {
    var bEditar = await CrearAlertaConfirm("¿Esta Seguro Editar el SubGrupo de Producto?", "Editar SubGrupo de Producto", 'question');

    if (bEditar == true) {
        if (ValidarSeleccion() == true) {
            bTitulo = "Editar SubGrupo de Producto"
            CrearWindow(bTitulo);

            sessionStorage.setItem('TipoOperacion', $("#btnEditar").attr("TipoOperacion"));

            var grid = $("#kdGridSubGruposProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            $("#hidIdSubGrupo").val(selectedItem.IdProductoSubGrupo);
            $("#txtSubGrupo").data("kendoTextBox").value(selectedItem.ProductoSubGrupo);
            $("#ddlGrupo").data("kendoDropDownList").value(selectedItem.IdProductoGrupo);
        } else {
            CrearAlerta("¡Debe seleccionar un SubGrupo de Producto para modificar!", "Selección SubGrupo de Producto", "warning")
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
    var oProductosGrupos = new libProductosGrupos();

    $("#txtSubGrupo").kendoTextBox({
        label: {
            content: "SubGrupo de Producto",
            floating: true
        }
    });

    $("#ddlGrupo").kendoDropDownList({
        label: {
            content: "Grupo de Producto",
            floating: true
        },
        optionLabel: "Seleccione un Grupo de Producto",
        dataTextField: "ProductoGrupo",
        dataValueField: "IdProductoGrupo",
        dataSource: {
            transport: {
                read: function (options) {
                    oProductosGrupos.ListarProductosGruposCombo(function (result) {
                        options.success(result.ListProductosGrupos)
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
    var grid = $("#kdGridSubGruposProductos").data("kendoGrid");
    var selectedItem = grid.select();

    if (selectedItem.length > 0) {
        return true;
    } else {
        return false;
    }
}

function Guardar() {
    var oProductosSubGrupos = new libProductosSubGrupos();
    var TipoOperacion = sessionStorage.getItem('TipoOperacion');

    if (TipoOperacion == 1) {
        oProductosSubGrupos.IdProductoGrupo = $("#ddlGrupo").data("kendoDropDownList").value();
        oProductosSubGrupos.ProductoSubGrupo = $("#txtSubGrupo").data("kendoTextBox").value();
        oProductosSubGrupos.GuardarProductosSubGruposGrid();
    } else if (TipoOperacion == 2) {
        oProductosSubGrupos.IdProductoSubGrupo = $("#hidIdSubGrupo").val();
        oProductosSubGrupos.IdProductoGrupo = $("#ddlGrupo").data("kendoDropDownList").value();
        oProductosSubGrupos.ProductoSubGrupo = $("#txtSubGrupo").data("kendoTextBox").value();
        oProductosSubGrupos.ActualizarProductosSubGruposGrid();
    }
}

async function Eliminar() {
    var bEliminar = await CrearAlertaConfirm("¿Esta Seguro Eliminar el SubGrupo de Producto?", "Eliminar SubGrupo de Producto", 'question');

    if (bEliminar == true) {
        if (ValidarSeleccion() == true) {
            var oProductosSubGrupos = new libProductosSubGrupos();
            var grid = $("#kdGridSubGruposProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            oProductosSubGrupos.IdProductoSubGrupo = selectedItem.IdProductoSubGrupo;
            oProductosSubGrupos.EliminarProductosSubGruposGrid();
        } else {
            CrearAlerta("¡Debe seleccionar un SubGrupo de Producto para eliminar!", "Selección SubGrupo de Producto", "warning")
        }
    }
}

function CerrarWindow() {
    $("#kdWindow").data("kendoWindow").close();
    $("#txtSubGrupo").val("");
    $("#ddlGrupo").val("");
    $("#hidIdSubGrupo").val("");
    $('#kdGridSubGruposProductos').data('kendoGrid').clearSelection();
}

function libProductosSubGrupos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoSubGrupo;
    var IdProductoGrupo;
    var ProductoSubGrupo;

    this.ListarProductosSubGruposGrid = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosSubGrupos/ListarProductosSubGruposGrid",
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

    this.GuardarProductosSubGruposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosSubGrupos/GuardarProductosSubGruposGrid",
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
                    $('#kdGridSubGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridSubGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridSubGruposProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridSubGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridSubGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridSubGruposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.ActualizarProductosSubGruposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosSubGrupos/ActualizarProductosSubGruposGrid",
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
                    $('#kdGridSubGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridSubGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridSubGruposProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridSubGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridSubGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridSubGruposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.EliminarProductosSubGruposGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "ProductosSubGrupos/EliminarProductosSubGruposGrid",
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
                    $('#kdGridSubGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridSubGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridSubGruposProductos').data('kendoGrid').clearSelection();
                } else {
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridSubGruposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridSubGruposProductos').data('kendoGrid').refresh();
                    $('#kdGridSubGruposProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }
}

function libProductosGrupos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoGrupo;
    var ProductoGrupo;
    var Descripcion;


    this.ListarProductosGruposCombo = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosGrupos/ListarProductosGruposCombo",
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