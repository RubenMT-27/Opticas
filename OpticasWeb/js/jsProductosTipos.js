$(document).ready(function () {
    CrearGrid();
    CrearDataGrid();
    CrearControles();
});

function CrearGrid() {
    var kdGridTiposProductos = $("#kdGridTiposProductos");
    kdGridTiposProductos.kendoGrid({
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
            "excel", "search"
        ],


        excel: {
            fileName: "Lista_Tipos_Productos.xlsx",
            allPages: true,
            filterable: true
        },
        search: {
            fields: ["ProductoTipo", "ProductoGrupo", "Descripcion"]
        },
        resizable: true,
        filterable: true,
        columns: [

            {
                field: "ProductoTipo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Tipo de Producto"
            },
            {
                field: "ProductoGrupo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Grupo de Producto"
            },
            {
                field: "Descripcion",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Descripción"
            },
           
            {
                field: "FechaAlta",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Fecha de Alta"
            },
        ]
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

//Abrir window nuevo registro
function onNewClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.show();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.hide();

    LimpiarControles();
    $("#kdWindow").data("kendoWindow").open().center();

}

//Abrir window Editar
function onEditClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#kdGridTiposProductos").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdProducto = dataItem.IdProducto

        LimpiarControles();

        var kdTxtProductoTipo = $("#kdTxtProductoTipo").data("kendoTextBox");
        var kdDescripcion = $("#kdDescripcion").data("kendoTextBox");
        var kdDdlProductoGrupo = $("#kdDdlProductoGrupo").data("kendoComboBox");



        kdTxtProductoTipo.value(dataItem.ProductoTipo);
        kdDescripcion.value(dataItem.Descripcion);

        kdDdlProductoGrupo.select(function (dataItem2) {
            return dataItem2.ProductoGrupo === dataItem.ProductoGrupo;
        });

      



        $("#kdWindow").data("kendoWindow").open().center();
        $("#kdWindow").data("kendoWindow").title("Editar Tipo de Producto");



    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar', '¡Seleccionar Elemento!', 'warning');
    }

}

function onEliminarClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#kdGridTiposProductos").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdProductoTipo = dataItem.IdProductoTipo

        Swal.fire({
            title: '¿Seguro de eliminar el tipo de producto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                EliminarProductoTipo();
            } else if (result.isDenied) {
                Swal.fire('¡El tipo de producto no fue eliminado!', '', 'info')
            }
        })

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para eliminar', '¡Seleccionar Elemento!', 'warning');
    }

}

//Llenar Combos

//Llenar Producto Grupo
var dataSourceKdComboGrupo = new kendo.data.DataSource({
    transport: {
        read: function (options) {
            var oSolicitudesTipos = new libProductosGrupos();

            oSolicitudesTipos.ListarProductosGruposCombo(function (result) {
                options.success(result.ListProductosGrupos);
            },
                function (e) {
                    options.error();
                });
        }
    },
    error: function (e) {
        bsMsgBox('¡Se genero un error al momento de obtener los datos de los grupos de productos!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdProductoGrupo: { type: "number" },
                ProductoGrupo: { type: "string" },
            }
        }
    }
});


//vALIDAR cONTROLES

function ValidarControlesGuardar() {

    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        GuardarProductoTipo();

    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }



}

function ValidarControlesActualizar() {

    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        ActualizarProductoTipo();
    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }
}

//Guardar - Eliminar - Actualizar

function GuardarProductoTipo() {

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libProductosTipos();
    oEmpleados.ProductoTipo = $("#kdTxtProductoTipo").data("kendoTextBox").value();
    oEmpleados.Descripcion = $("#kdDescripcion").data("kendoTextBox").value();
    oEmpleados.IdProductoGrupo = $("#kdDdlProductoGrupo").data("kendoComboBox").value();
    oEmpleados.GuardarProductoTipo();

}

function ActualizarProductoTipo() {

    var grid = $("#kdGridTiposProductos").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdProductoTipo = dataItem.IdProductoTipo

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libProductosTipos();

    oEmpleados.ProductoTipo = $("#kdTxtProductoTipo").data("kendoTextBox").value();
    oEmpleados.Descripcion = $("#kdDescripcion").data("kendoTextBox").value();
    oEmpleados.IdProductoGrupo = $("#kdDdlProductoGrupo").data("kendoComboBox").value();
    oEmpleados.IdProductoTipo = IdProductoTipo;
    oEmpleados.ActualizarProductoTipo();

}

function EliminarProductoTipo() {

    var grid = $("#kdGridTiposProductos").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdProductoTipo = dataItem.IdProductoTipo

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libProductosTipos();


    oEmpleados.IdProductoTipo = IdProductoTipo;
    oEmpleados.EliminarProductoTipo();

}

function CrearDataGrid() {
    var kdGridTiposProductos = $("#kdGridTiposProductos");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {



                var oNotiApp = new libProductosTipos();
                oNotiApp.ListarProductosTiposGrid(function (result) {
                    options.success(result.ListProductosTipos)
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de los tipos de productos!', "Error", "Error");
        },
        pageSize: 100,
        schema: {
            model: {
                fields: {
                    IdProductoTipo: { type: "number" },
                    IdProductoGrupo: { type: "number" },
                    Descripcion: { type: "string" },
                    ProductoTipo: { type: "string" },
                    ProductoGrupo: { type: "string" }

                }
            }
        },
        dataSource: dataSource,
    });

    kdGridTiposProductos.data("kendoGrid").setDataSource(dataSource);
}

function CrearControles() {

    var kdTxtProductoTipo = $("#kdTxtProductoTipo");
    var kdDdlProductoGrupo = $("#kdDdlProductoGrupo");
    var kdDescripcion = $("#kdDescripcion");
    var btnGuardar = $("#kdBtnGuardar");
    var btnActualizar = $("#kdBtnActualizar");
    var kdWindow = $("#kdWindow");
    //Creación de Window para nuevo reistro
    kdWindow.kendoWindow({
        visible: false,
        modal: true,
        position: {
            top: 100, // or "100px"
            left: "5%"
        },
        height: "470px",
        actions: ["Maximize", "Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Registrar Nuevo Tipo de Producto"
    });

    //Creacion de kdTxtModelo
    kdTxtProductoTipo.kendoTextBox({
        label: {
            content: "Tipo de Producto",
            floating: true
        }
    });

    

    //Crear Combo de kdDdlProductoGrupo (falata crear datasource)
    kdDdlProductoGrupo.kendoComboBox({
        dataSource: dataSourceKdComboGrupo,
        dataTextField: "ProductoGrupo",
        dataValueField: "IdProductoGrupo",
        clearButton: false,
        filter: "contains",
        suggest: true,

        label: {
            content: "Grupo de Producto",
            floating: true
        },
    });

    var fabric = $("#kdDdlProductoGrupo").data("kendoComboBox");
    fabric.input.attr("readonly", true)

    //Creacion de kdDescripcion
    kdDescripcion.kendoTextBox({
        label: {
            content: "Descripción",
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

function libProductosTipos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProducto;
    var Descripcion;
    var Marca;
    var IdProductoTipo;
    var IdProductoSubTipo;
    var IdProductoGrupo;
    var IdProductoSubGrupo;

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

    this.GuardarProductoTipo = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTipos/GuardarProductosTiposGrid",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Registro Correcto!',
                        'Se registró correctamente el tipo de producto!',
                        'success'
                    )
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                } else {
                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
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

    this.ActualizarProductoTipo = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTipos/ActualizarProductosTiposGrid",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Actualización Correcta!',
                        'Se actualizó correctamente el tipo de producto!',
                        'success'
                    )
                    $('#kdGridTiposProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridTiposProductos').data('kendoGrid').refresh();
                    $('#kdGridTiposProductos').data('kendoGrid').clearSelection();
                } else {
                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
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

    this.EliminarProductoTipo = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTipos/EliminarProductosTiposGrid",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {

                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Eliminación Correcta!',
                        'Se eliminó correctamente el tipo de producto!',
                        'success'
                    )

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


//Limpiar Controles
function LimpiarControles() {

 
    $("#kdDdlProductoGrupo").data("kendoComboBox").select(-1);

    $("#kdTxtProductoTipo").data("kendoTextBox").value("")
    $("#kdDescripcion").data("kendoTextBox").value("")


}