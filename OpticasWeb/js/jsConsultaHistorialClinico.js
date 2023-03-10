

$(document).ready(function () {
    CrearGrid();
    CrearDataGrid();
   
});

//Funciones Pantalla Principal
function CrearGrid() {
    var grdHistorial = $("#grdHistorial");
    grdHistorial.kendoGrid({
        scrollable: true,
        sortable: true,

        selectable: "multiple, row",
        pageable: true,
        toolbar: [{
            template: '<a id="AgregarMonofocalButton"">Agregar G.Monofocal</a>'
        }, {
                template: '<a id="AgregarBifocalButton"">Agregar G.Bifocal</a>'
            },
            {
                template: '<a id="AgregarLenteButton"">Agregar G.Lente de Contacto</a>'
            },
            {
                template: '<a id="EditarItemButton"">Editar</a>'
            },
            {
                template: '<a id="EliminarItemButton"">Eliminar</a>'
            },
            {
                template: '<span class="k-textbox k-grid-search k-display-flex form-right"><input autocomplete="off" placeholder="Buscar..." title="Buscar..." class="k-input form-control form-right"><span class="k-input-icon justify-content-end"><span class="k-icon k-i-search justify-content-end"></span></span></span>'
            }],

        resizable: true,
        height: 500,
        filterable: true,
        columns: [
            {
                field: "FechaAlta",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 160,
                title: "Fecha de Visita"
            },
            {
                field: "TipoGraduacion",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 190,
                title: "Tipo de Graduación"

            },
            {
                field: "Nombre",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 300,
                title: "Nombre"

            },
            {
                field: "FechaNacimiento",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 220,
                title: "Fecha de Nacimiento"

            },
            {
                field: "NumeroTelefono",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 230,
                title: "Número de Teléfono"

            },
            {
                field: "Sucursal",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 240,
                title: "Sucursal Visita"

            },
            {
                field: "EmpleadoAtendio",
                headerAttributes: { "class": "k-text-center !k-justify-content-center font-weight-bold" },
                attributes: { style: "text-align: center;" },
                width: 300,
                title: "Atendió"

            }
           
        ],

    }).after(() => {
        $('#AgregarMonofocalButton').kendoButton({
            icon: 'k-icon k-i-plus'
            //click: AgregarMonofocalClick
        });

        $('#AgregarBifocalButton').kendoButton({
            icon: 'k-icon k-i-plus'
            //click: AgregarBifocalClick
        });

        $('#AgregarLenteButton').kendoButton({
            icon: 'k-icon k-i-plus'
            //click: AgregarBifocalClick
        });

        $('#EditarItemButton').kendoButton({
            icon: 'k-icon k-i-track-changes',
            click: EditarClick
        });

        $('#EliminarItemButton').kendoButton({
            icon: 'k-icon k-i-x-outline'
            //click: EliminarClick
        });
    });


}

function CrearDataGrid() {
    var grdHistorial = $("#grdHistorial");
    var jsonDatosSesion = jQuery.parseJSON(sessionStorage.getItem('DatosSesion'));

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {



                var oNotiApp = new libHistorial();
                oNotiApp.GetListHistorial(function (result) {
                    options.success(result.ListHistorial);
                },
                    function (e) {
                        options.error();
                    });
            }
        },
        error: function (e) {
            bsMsgBox('¡Se genero un error al momento de obtener los datos de los clientes!', "Error", "Error");
        },
        pageSize: 100,
        schema: {
            model: {
                fields: {
                    FechaAlta: { type: "string" },
                    Nombre: { type: "string" },
                    FechaNacimiento: { type: "string" },
                    NumeroTelefono: { type: "string" },
                    Sucursal: { type: "string" },
                    EmpleadoAtendio: { type: "string" }             
                }
            }
        },
        dataSource: dataSource,
    });

    grdHistorial.data("kendoGrid").setDataSource(dataSource);
}



//Toolbar Buttons

function EditarClick() {
    
    var grid = $("#grdHistorial").data("kendoGrid");
    var selectedRows = grid.select();

    if (selectedRows.length > 0) {
        var grid = $("#grdHistorial").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        var TipoGraduacion = dataItem.TipoGraduacion


        if (TipoGraduacion === "Ambulatoria Lejos" || TipoGraduacion === "Ambulatoria Cerca" || TipoGraduacion === "Tolerado Cerca"
            || TipoGraduacion === "Tolerado Lejos") {
            console.log("MONOFOCAL");
        }
        else {
            if (TipoGraduacion === "Lentes de Contacto") {
                console.log("Lentes");
            }
            else {
                if (TipoGraduacion === "Bifocal") {
                    console.log("Bifocal");
                }
            }
        }


    } else {
        CrearAlerta('Es necesario seleccionar un elemento de la tabla para editar', '¡Seleccionar Elemento!', 'warning');
    }

}


//Mostrar ventanas correspondientes

function AbrirWindowMonofocal(){
    var btnGuardar = $("#kdBtnGuardarMonofocal");
    btnGuardar.hide();
    var btnActualizar = $("#kdBtnActualizarMonofocal");
    btnActualizar.show();


    var dataItem = grid.dataItem(selectedRows[0]);
   

    LimpiarControles();

    var kdNombre = $("#kdTxtNombre").data("kendoTextBox");
    var kdApellidoPaterno = $("#kdTxtApellidoPaterno").data("kendoTextBox");
    var kdApellidoMaterno = $("#kdTxtApellidoMaterno").data("kendoTextBox");
    var kdCorreoElectronico = $("#kdTxtCorreoElectronico").data("kendoTextBox");
    var kdNumeroTelefono = $("#kdTxtNumeroTelfono").data("kendoTextBox");
    var kdComboSucursal = $("#kdDdlSucursal").data("kendoComboBox");
    var kdComboPuesto = $("#kdDdlPuesto").data("kendoComboBox");
    var kdComboGenero = $("#kdDdlGenero").data("kendoComboBox");
    var kdDateNacimiento = $("#kdDpFechaNacimiento").data("kendoDatePicker");
    var kdDateIngreso = $("#kdDpFechaIngreso").data("kendoDatePicker");


    kdNombre.value(dataItem.Nombre);
    kdApellidoPaterno.value(dataItem.ApellidoPaterno);
    kdApellidoMaterno.value(dataItem.ApellidoMaterno);
    kdCorreoElectronico.value(dataItem.CorreoElectronico);
    kdNumeroTelefono.value(dataItem.NumeroTelefono)

    kdComboSucursal.select(function (dataItem2) {
        return dataItem2.Sucursal === dataItem.Sucursal;
    });

    kdComboPuesto.select(function (dataItem2) {
        return dataItem2.Puesto === dataItem.Puesto;
    });

    kdComboGenero.select(function (dataItem2) {
        return dataItem2.Genero === dataItem.Genero;
    });

    kdDateNacimiento.value(dataItem.FechaNacimiento)
    kdDateIngreso.value(dataItem.FechaIngreso)

    //kdComboSucursal.select(dataItem.dataTextField);
    //kdComboSucursal.trigger("change");

    $("#kdWindow").data("kendoWindow").open();
    $("#kdWindow").data("kendoWindow").title("Editar Empleado");



}


//Librerias

function libHistorial() {
    var token = sessionStorage.getItem('token');
    var UrlWebGeneral = "http://localhost:44543/api/";

    this.GetListHistorial = function (fnResult, fnError) {
        sparam = JSON.stringify(this);

        $.ajax({
            type: "GET",
            url: UrlWebGeneral + "Historial/GetListHistorial",
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


                    } else {



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
