<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/mpOpticas.Master" CodeBehind="CatalogoClientes.aspx.cs" Inherits="OpticasWeb.CatalogoClientes" %>


<asp:Content ID="Content1" ContentPlaceHolderID="cphCss" runat="server">
  
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.bootstrap-v4.min.css" rel="stylesheet" />
    <link href="css/cssCatalogoClientes.css" rel="stylesheet" />
    <link href="css/cssGenerales.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphPrincipal" runat="server">
   <h1 class="page-header p-1 text-white">Catálogo Pacientes<small class="text-white"> Gran Visión</small></h1>

    <div class="row row-space-30">
        <div class="col-lg-12 ui-sortable">
            <div class="panel panel-primary" data-sortable-id="index-1">
                <div class="panel-heading ui-sortable-handle">
                    <h4 class="panel-title">
                        <span class="fa-stack fa-lg">
                            <i class="far fa-circle fa-stack-2x"></i>
                            <i class="fa fas fa-list-alt fa-stack-1x"></i>
                        </span>

                        Pacientes
                    </h4>
                 
                </div>

                 <div class="card-body p-t-10" style="height: 70vh;">
                    <div id="grdClientes" class="kendoGrid"></div>

                    <div id="kdWindow" class="panel panel-info" data-sortable-id="index-1" style="display: none">
                        <div class="row justify-content-start align-items-center">
                            <div class="col-sm-5" id="dTxtNombre">
                                <input id="kdTxtNombre" name="kdTxtNombre" class="w-100" required validationmessage="Llenar Nombre" />
                                <span class="k-invalid-msg" data-for="kdTxtNombre"></span>
                            </div>

                            <div class="col-sm-5" id="dTxtApellidoPaterno">
                                <input id="kdTxtApellidoPaterno" name="kdTxtApellidoPaterno" class="w-100" required validationmessage="Llenar Apellido" />
                                <span class="k-invalid-msg" data-for="kdTxtApellidoPaterno"></span>
                            </div>

                              </div>

                        <div class="row justify-content-start align-items-center">
                            <div class="col-sm-5" id="dTxtApellidoMaterno">
                                <input id="kdTxtApellidoMaterno" name="kdTxtApellidoMaterno" class="w-100" required validationmessage="Llenar Apellido" />
                                <span class="k-invalid-msg" data-for="kdTxtApellidoMaterno"></span>
                            </div>
                      

                      
                            <div class="col-5" id="dTxtCorreoElectronico">
                                <input id="kdTxtCorreoElectronico" name="kdTxtCorreoElectronico" class="w-100" required validationmessage="Llenar Correo" />
                                <span class="k-invalid-msg" data-for="kdTxtCorreoElectronico"></span>
                            </div>

                               </div>


                        <div class="row justify-content-start align-items-center">

                            <div class="col-5" id="dTxtNumeroTelefono">
                                <input id="kdTxtNumeroTelfono" name="kdTxtNumeroTelfono" class="w-100" type="tel" required validationmessage="Llenar Número de Telefono" pattern="[0-9]{10}" title="" />
                                <span class="k-invalid-msg" data-for="kdTxtNumeroTelfono"></span>
                            </div>

                               <div class="col-5">
                                <input class="w-100" id="kdDpFechaNacimiento" name="kdDpFechaNacimiento" required validationmessage="Seleccionar Fecha" />
                                <span class="k-invalid-msg" data-for="kdDpFechaNacimiento"></span>
                            </div>
                      </div>

                             <div class="row justify-content-start align-items-center">
                                  <div class="col-5">
                                <input id="kdDdlSucursal" name="kdDdlSucursal" class="w-100" required validationmessage="Seleccionar Sucursal" />
                                <span class="k-invalid-msg" data-for="kdDdlSucursal"></span>
                            </div>
                          
                      </div>

                     

                        <div class="row justify-content-end align-items-center pt-2 window-footer">
                            <button id="kdBtnGuardar">Guardar</button>
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
    <script src="js/jsCatalogoClientes.js"></script>

</asp:Content>
