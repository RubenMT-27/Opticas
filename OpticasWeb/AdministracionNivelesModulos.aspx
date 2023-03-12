<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/mpOpticas.Master" CodeBehind="AdministracionNivelesModulos.aspx.cs" Inherits="OpticasWeb.AdministracionNivelesModulos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphCss" runat="server">
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.bootstrap-v4.min.css" rel="stylesheet" />
    <link href="css/cssAdministracionNivelesModulos.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphPrincipal" runat="server">
    <h1 class="page-header p-1 text-white">Administración Niveles - Módulos<small class="text-white"> Gran Visión</small></h1>
    <div class="row row-space-30">
        <div class="col-lg-12 ui-sortable">
            <div class="panel panel-primary" data-sortable-id="index-1">
                <div class="panel-heading ui-sortable-handle">
                    <h4 class="panel-title">
                        <span class="fa-stack fa-lg">
                            <i class="far fa-circle fa-stack-2x"></i>
                            <i class="fa fas fa-list-alt fa-stack-1x"></i>
                        </span>

                        Niveles - Módulos
                    </h4>
                </div>

                <div id="kdCombos" class="panel-body p-t-10">
                    <div class="row pb-1">
                        <div class="col">
                            <input id="kdDdlComboNivel" name="kdDdlComboNivel" class="w-100" required validationmessage="Llenar Nivel" />
                            <span class="k-invalid-msg" data-for="kdDdlComboNivel"></span>
                        </div>
                        <div class="col">
                            <input id="kdDdlComboModulo" name="kdDdlComboModulo" class="w-100" required validationmessage="Llenar Módulo" />
                            <span class="k-invalid-msg" data-for="kdDdlComboModulo"></span>
                        </div>
                    </div>

                    <div id="grdNivelModulo" class="kendoGrid"></div>

                </div>
            </div>
        </div>
    </div>

    <div id="alert"></div>

    <span id="popupNotification"></span>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cphScripts" runat="server">

    <script src="js/Kendo/Kendo-2023-R1/js/kendo.all.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/messages/kendo.messages.es-MX.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/kendo.timezones.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/cultures/kendo.culture.es-MX.min.js"></script>
    <script src="js/plugins/jsZip/jszip.min.js"></script>
    <script src="js/jsAdministracionNivelesModulos.js"></script>
</asp:Content>
