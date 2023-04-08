$(document).ready(function () {
    CrearGrid();
    CrearDataGrid();
    CrearControles();
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
                field: "Descripcion",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Descripción"
            },
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
    });




}



function CrearDataGrid() {
    var kdGridProductos = $("#kdGridProductos");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {



                var oNotiApp = new libProductos();
                oNotiApp.ListarConsultaProductosGrid(function (result) {
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

    this.ListarConsultaProductosGrid = function (fnResult, fnError) {
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Productos/ListarConsultaProductosGrid",
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
