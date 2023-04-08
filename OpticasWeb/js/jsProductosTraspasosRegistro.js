$(document).ready(function () {

    CrearGrid();
    CrearDataGrid();
    CrearGridSalidas();
    CrearDataGridSalidas();
    CrearGridEntradas();
    CrearDataGridEntradas();
    CrearGridSeguimiento();
    CrearDataGridSeguimiento();
    CrearControlesTraspaso();
    CrearControlesSalidas();
    CrearControlesRechazo();
    CrearTabStrip();
});


//--------------------------TAB REGISTRO-----------------------------------

//Crear Controles
function CrearTabStrip() {
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                duration: 500,
                effects: "fadeIn"
            }
        }
    }).show();
}

function CrearGrid() {
    var kdGridProductos = $("#kdGridProductos");
    kdGridProductos.kendoGrid({
        scrollable: true,
        sortable: true,

        selectable: "multiple, row",
        pageable: true,
        toolbar: [ 
            {
                template: '<a id="TraspasoItemButton"">Traspasar Productos</a>'
            },
             "search"
        ],


        search: {
            fields: ["Marca", "Modelo", "Descripcion", "ProductoGrupo", "ProductoTipo", "Cantidad"]
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
       

        $('#TraspasoItemButton').kendoButton({
            icon: 'k-icon k-i-caret-double-alt-right k-button-icon',
            click: onTraspasoClick
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
                oNotiApp.EmpleadoUsuario = sessionStorage.getItem('Usuario');
                oNotiApp.ListarProductosTraspasosGrid(function (result) {
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
        pageSize: 10,
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

function CrearControlesSalidas() {

   
    var kdDdlRepartidores = $("#kdDdlRepartidores");
    var kdBtnEnviar = $("#kdBtnEnviar");
    var kdWindowRepartidor = $("#kdWindowRepartidor");
    //Creación de Window para nuevo reistro
    kdWindowRepartidor.kendoWindow({
        visible: false,
        modal: true,
        width: 400,
        position: {
            top: 100, // or "100px"
            left: "5%"
        },
        actions: ["Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Enviar Traspaso(s)"
    });

   
    //Crear boton kdBtnEnviar
    kdBtnEnviar.kendoButton({
        icon: "k-icon k-i-caret-double-alt-right k-button-icon",
        themeColor: "primary",
        click: EnviarTraspasos
    });

    //Crear Combo de Puesto (falata crear datasource)
    kdDdlRepartidores.kendoComboBox({
        dataSource: dataSourceKdRepartidores,
        dataTextField: "Empleado",
        dataValueField: "IdEmpleado",
        clearButton: false,
        autoBind: false,
        filter: "contains",
        label: {
            content: "Repartidor",
            floating: true
        },
    });

    var fabric2 = $("#kdDdlRepartidores").data("kendoComboBox");
    fabric2.input.attr("readonly", true)


}

function CrearControlesRechazo() {


    var kdDdlRepartidoresRechazo = $("#kdDdlRepartidoresRechazo");
    var kdBtnRechazar = $("#kdBtnRechazar");
    var kdWindowMotivoRechazo = $("#kdWindowMotivoRechazo");
    var kdDescripcion = $("#kdDescripcion");
    //Creación de Window para nuevo reistro
    kdWindowMotivoRechazo.kendoWindow({
        visible: false,
        modal: true,
        width: 400,
        position: {
            top: 100, // or "100px"
            left: "5%"
        },
        actions: ["Close"],
        animation: {
            close: {
                effects: "fade:out"
            }
        },
        title: "Rechazar Traspaso(s)"
    });

    //Creacion de kdDescripcion
    kdDescripcion.kendoTextBox({
        label: {
            content: "Motivo Rechazo",
            floating: true
        }
    });

    //Crear boton kdBtnEnviar
    kdBtnRechazar.kendoButton({
        icon: "k-icon k-i-caret-double-alt-right k-button-icon",
        themeColor: "primary",
        click: RechazarTraspasos
    });

    //Crear Combo de Puesto (falata crear datasource)
    kdDdlRepartidoresRechazo.kendoComboBox({
        dataSource: dataSourceKdRepartidores,
        dataTextField: "Empleado",
        dataValueField: "IdEmpleado",
        clearButton: false,
        autoBind: false,
        filter: "contains",
        label: {
            content: "Repartidor",
            floating: true
        },
    });

    var fabric2 = $("#kdDdlRepartidoresRechazo").data("kendoComboBox");
    fabric2.input.attr("readonly", true)


}

//Click botones toolbar

function onTraspasoClick() {
   
    var grid = $("#kdGridProductos").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdProductoExistencia = dataItem.IdProductoExistencia

            LimpiarControlesTraspaso();
            $("#kdWindowTraspaso").data("kendoWindow").open().center();

            var combobox = $("#kdDdlSucursalDestino").data("kendoComboBox");
            combobox.setDataSource(dataSourceKdComboSucursalesDestino);
            CargarDatosTraspaso();
    

       
               
            

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para realizar el traspaso', '¡Seleccionar Elemento!', 'warning');
    }

}

function EnviarTraspasos() {
    var validator = $("#kdWindowRepartidor").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        var grid = $("#kdGridProductosSalidas").data("kendoGrid");
        var selectedRows = grid.select();
        var selectedRowsCount;
          var n=0;
            for (var i = 0; i < selectedRows.length; i++) {

                var dataItem = grid.dataItem(selectedRows[i]);

                var IdProductoTraspaso = dataItem.IdProductoTrasapaso

                var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
                var oEmpleados = new libProductosTraspasos();


                oEmpleados.IdProductoTrasapaso = IdProductoTraspaso;
                oEmpleados.IdProductoTraspasoStatus = $("#kdDdlRepartidores").data("kendoComboBox").value();
                oEmpleados.EmpleadoEnvia = sessionStorage.getItem('Usuario');
                oEmpleados.EnviarTraspaso();
                selectedRowsCount = selectedRows.length-1
                if (i === selectedRowsCount) {
                    var dialog = $("#kdWindowRepartidor").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Envío Correcto!',
                        'Se enviaron correctamente los productos!',
                        'success'
                    )

                    $("#kdGridProductosSalidas").data("kendoGrid").dataSource.read();
                    $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();
                }

                n += i;
            }
       

    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }
}


//Limpiar Controles

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


//CargarDatos

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

//Validaciones

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

//Llenar Sucursales Destino
var dataSourceKdRepartidores = new kendo.data.DataSource({
    transport: {
        read: function (options) {

                var oSolicitudesTipos = new libRepartidores();
                oSolicitudesTipos.GetListRepartidores(function (result) {
                    options.success(result.ListRepartidores);
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

function libRepartidores() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdSucursal;
    this.GetListRepartidores = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Repartidores/GetListRepartidoresComboTraspaso",
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
    var IdProducto;
    var IdSucursal;
    var EmpleadoRecibe;
    var IdProductoTrasapaso;

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

    this.ValidarExistenciaProducto = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosExistencias/ValidarExistenciaProducto",
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

function libProductos() {
    var UrlWebGeneral = "http://localhost:44543/api/";
    var token = sessionStorage.getItem('token');
    var IdProducto;
    var EmpleadoUsuario;

    this.ListarProductosTraspasosGrid = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Productos/ListarProductosTraspasosGrid",
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
    var EmpleadoEnvia;
    var EmpleadoRepartidor;
    var EmpleadoRecibe;
    var EmpleadoRechaza;
    var MotivoRechazo;


  
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
                    
                    Swal.fire(
                        'Registro Correcto!',
                        'Se agregó correctamente el traspaso del producto!',
                        'success'
                    )

                    $("#kdGridProductos").data("kendoGrid").dataSource.read();
                    $("#kdGridProductosSalidas").data("kendoGrid").dataSource.read();
                    $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();
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

    this.EnviarTraspaso = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/EnviarTraspasos",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {

                  
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

    this.RechazarTraspaso = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/RechazarTraspasos",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {


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

    this.AprobarTraspasoNuevo = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/AprobarTraspasosNuevo",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                 

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

    this.AprobarTraspasoActualizar = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/AprobarTraspasosActualizar",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {
                    

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
    

    this.CancelarTraspaso = function () {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/CancelarTraspasos",
            data: { 'sparam': sparam },
            headers: { 'Authorization': 'Bearer ' + token },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () { },
            complete: function () { },
            success: function (result) {
                if (!result.bError) {


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

    this.ListarProductosTraspasosSalidasGrid = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/ListarProductosTraspasosSalidasGrid",
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

    this.ListarProductosTraspasosEntradasGrid = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/ListarProductosTraspasosEntradasGrid",
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

    this.ListarProductosTraspasosSeguimientoGrid = function (fnResult, fnError) {
        sparam = JSON.stringify(this);
        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "ProductosTraspasos/ListarProductosTraspasosSeguimientoGrid",
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


//--------------------------TAB SALIDAS-----------------------------------

function CrearGridSalidas() {
    var kdGridProductos = $("#kdGridProductosSalidas");
    kdGridProductos.kendoGrid({
        scrollable: true,
        sortable: true,

        selectable: "multiple, row",
        pageable: true,
        toolbar: [
            {
                template: '<a id="EnviarItemButton"">Enviar</a>'
            },
            {
                template: '<a id="CancelarItemButton"">Cancelar</a>'
            },
            "search"
        ],


        search: {
            fields: ["Marca", "Modelo", "Descripcion", "ProductoGrupo", "ProductoTipo", "SucursalOrigen","SucursalDestino","CantidadTraspaso"]
        },
        resizable: true,
        filterable: true,
        persistSelection: true,
        columns: [
            { selectable: true, width: "50px" },
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
                field: "SucursalOrigen",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal de Origen"
            },

            {
                field: "SucursalDestino",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal de Destino"
            },
            {
                field: "CantidadTraspaso",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Cantidad a Traspasar"
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


        $('#EnviarItemButton').kendoButton({
            icon: 'k-icon k-i-map-marker-target k-button-icon',
            click: onEnviarClick
        });

        $('#CancelarItemButton').kendoButton({
            icon: 'k-icon k-i-cancel k-button-icon',
            click: onCancelarClick
        });
    });




}

function CrearDataGridSalidas() {
    var kdGridProductosSalidas = $("#kdGridProductosSalidas");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {



                var oNotiApp = new libProductosTraspasos();
                oNotiApp.EmpleadoRegistra = sessionStorage.getItem('Usuario');
                oNotiApp.ListarProductosTraspasosSalidasGrid(function (result) {
                    options.success(result.ListTraspasos)
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de las Muestras!', "Error", "Error");
        },
        pageSize: 10,
        schema: {
            model: {
                fields: {
                    IdProductoTrasapaso: { type: "number" },
                    IdProductoTipo: { type: "number" },
                    IdProductoGrupo: { type: "number" },
                    IdProductoSubGrupo: { type: "number" },
                    Producto: { type: "string" },
                    Marca: { type: "string" },
                    Modelo: { type: "string" },
                    ProductoTipo: { type: "string" },
                    ProductoGrupo: { type: "string" },
                    CantidadTraspaso: { type: "number" },
                    SucursalOrigen: { type: "string" },
                    SucursalDestino: { type: "string" },
                    EmpleadoEnvia: { type: "string" }

                }
            }
        },
        dataSource: dataSource,
    });

    kdGridProductosSalidas.data("kendoGrid").setDataSource(dataSource);
}

//Click botones toolbar GRID

async function onEnviarClick() {

    var grid = $("#kdGridProductosSalidas").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var bEditar = await CrearAlertaConfirm("¿Estas suguro de enviar los productos seleccionados?", "Envío de Productos", "question");
        if (bEditar == true) {

            $("#kdDdlRepartidores").data("kendoComboBox").select(-1);
            $("#kdWindowRepartidor").data("kendoWindow").open().center();
          
          
        }

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para realizar el traspaso', '¡Seleccionar Elemento!', 'warning');
    }

}

function onEditarClick() {

    var grid = $("#kdGridProductosSalidas").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var dataItem = grid.dataItem(selectedRows[0]);
        var IdProductoExistencia = dataItem.IdProductoExistencia





    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar el traspaso', '¡Seleccionar Elemento!', 'warning');
    }
}

async function onCancelarClick() {

    var grid = $("#kdGridProductosSalidas").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var bEditar = await CrearAlertaConfirm("¿Estas suguro de cancelar los productos seleccionados?", "Canelación de Productos", "question");
        if (bEditar == true) {

            var grid = $("#kdGridProductosSalidas").data("kendoGrid");
            var selectedRows = grid.select();
            var selectedRowsCount;
            var n = 0;
            for (var i = 0; i < selectedRows.length; i++) {

                var dataItem = grid.dataItem(selectedRows[i]);

                var IdProductoTraspaso = dataItem.IdProductoTrasapaso

                var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
                var oEmpleados = new libProductosTraspasos();


                oEmpleados.IdProductoTrasapaso = IdProductoTraspaso;
                oEmpleados.CancelarTraspaso();
                selectedRowsCount = selectedRows.length - 1
                if (i === selectedRowsCount) {
                    var dialog = $("#kdWindowRepartidor").data("kendoWindow");
                    dialog.close();

                    if (selectedRows.length === 1) {
                        Swal.fire(
                            '¡Cancelación Correcta!',
                            '¡Se canceló correctamente la solicitud de traslado!',
                            'success'
                        )
                    }
                    else {
                        Swal.fire(
                            '¡Cancelación Correcta!',
                            '¡Se cancelaron correctamente las solicitudes de traslado!',
                            'success'
                        )
                    }

                    $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();
                    $("#kdGridProductosSalidas").data("kendoGrid").dataSource.read();
                    $("#kdGridProductos").data("kendoGrid").dataSource.read();
                }

                n += i;
            }


        }

       

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para realizar la cancelación del traspaso', '¡Seleccionar Elemento!', 'warning');
    }

}


//--------------------------TAB ENTRADAS-------------------------------

function CrearGridEntradas() {
    var kdGridProductosEntradas = $("#kdGridProductosEntradas");
    kdGridProductosEntradas.kendoGrid({
        scrollable: true,
        sortable: true,

        selectable: "multiple, row",
        pageable: true,
        toolbar: [
            {
                template: '<a id="AprobarItemButton"">Aprobar</a>'
            },
            {
                template: '<a id="RechazarItemButton"">Rechazar</a>'
            },
            
            "search"
        ],


        search: {
            fields: ["Marca", "Modelo", "Descripcion", "ProductoGrupo", "ProductoTipo", "SucursalOrigen", "SucursalDestino", "CantidadTraspaso", "EmpleadoEnvia", "EmpleadoRepartidor"]
        },
        resizable: true,
        filterable: true,
        persistSelection: true,
        columns: [
            { selectable: true, width: "50px" },
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
                field: "ProductoTraspasoStatus",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Status"
            },
            {
                field: "CantidadTraspaso",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Cantidad a Recibir"
            },
            {
                field: "SucursalOrigen",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal Envia"
            },

            {
                field: "SucursalDestino",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal Recibe"
            },
            {
                field: "EmpleadoEnvia",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Empleado Envía"
            },
            {
                field: "EmpleadoRepartidor",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Empleado Repartidor"
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


        $('#AprobarItemButton').kendoButton({
            icon: 'k-icon k-i-check k-button-icon',
            click: onAprobarClick
        });
        $('#RechazarItemButton').kendoButton({
            icon: 'k-icon k-i-cancel k-button-icon',
            click: onRechazarClick
        });
    });




}

function CrearDataGridEntradas() {
    var kdGridProductosEntradas = $("#kdGridProductosEntradas");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {



                var oNotiApp = new libProductosTraspasos();
                oNotiApp.EmpleadoRecibe = sessionStorage.getItem('Usuario');
                oNotiApp.ListarProductosTraspasosEntradasGrid(function (result) {
                    options.success(result.ListTraspasos)
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de las Muestras!', "Error", "Error");
        },
        pageSize: 10,
        schema: {
            model: {
                fields: {
                    IdProductoTrasapaso: { type: "number" },
                    IdProductoTipo: { type: "number" },
                    IdProductoGrupo: { type: "number" },
                    IdProductoSubGrupo: { type: "number" },
                    Producto: { type: "string" },
                    Marca: { type: "string" },
                    Modelo: { type: "string" },
                    ProductoTipo: { type: "string" },
                    ProductoGrupo: { type: "string" },
                    CantidadTraspaso: { type: "number" },
                    SucursalOrigen: { type: "string" },
                    SucursalDestino: { type: "string" },
                    EmpleadoEnvia: { type: "string" },
                    IdProductoTrasapasoStatus: { type: "number" },

                }
            }
        },
        dataSource: dataSource,
    });

    kdGridProductosEntradas.data("kendoGrid").setDataSource(dataSource);
}

async function onAprobarClick() {

    var grid = $("#kdGridProductosEntradas").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var bEditar = await CrearAlertaConfirm("¿Estás seguro de aprobar los productos seleccionados?", "Aprobación de Productos", "question");
        if (bEditar == true) {

         
              Ciclo(0)

              
            }
            $("#kdGridProductos").data("kendoGrid").dataSource.read();
        $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();

    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para aprobar el traspaso', '¡Seleccionar Elemento!', 'warning');
    }

}

function RechazarTraspasos() {
    var validator = $("#kdWindowMotivoRechazo").kendoValidator().data("kendoValidator");

    if (validator.validate()) {
        var r = 0;
        var grid = $("#kdGridProductosEntradas").data("kendoGrid");
        var selectedRows = grid.select();
        var selectedRowsCount;
        var n = 0;
        for (var i = 0; i < selectedRows.length; i++) {

            var dataItem = grid.dataItem(selectedRows[i]);

            var IdProductoTraspasoStatus = dataItem.IdProductoTraspasoStatus
            if (IdProductoTraspasoStatus === 6) {
                r=1
            }
           

            n += i;
        }

        if (r === 1) {
            CrearAlerta("No es posible realizar rechazar un traspaso con status ENVIADO POR RECHAZO", "Rechazo Incorrecto", "info");
            var dialog = $("#kdWindowMotivoRechazo").data("kendoWindow");
            dialog.close();
        }

        if (r === 0) {
            
            var selectedRowsCount;
            n = 0;
            for (var i = 0; i < selectedRows.length; i++) {

                var dataItem = grid.dataItem(selectedRows[i]);

                var IdProductoTraspaso = dataItem.IdProductoTrasapaso

                var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
                var oEmpleados = new libProductosTraspasos();


                oEmpleados.IdProductoTrasapaso = IdProductoTraspaso;
                oEmpleados.IdProductoTraspasoStatus = $("#kdDdlRepartidoresRechazo").data("kendoComboBox").value();
                oEmpleados.EmpleadoRechaza = sessionStorage.getItem('Usuario');
                oEmpleados.MotivoRechazo = $("#kdDescripcion").data("kendoTextBox").value();
                oEmpleados.RechazarTraspaso();
                selectedRowsCount = selectedRows.length - 1
                if (i === selectedRowsCount) {
                    var dialog = $("#kdWindowMotivoRechazo").data("kendoWindow");
                    dialog.close();
                    Swal.fire(
                        'Rechazo Correcto!',
                        'Se rechazaron correctamente los productos!',
                        'success'
                    )
                    $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();
                    $("#kdGridProductosEntradas").data("kendoGrid").dataSource.read();
                }

                n += i;

            }
        }

     
        




    } else {
        var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
        popupNotification.show(kendo.toString("Favor de llenar los campos faltantes", "info"));
    }
}

function Ciclo(x) {
    var grid = $("#kdGridProductosEntradas").data("kendoGrid");
    var selectedRows = grid.select();
    var selectedRowsCount;

    var dataItem = grid.dataItem(selectedRows[x]);
    var IdProductoTraspaso = dataItem.IdProductoTrasapaso


    var IdProducto = dataItem.IdProducto
    var IdSucursal = dataItem.IdSucursalDestino

    var oNotiApp = new libProductosExistencias();
    oNotiApp.IdProductoTrasapaso = IdProductoTraspaso;
    oNotiApp.EmpleadoRecibe = sessionStorage.getItem('Usuario');
    oNotiApp.IdSucursal = IdSucursal;
    oNotiApp.IdProducto = IdProducto;
    oNotiApp.ValidarExistenciaProducto(function (result) {
        var resultado = result.bExistencia;
        if (resultado === true) {

            //$("#kdGridProductosEntradas").data("kendoGrid").dataSource.read();
            $("#kdGridProductos").data("kendoGrid").dataSource.read();
            $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();


        } else {
            $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();
            //$("#kdGridProductosEntradas").data("kendoGrid").dataSource.read();
            $("#kdGridProductos").data("kendoGrid").dataSource.read();
        }
    },
        function (e) {
            options.error();
        });

    selectedRowsCount = selectedRows.length - 1
    if (x === selectedRowsCount) {

        if (selectedRows.length === 1) {
            Swal.fire(
                '¡Aprobación Correcta!',
                '¡Se aprobó correctamente la solicitud de traslado!',
                'success'
            )
            $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();
            $("#kdGridProductosEntradas").data("kendoGrid").dataSource.read();
            $("#kdGridProductos").data("kendoGrid").dataSource.read();
        }
        else {
            Swal.fire(
                '¡Aprobacióon Correcta!',
                '¡Se aprobaron correctamente las solicitudes de traslado!',
                'success'
            )
            $("#kdGridProductosSeguimiento").data("kendoGrid").dataSource.read();
            $("#kdGridProductosEntradas").data("kendoGrid").dataSource.read();
            $("#kdGridProductos").data("kendoGrid").dataSource.read();

        }



    }
    if (x < selectedRows.length-1) {
        setTimeout(() =>
            Ciclo(x + 1), 500);
           
    }
}


async function onRechazarClick() {

    var grid = $("#kdGridProductosEntradas").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {

        var bEditar = await CrearAlertaConfirm("¿Estas suguro de rechazar los productos seleccionados?", "Rechazo de Productos", "question");
        if (bEditar == true) {
            $("#kdDescripcion").data("kendoTextBox").value("")
            $("#kdDdlRepartidoresRechazo").data("kendoComboBox").select(-1);
            $("#kdWindowMotivoRechazo").data("kendoWindow").open().center();

            //var grid = $("#kdGridProductosEntradas").data("kendoGrid");
            //var selectedRows = grid.select();
            //var selectedRowsCount;
            //var n = 0;
            //for (var i = 0; i < selectedRows.length; i++) {

            //    var dataItem = grid.dataItem(selectedRows[i]);

            //    var IdProductoTraspaso = dataItem.IdProductoTrasapaso

            //    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));
            //    var oEmpleados = new libProductosTraspasos();


            //    oEmpleados.IdProductoTrasapaso = IdProductoTraspaso;
            //    oEmpleados.RechazarTraspaso();
            //    selectedRowsCount = selectedRows.length - 1
            //    if (i === selectedRowsCount) {
            //        var dialog = $("#kdWindowRepartidor").data("kendoWindow");
            //        dialog.close();

            //        if (selectedRows.length === 1) {
            //            Swal.fire(
            //                '¡Rechazo Correcto!',
            //                '¡Se rechazó correctamente la solicitud de traslado, favor de enviar los productos a rechazar!',
            //                'success'
            //            )
            //        }
            //        else {
            //            Swal.fire(
            //                '¡Cancelación Correcta!',
            //                '¡Se rechazaron correctamente las solicitudes de traslado, favor de enviar los productos a rechazar!',
            //                'success'
            //            )
            //        }


            //        $("#kdGridProductosSalidas").data("kendoGrid").dataSource.read();
            //        $("#kdGridProductos").data("kendoGrid").dataSource.read();
            //    }

            //    n += i;
            //}


        }



    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para realizar el rechazo del traspaso', '¡Seleccionar Elemento!', 'warning');
    }

}


//--------------------------TAB SEGUIMIENTO-------------------------------

function CrearGridSeguimiento() {
    var kdGridProductosSeguimiento = $("#kdGridProductosSeguimiento");
    kdGridProductosSeguimiento.kendoGrid({
        scrollable: true,
        sortable: true,
        pageable: true,
        toolbar: [
            
            "search"
        ],


        search: {
            fields: ["Marca", "Modelo", "Descripcion", "ProductoGrupo", "ProductoTipo", "SucursalOrigen", "SucursalDestino", "CantidadTraspaso", "EmpleadoEnvia", "ProductoTraspasoStatus", "EmpleadoRecibe", "EmpleadoRepartidor"]
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
                field: "ProductoTraspasoStatus",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Status"
            },
            {
                field: "CantidadTraspaso",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Cantidad a Recibir"
            },
            {
                field: "SucursalOrigen",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal Envia"
            },

            {
                field: "SucursalDestino",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal Recibe"
            },
            {
                field: "EmpleadoEnvia",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Empleado Envía"
            },
            {
                field: "EmpleadoRecibe",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Empleado Recibe"
            },
            {
                field: "EmpleadoRepartidor",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Empleado Repartidor"
            },
            {
                field: "EmpleadoRechaza",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Empleado Rechaza"
            },
            {
                field: "MotivoRechazo",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Motivo Rechazo"
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
    });




}

function CrearDataGridSeguimiento() {
    var kdGridProductosSeguimiento = $("#kdGridProductosSeguimiento");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: function (options) {



                var oNotiApp = new libProductosTraspasos();
                oNotiApp.EmpleadoRecibe = sessionStorage.getItem('Usuario');
                oNotiApp.ListarProductosTraspasosSeguimientoGrid(function (result) {
                    options.success(result.ListTraspasos)
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de las Muestras!', "Error", "Error");
        },
        pageSize: 10,
        schema: {
            model: {
                fields: {
                    IdProductoTrasapaso: { type: "number" },
                    IdProductoTipo: { type: "number" },
                    IdProductoGrupo: { type: "number" },
                    IdProductoSubGrupo: { type: "number" },
                    Producto: { type: "string" },
                    Marca: { type: "string" },
                    Modelo: { type: "string" },
                    ProductoTipo: { type: "string" },
                    ProductoGrupo: { type: "string" },
                    CantidadTraspaso: { type: "number" },
                    SucursalOrigen: { type: "string" },
                    SucursalDestino: { type: "string" },
                    EmpleadoEnvia: { type: "string" },
                    EmpleadoRepartidor: { type: "string" },

                }
            }
        },
        dataSource: dataSource,
    });

    kdGridProductosSeguimiento.data("kendoGrid").setDataSource(dataSource);
}