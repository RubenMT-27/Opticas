<%@ Page Title="" Language="C#" MasterPageFile="~/mpOpticas.Master" AutoEventWireup="true" CodeBehind="ProductosTipos.aspx.cs" Inherits="OpticasWeb.ProductosTipos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphCss" runat="server">
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.bootstrap-v4.min.css" rel="stylesheet" />
    <link href="css/cssGenerales.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphPrincipal" runat="server">
    <h1 class="page-header p-1 text-white">Catálogo Tipos de Productos<small class="text-white"> Gran Visión</small></h1>

    <div class="row row-space-30 justify-content-center">
        <div class="col-lg-8 col-md-12">
            <div class="card">
                <div class="card-header bg-primary">
                    <h6 class="card-title text-white">
                        <span class="fa-stack fa-md">
                            <i class="far fa-circle fa-stack-2x text-white"></i>
                            <i class="fa fas fa-list-alt fa-stack-1x text-white"></i>
                        </span>
                        Tipos de Productos
                    </h6>
                </div>

                <div class="card-body p-t-10" style="height: 70vh;">
                    <div id="kdGridTiposProductos">
                        <div id="kdWindow">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cphScripts" runat="server">
    <script src="js/Kendo/Kendo-2023-R1/js/kendo.all.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/messages/kendo.messages.es-MX.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/kendo.timezones.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/cultures/kendo.culture.es-MX.min.js"></script>
    <script src="js/plugins/jsZip/jszip.min.js"></script>
    <script src="js/jsProductosTipos.js"></script>


    <script id="ControlesWindowTemplate" type="text/x-kendo-template">        
        <input id="hidIdProductoTipo" type="hidden" />
        <input id="txtProductoTipo" />
        <textarea id="txtDescripcion"></textarea>
        <div class="k-counter-container"><span class="k-counter-value">0</span>/300</div>

        <div class="k-edit-buttons k-actions-end">
        <button id="btnGuardar" type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">
        <span class="k-icon k-i-check k-button-icon"></span>
        <span class="k-button-text">Guardar</span>
        </button>

        <button id="btnCancelar" type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
        <span class="k-icon k-i-cancel k-button-icon"></span>
        <span class="k-button-text">Cancelar</span>
        </button>
        </div>
    </script>

    <script id="btnTemplates" type="text/x-kendo-template">
        <button id="btnNuevo" TipoOperacion="1" type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
        <span class="k-icon k-i-plus k-button-icon">
        </span>
        <span class="k-button-text">Nuevo</span>
        </button>

        <button id="btnEditar" TipoOperacion="2" type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
        <span class="k-icon k-i-pencil k-button-icon">
        </span>
        <span class="k-button-text">Editar</span>
        </button>

        <button id="btnEliminar" type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
        <span class="k-icon k-i-trash k-button-icon">
        </span>
        <span class="k-button-text">Eliminar</span>
        </button>
    </script>

</asp:Content>
