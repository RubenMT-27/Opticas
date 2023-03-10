<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/mpOpticas.Master" CodeBehind="AdministracionNivelesEmpleados.aspx.cs" Inherits="OpticasWeb.AdministracionNivelesEmpleados" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphCss" runat="server">
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.bootstrap-v4.min.css" rel="stylesheet" />
    <link href="css/cssAdministracionNivelesEmpleados.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphPrincipal" runat="server">
    
       <h1 class="page-header p-1 text-white">Administración Nivel de Empleado<small class="text-white"> Gran Visión</small></h1>
    <div class="row row-space-30">
        <div class="col-lg-12 ui-sortable">
            <div class="panel panel-primary" data-sortable-id="index-1">
                <div class="panel-heading ui-sortable-handle">
                    <h4 class="panel-title">
                        <span class="fa-stack fa-lg">
                            <i class="far fa-circle fa-stack-2x"></i>
                            <i class="fa fas fa-list-alt fa-stack-1x"></i>
                        </span>

                        Nivel-Empleado
                    </h4>
                   
                </div>

                <div class="panel-body p-t-10">

                      <div class="row justify-content-start align-items-center">
                            <div class="col-3">
                               
                            </div>
                             <div class="col-4">
                                <input id="kdDdlComboNivel" name="kdDdlComboNivel" class="w-100"/>
                            </div>
                        </div>
                     
                    <div id="grdNivelEmpleado" class="kendoGrid"></div>

                    <div id="kdWindow" class="panel panel-info" data-sortable-id="index-1" style="display: none">
                        <div class="row justify-content-start align-items-center">
                            <div class="col-sm-10" id="dTxtNombre">
                                <input id="kdTxtNombre" name="kdTxtNombre" class="w-100"/>
                            </div>
                        </div>

                        <div class="row justify-content-start align-items-center">
                           
                            <div class="col-10">
                                <input id="kdDdlNivel" name="kdDdlNivel" class="w-100" required validationmessage="Seleccionar Nivel" />
                                <span class="k-invalid-msg" data-for="kdDdlNivel"></span>
                            </div>
                        </div>
                  
                        <div class="row justify-content-end align-items-center pt-2 window-footer">
                            <button id="kdBtnActualizar">Actualizar</button>
                        </div>

                    </div>
                </div>

                <div>
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
    <script src="js/jsAdministracionNivelesEmpleados.js"></script>
</asp:Content>