$(document).ready(function () {
    var grd = $("#kdGridProductos");
    var oProductos = new libProductos();

    var dataSourceGrid = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {
                oProductos.ListarProductosGrid(function (result) {
                    options.success(result.ListProductos)
                }, function (e) {
                    options.error();
                });
            }
        },
        schema: {
            model: {
                id: "IdProducto",
                fields: {
                    IdProductoTipo: { type: "number" },
                    IdProductoSubTipo: { type: "number" },
                    IdProductoGrupo: { type: "number" },
                    IdProductoSubGrupo: { type: "number" },
                    Producto: { type: "string" },
                    Descripcion: { type: "string" },
                    Marca: { type: "string" },
                    ProductoTipo: { type: "string" },
                    ProductoSubTipo: { type: "string" },
                    ProductoGrupo: { type: "string" },
                    ProductoSubGrupo: { type: "string" },
                }
            }
        },
        error: function (e) {
            CrearAlerta('¡Se genero un error al momento de obtener los datos de los Productos!', "Error", "Error");
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
            fileName: "ListaProductos.xlsx",
            allPages: true,
            filterable: true
        },
        columns: [
            {
                field: "Producto",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Producto"
            },
            {
                field: "Descripcion",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Descripcion"
            },
            {
                field: "Marca",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Marca"
            },
            {
                field: "ProductoTipo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "Tipo de Producto"
            },
            {
                field: "ProductoSubipo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                title: "SubTipo de Producto"
            },
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

    $(document).on('input', '#txtDescripcion', function (e) {
        $('.k-counter-container .k-counter-value').html($(e.target).val().length);
    });
});

function NuevoRegistro() {
    bTitulo = "Nuevo Producto"
    CrearWindow(bTitulo);

    sessionStorage.setItem('TipoOperacion', $("#btnNuevo").attr("TipoOperacion"));

    $("#hidIdProducto").val("");
    $("#txtProducto").val("");
    $("#txtDescripcion").val("");
    $("#txtMarca").val("");
    $("#dllProductoTipo").val("");
    $("#dllProductoSubTipo").val("");
    $("#dllProductoGrupo").val("");
    $("#dllProductoSubGrupo").val("");
}

async function EditarRegistro() {
    var bEditar = await CrearAlertaConfirm("¿Esta Seguro Editar el Producto?", "Editar Producto", 'question');

    if (bEditar == true) {
        if (ValidarSeleccion() == true) {
            bTitulo = "Editar Producto"
            CrearWindow(bTitulo);

            sessionStorage.setItem('TipoOperacion', $("#btnEditar").attr("TipoOperacion"));

            var grid = $("#kdGridProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            var Contador = selectedItem.Descripcion.length;

            $("#hidIdProducto").val(selectedItem.IdProducto);
            $("#txtProducto").data("kendoTextBox").value(selectedItem.Producto);
            $("#txtDescripcion").data("kendoTextArea").value(selectedItem.Descripcion);
            $("#txtDescripcion").data("kendoTextArea").floatingLabel.refresh();
            $(".k-counter-value").html(Contador);
            $("#txtMarca").data("kendoTextBox").value(selectedItem.Marca);
            $("#dllProductoTipo").data("kendoDropDownList").value(selectedItem.IdProductoTipo);
            $("#dllProductoSubTipo").data("kendoDropDownList").value(selectedItem.IdProductoSubTipo);
            $("#dllProductoGrupo").data("kendoDropDownList").value(selectedItem.IdProductoGrupo);
            $("#dllProductoSubGrupo").data("kendoDropDownList").value(selectedItem.IdProductoSubGrupo);
        } else {
            CrearAlerta("¡Debe seleccionar un Producto para modificar!", "Selección de Producto", "warning")
        }
    }
}

function CrearWindow(bTitulo) {
    $("#kdWindow").kendoWindow({
        width: "700px",
        height: "525px",
        actions: ["Close"],
        resizable: false
    }).data("kendoWindow").open().center().title(bTitulo).content(kendo.template($("#ControlesWindowTemplate").html()));

    CrearControlesWindow();
}

function CrearControlesWindow() {
    var oProductosTipos = new libProductosTipos();
    var oProductosSubTipos = new libProductosSubTipos();
    var oProductosGrupos = new libProductosGrupos();
    var oProductosSubGrupos = new libProductosSubGrupos();

    $("#txtProducto").kendoTextBox({
        label: {
            content: "Producto",
            floating: true
        }
    });

    $("#txtDescripcion").kendoTextArea({
        label: {
            content: "Descripción",
            floating: true
        },
        rows: 5,
        maxLength: 500
    });

    $("#txtMarca").kendoTextBox({
        label: {
            content: "Marca",
            floating: true
        }
    });

    $("#dllProductoTipo").kendoDropDownList({
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

    $("#dllProductoSubTipo").kendoDropDownList({
        label: {
            content: "SubTipo de Producto",
            floating: true
        },
        optionLabel: "Seleccione un SubTipo de Producto",
        dataTextField: "ProductoSubTipo",
        dataValueField: "IdProductoSubTipo",
        dataSource: {
            transport: {
                read: function (options) {
                    oProductosSubTipos.ListarProductosSubTiposCombo(function (result) {
                        options.success(result.ListProductosSubTipos)
                    }, function (e) {
                        options.error();
                    });
                }
            }
        }
    });

    $("#dllProductoGrupo").kendoDropDownList({
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

    $("#dllProductoSubGrupo").kendoDropDownList({
        label: {
            content: "SubGrupo de Producto",
            floating: true
        },
        optionLabel: "Seleccione un SubGrupo de Producto",
        dataTextField: "ProductoSubGrupo",
        dataValueField: "IdProductoSubGrupo",
        dataSource: {
            transport: {
                read: function (options) {
                    oProductosSubGrupos.ListarProductosSubGruposCombo(function (result) {
                        options.success(result.ListProductosSubGrupos)
                    }, function (e) {
                        options.error();
                    });
                }
            }
        }
    });

    /* $(".k-input").attr("readonly", "readonly");*/
}

function ValidarSeleccion() {
    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedItem = grid.select();

    if (selectedItem.length > 0) {
        return true;
    } else {
        return false;
    }
}

function Guardar() {
    var oProductos = new libProductos();
    var TipoOperacion = sessionStorage.getItem('TipoOperacion');

    if (TipoOperacion == 1) {
        oProductos.Producto = $("#txtProducto").data("kendoTextBox").value();
        oProductos.Descripcion = $("#txtDescripcion").data("kendoTextArea").value();
        oProductos.Marca = $("#txtMarca").data("kendoTextBox").value();
        oProductos.IdProductoTipo = $("#dllProductoTipo").data("kendoDropDownList").value();
        oProductos.IdProductoSubTipo = $("#dllProductoSubTipo").data("kendoDropDownList").value();
        oProductos.IdProductoGrupo = $("#dllProductoGrupo").data("kendoDropDownList").value();
        oProductos.IdProductoSubGrupo = $("#dllProductoSubGrupo").data("kendoDropDownList").value();
        oProductos.GuardarProductosGrid();
    } else if (TipoOperacion == 2) {
        oProductos.IdProducto = $("#hidIdProducto").val();
        oProductos.Producto = $("#txtProducto").data("kendoTextBox").value();
        oProductos.Descripcion = $("#txtDescripcion").data("kendoTextArea").value();
        oProductos.Marca = $("#txtMarca").data("kendoTextBox").value();
        oProductos.IdProductoTipo = $("#dllProductoTipo").data("kendoDropDownList").value();
        oProductos.IdProductoSubTipo = $("#dllProductoSubTipo").data("kendoDropDownList").value();
        oProductos.IdProductoGrupo = $("#dllProductoGrupo").data("kendoDropDownList").value();
        oProductos.IdProductoSubGrupo = $("#dllProductoSubGrupo").data("kendoDropDownList").value();
        oProductos.ActualizarProductosGrid();
    }
}

async function Eliminar() {
    var bEliminar = await CrearAlertaConfirm("¿Esta Seguro Eliminar el Producto?", "Eliminar Producto", 'question');

    if (bEliminar == true) {
        if (ValidarSeleccion() == true) {
            var oProductos = new libProductos();
            var grid = $("#kdGridProductos").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());

            oProductos.IdProducto = selectedItem.IdProducto;
            oProductos.EliminarProductosGrid();
        } else {
            CrearAlerta("¡Debe seleccionar un Producto para eliminar!", "Selección Producto", "warning")
        }
    }
}

function CerrarWindow() {
    $("#kdWindow").data("kendoWindow").close();
    $("#hidIdProducto").val("");
    $("#txtProducto").val("");
    $("#txtDescripcion").val("");
    $("#txtMarca").val("");
    $("#dllProductoTipo").val("");
    $("#dllProductoSubTipo").val("");
    $("#dllProductoGrupo").val("");
    $("#dllProductoSubGrupo").val("");
    $('#kdGridGruposProductos').data('kendoGrid').clearSelection();
}

function libProductos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProducto;
    var Descripcion;
    var Marca;
    var IdProductoTipo;
    var IdProductoSubTipo;
    var IdProductoGrupo;
    var IdProductoSubGrupo;

    this.ListarProductosGrid = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Productos/ListarProductosGrid",
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

    this.GuardarProductosGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "Productos/GuardarProductosGrid",
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
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.ActualizarProductosGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "Productos/ActualizarProductosGrid",
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
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
                } else {
                    CerrarWindow();
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

    this.EliminarProductosGrid = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "POST",
            url: UrlWebGeneral + "Productos/EliminarProductosGrid",
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
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
                } else {
                    CrearAlerta(result.Msg, "Error", "alert");
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
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

function libProductosSubTipos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoTipo;
    var ProductoTipo;
    var Descripcion;


    this.ListarProductosSubTiposCombo = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosSubTipos/ListarProductosSubTiposCombo",
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

function libProductosSubGrupos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoGrupo;
    var ProductoGrupo;
    var Descripcion;


    this.ListarProductosSubGruposCombo = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosSubGrupos/ListarProductosSubGruposCombo",
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