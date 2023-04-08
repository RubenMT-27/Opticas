$(document).ready(function () {
    CrearGrid();
    CrearDataGrid();
    CrearControles();
    CrearControlesTraspaso();
});

function CrearGrid() {
    var kdGridProductos = $("#kdGridProductos");
    kdGridProductos.kendoGrid({
        scrollable: true,
        sortable: true,

        selectable: "multiple, row",
        pageable: true,
        toolbar: [ {
            template: '<a id="newItemButton"">Nuevo</a>'
        }, {
                template: '<a id="EditarItemButton"">Editar</a>'
            },
            {
                template: '<a id="EliminarItemButton"">Eliminar</a>'
            },
            {
                template: '<a id="TraspasoItemButton"">Traspasar Productos</a>'
            },
            "excel", "search"
        ],


        excel: {
            fileName: "Lista_Productos.xlsx",
            allPages: true,
            filterable: true
        },
        search: {
            fields: ["Marca", "Modelo", "Descripcion", "ProductoGrupo", "ProductoTipo", "Cantidad", "PrecioCompra2", "PrecioVenta2"]
        },
        resizable: true,
        filterable: true,
        columns: [
            {
                field: "ProductoGrupo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Grupo de Producto"
            },
            {
                field: "ProductoTipo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Tipo de Producto"
            },
            {
                field: "Marca",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Marca"
            },
            {
                field: "Modelo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Modelo"
            },
            {
                field: "Sucursal",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal"
            },
            
            {
                field: "Cantidad",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Cantidad de Productos"
            },
            
            {
                field: "PrecioCompra2",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Precio de Compra"
            },
            {
                field: "PrecioVenta2",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Precio de Venta"
            },
            {
                field: "Descripcion",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Descripción"
            },

            {
                field: "FechaAlta2",
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

        $('#TraspasoItemButton').kendoButton({
            icon: 'k-icon k-i-caret-double-alt-right k-button-icon',
            click: onTraspasoClick
        });
    });




}

//Abrir window nuevo registro
function onNewClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.show();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.hide();

    LimpiarControlesTraspaso();
    $("#kdWindow").data("kendoWindow").open().center();

}

//Abrir window Editar
function onEditClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdProducto = dataItem.IdProducto

        LimpiarControles();

        var kdTxtModelo = $("#kdTxtModelo").data("kendoTextBox");
        var kdTxtMarca = $("#kdTxtMarca").data("kendoTextBox");
        var kdDescripcion = $("#kdDescripcion").data("kendoTextBox");
        var kdDdlPrecioCompra = $("#kdDdlPrecioCompra").data("kendoNumericTextBox");
        var kdDdlPrecioVenta = $("#kdDdlPrecioVenta").data("kendoNumericTextBox");
        var kdDdlCantidad = $("#kdDdlCantidad").data("kendoNumericTextBox");
        var kdDdlProductoGrupo = $("#kdDdlProductoGrupo").data("kendoComboBox");
        var kdDdlProductoTipo = $("#kdDdlProductoTipo").data("kendoComboBox");

    

        kdTxtModelo.value(dataItem.Modelo);
        kdTxtMarca.value(dataItem.Marca);
        kdDescripcion.value(dataItem.Descripcion);
        kdDdlPrecioCompra.value(dataItem.PrecioCompra);
        kdDdlPrecioVenta.value(dataItem.PrecioVenta)
        kdDdlCantidad.value(dataItem.Cantidad)

        kdDdlProductoGrupo.select(function (dataItem2) {
            return dataItem2.ProductoGrupo === dataItem.ProductoGrupo;
        });

        setTimeout(() => {
            kdDdlProductoTipo.select(function (dataItem) {
                return dataItem.ProductoTipo === dataItem.ProductoTipo;
            });
        }, 500);

       


        $("#kdWindow").data("kendoWindow").open().center();
        $("#kdWindow").data("kendoWindow").title("Editar Producto");



    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar', '¡Seleccionar Elemento!', 'warning');
    }

}

function onEliminarClick() {
    var btnGuardar = $("#kdBtnGuardar");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizar");
    btnActualizar.show();
    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdProducto = dataItem.IdProducto

        Swal.fire({
            title: '¿Seguro de eliminar el producto?',
            text:'¡Se eliminarán los registros de todas las sucursales!',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                EliminarProducto();
            } else if (result.isDenied) {
                Swal.fire('¡El producto no fue eliminado!', '', 'info')
            }
        })

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para eliminar', '¡Seleccionar Elemento!', 'warning');
    }

}

function onTraspasoClick() {
   
    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdProductoExistencia = dataItem.IdProductoExistencia

        if (dataItem.IdSucursal === 1) {
            LimpiarControlesTraspaso();
            $("#kdWindowTraspaso").data("kendoWindow").open().center();

            var combobox = $("#kdDdlSucursalDestino").data("kendoComboBox");
            combobox.setDataSource(dataSourceKdComboSucursalesDestino);
            CargarDatosTraspaso();
        } else {
            CrearAlerta('Solo es posible realizar traspaso desde la BODEGA', '¡Traspaso Incorrecto!', 'info');
        }

       
               
            

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
        bsMsgBox('¡Se genero un error al momento de obtener los datos de las Solicitudes!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdSucursal: { type: "number" },
                Sucursal: { type: "string" },
            }
        }
    }
});
//Llenar Producto Tipo
var dataSourceKdComboTipo = new kendo.data.DataSource({
    transport: {
        read: function (options) {


            var kdDdlProductoGrupo = $("#kdDdlProductoGrupo").data('kendoComboBox').value();

            if (kdDdlProductoGrupo == "") {
            } else {

                var oSolicitudesTipos = new libProductosTipos();
                oSolicitudesTipos.IdProductoGrupo = kdDdlProductoGrupo
                oSolicitudesTipos.ListarProductosTiposCombo(function (result) {
                    options.success(result.ListProductosTipos);
                },
                    function (e) {
                        options.error();
                    });

            }
        }
    },
    error: function (e) {
        bsMsgBox('¡Se genero un error al momento de obtener los datos de las Solicitudes!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdSucursal: { type: "number" },
                Sucursal: { type: "string" },
            }
        }
    }
});


//vALIDAR cONTROLES

function ValidarControlesGuardar() {

    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        GuardarProducto();

    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }



}

function ValidarControlesActualizar() {

    var validator = $("#kdWindow").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        ActualizarProducto();
    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }
}

//Guardar - Eliminar - Actualizar

function GuardarProducto() {

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libProductos();
    oEmpleados.Modelo = $("#kdTxtModelo").data("kendoTextBox").value();
    oEmpleados.Marca = $("#kdTxtMarca").data("kendoTextBox").value();
    oEmpleados.Descripcion = $("#kdDescripcion").data("kendoTextBox").value();
    oEmpleados.IdProductoGrupo = $("#kdDdlProductoGrupo").data("kendoComboBox").value();
    oEmpleados.IdProductoTipo = $("#kdDdlProductoTipo").data("kendoComboBox").value();
    oEmpleados.PrecioCompra = $("#kdDdlPrecioCompra").data("kendoNumericTextBox").value();
    oEmpleados.PrecioVenta = $("#kdDdlPrecioVenta").data("kendoNumericTextBox").value();
    oEmpleados.Cantidad = $("#kdDdlCantidad").data("kendoNumericTextBox").value();
    oEmpleados.GuardarProducto();

}

function ActualizarProducto() {

    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdProducto = dataItem.IdProducto
    var IdProductoExistencia = dataItem.IdProductoExistencia;

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libProductos();

    oEmpleados.Modelo = $("#kdTxtModelo").data("kendoTextBox").value();
    oEmpleados.Marca = $("#kdTxtMarca").data("kendoTextBox").value();
    oEmpleados.Descripcion = $("#kdDescripcion").data("kendoTextBox").value();
    oEmpleados.IdProductoGrupo = $("#kdDdlProductoGrupo").data("kendoComboBox").value();
    oEmpleados.IdProductoTipo = $("#kdDdlProductoTipo").data("kendoComboBox").value();
    oEmpleados.PrecioCompra = $("#kdDdlPrecioCompra").data("kendoNumericTextBox").value();
    oEmpleados.PrecioVenta = $("#kdDdlPrecioVenta").data("kendoNumericTextBox").value();
    oEmpleados.Cantidad = $("#kdDdlCantidad").data("kendoNumericTextBox").value();
    oEmpleados.IdProductoExistencia = IdProductoExistencia;
    oEmpleados.IdProducto = IdProducto;
    oEmpleados.ActualizarProducto();

}

function EliminarProducto() {

    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdProducto = dataItem.IdProducto

    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libProductos();


    oEmpleados.IdProducto = IdProducto;
    oEmpleados.EliminarProducto();

}


function CrearDataGrid() {
    var kdGridProductos = $("#kdGridProductos");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {



                var oNotiApp = new libProductos();
                oNotiApp.ListarProductosGrid(function (result) {
                    options.success(result.ListProductos)
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de las Muestras!', "Error", "Error");
        },
        pageSize: 100,
        schema: {
            model: {
                fields: {
                    IdProductoTipo: { type: "number" },
                    IdProductoGrupo: { type: "number" },
                    IdProductoSubGrupo: { type: "number" },
                    Producto: { type: "string" },
                    Descripcion: { type: "string" },
                    Marca: { type: "string" },
                    Modelo: { type: "string" },
                    ProductoTipo: { type: "string" },
                    ProductoGrupo: { type: "string" },
                    Cantidad: { type: "number" },
                    PrecioCompra: { type: "number" },
                    PrecioVenta: { type: "number" },

                }
            }
        },
        dataSource: dataSource,
    });

    kdGridProductos.data("kendoGrid").setDataSource(dataSource);
}

function CrearControles() {

    var kdTxtModelo = $("#kdTxtModelo");
    var kdTxtMarca = $("#kdTxtMarca");
    var kdDdlProductoGrupo = $("#kdDdlProductoGrupo");
    var kdDdlProductoTipo = $("#kdDdlProductoTipo");
    var kdDescripcion = $("#kdDescripcion");
    var kdDdlPrecioCompra = $("#kdDdlPrecioCompra");
    var kdDdlPrecioVenta = $("#kdDdlPrecioVenta");
    var kdDdlCantidad = $("#kdDdlCantidad");
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
        height: "555px",
        actions: ["Maximize", "Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Registrar Nuevo Producto"
    });

    //Creacion de kdTxtModelo
    kdTxtModelo.kendoTextBox({
        label: {
            content: "Modelo",
            floating: true
        }
    });

    //Creacion de kdTxtMarca
    kdTxtMarca.kendoTextBox({
        label: {
            content: "Marca",
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

    //Crear Combo de Puesto (falata crear datasource)
    kdDdlProductoTipo.kendoComboBox({
        dataSource: dataSourceKdComboTipo,
        dataTextField: "ProductoTipo",
        dataValueField: "IdProductoTipo",
        clearButton: false,
        autoBind: true,
        cascadeFrom: "kdDdlProductoGrupo",
        filter: "contains",
        suggest: true,
        label: {
            content: "Tipo de Producto",
            floating: true
        },
    });

    var fabric2 = $("#kdDdlProductoTipo").data("kendoComboBox");
    fabric2.input.attr("readonly", true)

    
    //Creacion de kdTxtModelo
    kdDescripcion.kendoTextBox({
        label: {
            content: "Descripción",
            floating: true
        }
    });

    // create kdDdlPrecioCompra NumericTextBox from input HTML element
    kdDdlPrecioCompra.kendoNumericTextBox({
        label: "Precio Compra",
        format: "c",
        decimals: 3
    });

    // create kdDdlPrecioCompra NumericTextBox from input HTML element
    kdDdlPrecioVenta.kendoNumericTextBox({
        label: "Precio Venta",
        format: "c",
        decimals: 3
    });

    kdDdlCantidad.kendoNumericTextBox({
        label: "Cantidad de Producto"
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
    var IdProductoExistencia;

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

    this.GuardarProducto = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Productos/GuardarProductosGrid",
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
                        'Se registró correctamente el producto!',
                        'success'
                    )
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
                } else {
                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
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

    this.ActualizarProducto = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Productos/ActualizarProductosGrid",
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
                        'Se actualizó correctamente el producto!',
                        'success'
                    )
                    $('#kdGridProductos').data('kendoGrid').dataSource.read();
                    $('#kdGridProductos').data('kendoGrid').refresh();
                    $('#kdGridProductos').data('kendoGrid').clearSelection();
                } else {
                    var dialog = $("#kdWindow").data("kendoWindow");
                    dialog.close();
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

    this.EliminarProducto = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Productos/EliminarProductosGrid",
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
                        'Se eliminó correctamente el producto!',
                        'success'
                    )

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
    var IdProductoGrupo;


    this.ListarProductosTiposCombo = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTipos/ListarProductosTiposCombo",
            data: { 'sparam': sparam },
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


//Limpiar Controles
function LimpiarControles() {

    var kdTxtModelo = $("#kdTxtModelo");
    var kdTxtMarca = $("#kdTxtMarca");
    var kdDdlProductoGrupo = $("#kdDdlProductoGrupo");
    var kdDdlProductoTipo = $("#kdDdlProductoTipo");
    var kdDescripcion = $("#kdDescripcion");
    var kdDdlPrecioCompra = $("#kdDdlPrecioCompra");
    var kdDdlPrecioVenta = $("#kdDdlPrecioVenta");
    var kdDdlCantidad = $("#kdDdlCantidad");



    $("#kdDdlProductoTipo").data("kendoComboBox").select(-1);

    $("#kdDdlProductoTipo").data("kendoComboBox").text("");
    $("#kdDdlProductoTipo").data("kendoComboBox").value("");
    $("#kdDdlProductoTipo").data("kendoComboBox").dataSource.data([]);

    $("#kdDdlProductoTipo").data("kendoComboBox").select(-1);
    $("#kdDdlProductoGrupo").data("kendoComboBox").select(-1);

    $("#kdTxtModelo").data("kendoTextBox").value("")
    $("#kdTxtMarca").data("kendoTextBox").value("")
    $("#kdDescripcion").data("kendoTextBox").value("")
    $("#kdDdlPrecioCompra").data("kendoNumericTextBox").value("")
    $("#kdDdlPrecioVenta").data("kendoNumericTextBox").value("")
    $("#kdDdlCantidad").data("kendoNumericTextBox").value("")
   

}

function LimpiarControlesTraspaso() {

    var kdTxtProductoGrupo2 = $("#kdTxtProductoGrupo2");
    var kdTxtProductoTipo2 = $("#kdTxtProductoTipo2");
    var kdTxtMarca2 = $("#kdTxtMarca2");
    var kdTxtModelo2 = $("#kdTxtModelo2");
    var kdTxtSucursalOrigen = $("#kdTxtSucursalOrigen");
    var kdDdlSucursalDestino = $("#kdDdlSucursalDestino");
    var kdTxtCantidadOrigen = $("#kdTxtCantidadOrigen");
    var kdDdlCantidadDestino = $("#kdDdlCantidadDestino");



    $("#kdDdlSucursalDestino").data("kendoComboBox").select(-1);

    $("#kdDdlSucursalDestino").data("kendoComboBox").text("");
    $("#kdDdlSucursalDestino").data("kendoComboBox").value("");
    $("#kdDdlSucursalDestino").data("kendoComboBox").dataSource.data([]);

    $("#kdDdlSucursalDestino").data("kendoComboBox").select(-1);

    $("#kdTxtProductoGrupo2").data("kendoTextBox").value("")
    $("#kdTxtProductoTipo2").data("kendoTextBox").value("")
    $("#kdTxtMarca2").data("kendoTextBox").value("")
    $("#kdTxtModelo2").data("kendoTextBox").value("")
    $("#kdTxtSucursalOrigen").data("kendoTextBox").value("")
    $("#kdTxtCantidadOrigen").data("kendoTextBox").value("")
    $("#kdDdlCantidadDestino").data("kendoNumericTextBox").value("")


}

//Proceso Traspaso

//CrearControles
function CrearControlesTraspaso() {

    var kdTxtProductoGrupo2 = $("#kdTxtProductoGrupo2");
    var kdTxtProductoTipo2 = $("#kdTxtProductoTipo2");
    var kdTxtMarca2 = $("#kdTxtMarca2");
    var kdTxtModelo2 = $("#kdTxtModelo2");
    var kdTxtSucursalOrigen = $("#kdTxtSucursalOrigen");
    var kdDdlSucursalDestino = $("#kdDdlSucursalDestino");
    var kdTxtCantidadOrigen = $("#kdTxtCantidadOrigen");
    var kdDdlCantidadDestino = $("#kdDdlCantidadDestino");
    var kdBtnAgregar = $("#kdBtnAgregar");
    var kdWindowTraspaso = $("#kdWindowTraspaso");
    //Creación de Window para nuevo reistro
    kdWindowTraspaso.kendoWindow({
        visible: false,
        modal: true,
        position: {
            top: 100, // or "100px"
            left: "5%"
        },
        height: "480px",
        actions: ["Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Registrar Traspaso"
    });

    //Creacion de kdTxtProductoGrupo2f
    kdTxtProductoGrupo2.kendoTextBox({
        label: {
            content: "Grupo de Producto",
            floating: true
        }
    });

    //Creacion de kdTxtProductoTipo2
    kdTxtProductoTipo2.kendoTextBox({
        label: {
            content: "Tipo de Producto",
            floating: true
        }
    });

    //Creacion de kdTxtMarca2
    kdTxtMarca2.kendoTextBox({
        label: {
            content: "Marca",
            floating: true
        }
    });

    //Creacion de kdTxtModelo2
    kdTxtModelo2.kendoTextBox({
        label: {
            content: "Modelo",
            floating: true
        }
    });

    //Creacion de kdTxtSucursalOrigen
    kdTxtSucursalOrigen.kendoTextBox({
        label: {
            content: "Sucursal de Origen",
            floating: true
        }
    });

    //Crear boton kdBtnAgregar
    kdBtnAgregar.kendoButton({
        icon: "k-icon k-i-plus k-button-icon",
        themeColor: "primary",
        click: ValidarControlesAgregar
    });
   
    //Crear Combo de Puesto (falata crear datasource)
    kdDdlSucursalDestino.kendoComboBox({
        dataSource: dataSourceKdComboSucursalesDestino,
        dataTextField: "Sucursal",
        dataValueField: "IdSucursal",
        clearButton: false,
        autoBind: false,
        filter: "contains",
        label: {
            content: "Sucursal de Destino",
            floating: true
        },
    });

    var fabric2 = $("#kdDdlSucursalDestino").data("kendoComboBox");
    fabric2.input.attr("readonly", true)


    //Creacion de kdTxtCantidadOrigen
    kdTxtCantidadOrigen.kendoTextBox({
        label: {
            content: "Cantidad de Producto Origen",
            floating: true
        }
    });

    kdDdlCantidadDestino.kendoNumericTextBox({
        label: "Cantidad de Producto Destino",
        change: function () {
            var destino = this.value();
            var origen = $("#kdTxtCantidadOrigen").data("kendoTextBox").value();
            if (destino > origen) {

                CrearAlerta("¡La cantidad de productos a trasladar supera el limite existente en la sucursal!", "Verificar Cantidad de Productos", "info");
                $("#kdDdlCantidadDestino").data("kendoNumericTextBox").value("")
            }
        }
    });

  
}

//CargarDatos Traspaso

function CargarDatosTraspaso() {
  
        var grid = $("#kdGridProductos").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);

    var kdTxtProductoGrupo2 = $("#kdTxtProductoGrupo2").data("kendoTextBox");
    var kdTxtProductoTipo2 = $("#kdTxtProductoTipo2").data("kendoTextBox");
    var kdTxtMarca2 = $("#kdTxtMarca2").data("kendoTextBox");
    var kdTxtModelo2 = $("#kdTxtModelo2").data("kendoTextBox");
    var kdTxtSucursalOrigen = $("#kdTxtSucursalOrigen").data("kendoTextBox");
    var kdDdlSucursalDestino = $("#kdDdlSucursalDestino").data("kendoComboBox");
    var kdTxtCantidadOrigen = $("#kdTxtCantidadOrigen").data("kendoTextBox");
    var kdDdlCantidadDestino = $("#kdDdlCantidadDestino").data("kendoNumericTextBox");


    kdTxtProductoGrupo2.value(dataItem.ProductoGrupo);
    kdTxtProductoTipo2.value(dataItem.ProductoTipo);
    kdTxtMarca2.value(dataItem.Marca);
    kdTxtModelo2.value(dataItem.Modelo);
    kdTxtSucursalOrigen.value(dataItem.Sucursal)
    kdTxtCantidadOrigen.value(dataItem.Cantidad)
}

//vALIDAR cONTROLES

async function ValidarControlesAgregar() {

    var validator = $("#kdWindowTraspaso").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        var bEditar = await CrearAlertaConfirm("¡Se va a reducir producto de tu inventario!", "¿Seguro de agregar el traspaso?", "question");
        if (bEditar == true) {

            ValidarCantidades();
        }
        
    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }
}

//Validar Cantidades a trapsasr
function ValidarCantidades() {
    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdProductoExistencia = dataItem.IdProductoExistencia

    var oNotiApp = new libProductosExistencias();
    oNotiApp.Cantidad = $("#kdDdlCantidadDestino").data("kendoNumericTextBox").value();
    oNotiApp.IdProductoExistencia = IdProductoExistencia;
    oNotiApp.ValidarCantidades(function (result) {
        var resultado = result.bCantidades;
        if (resultado === true) {
            GuardarProductoTraspaso();
        } else {
            CrearAlerta("¡La cantidad de productos a trasladar supera el limite existente en la sucursal!", "Traspaso Incorrecto", "info");
        }
    },
        function (e) {
            options.error();
        });
}

//Agragar Traspaso

function GuardarProductoTraspaso() {
    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();
    var dataItem = grid.dataItem(selectedRows[0]);
    var IdProductoExistencia = dataItem.IdProductoExistencia
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
    var oEmpleados = new libProductosTraspasos();

    oEmpleados.IdProductoExistencia = IdProductoExistencia;
    oEmpleados.IdSucursalDestino = $("#kdDdlSucursalDestino").data("kendoComboBox").value();
    oEmpleados.CantidadTraspaso = $("#kdDdlCantidadDestino").data("kendoNumericTextBox").value();
    oEmpleados.EmpleadoRegistra = sessionStorage.getItem('Usuario');
    oEmpleados.GuardarProductoTraspaso();

}



//Llenar Sucursales Destino
var dataSourceKdComboSucursalesDestino = new kendo.data.DataSource({
    transport: {
        read: function (options) {

            var grid = $("#kdGridProductos").data("kendoGrid");
            var selectedRows = grid.select();

            if (selectedRows.length > 0) {
                var dataItem = grid.dataItem(selectedRows[0]);
                var IdSucursal = dataItem.IdSucursal;

                var oSolicitudesTipos = new libSucursales();
                oSolicitudesTipos.IdSucursal = IdSucursal;
                oSolicitudesTipos.GetListSucursalesComboTraspaso(function (result) {
                    options.success(result.ListMuestras);
                },
                    function (e) {
                        options.error();
                    });

            }

               

         
        }
    },
    error: function (e) {
        bsMsgBox('¡Se genero un error al momento de obtener los datos de las Solicitudes!', "Error", "Error");
    },
    schema: {
        model: {
            fields: {
                IdSucursal: { type: "number" },
                Sucursal: { type: "string" },
            }
        }
    }
});


//Librerias

function libSucursales() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdSucursal;
    this.GetListSucursalesComboTraspaso = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Sucursales/GetListSucursalesComboTraspaso",
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

function libProductosExistencias() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoExistencia;
    var Cantidad;

    this.ValidarCantidades = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosExistencias/ValidarCantidades",
            data: { 'sparam': sparam },
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


function libProductosTraspasos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProductoExistencia;
    var IdSucursalDestino;
    var CantidadTraspaso;
    var EmpleadoRegistra;


  
    this.GuardarProductoTraspaso = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/GuardarProductosTraspasos",
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
                        'Se agregó correctamente el traspaso del producto!',
                        'success'
                    )

                        $("#kdGridProductos").data("kendoGrid").dataSource.read();
                    var dialog = $("#kdWindowTraspaso").data("kendoWindow");
                    dialog.close();
                } else {
                    var dialog = $("#kdWindowTraspaso").data("kendoWindow");
                    dialog.close();
                    CrearAlerta(result.Msg, "Error", "alert");
                   
                }
            },
            error: function () {
                CrearAlerta("¡Se genero un error de conectividad con el servidor!", "Error", "error");
            }
        });
    }

}