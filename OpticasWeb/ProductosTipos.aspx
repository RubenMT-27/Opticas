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
                           <div id="kdWindow" style="display: none">
                        <div class="row justify-content-start align-items-center">
                            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10" id="dTxtProductoTipo">
                                <input id="kdTxtProductoTipo" name="kdTxtProductoTipo" class="w-100" required validationmessage="Llenar Tipo de Producto" />
                                <span class="k-invalid-msg" data-for="kdTxtProductoTipo"></span>
                            </div>
                        </div>

                        <div class="row justify-content-start align-items-center">
                           

                            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                <input id="kdDdlProductoGrupo" name="kdDdlProductoGrupo" class="w-100" required validationmessage="Seleccionar Grupo de Producto" />
                                <span class="k-invalid-msg" data-for="kdDdlProductoGrupo"></span>
                            </div>
                            
                        </div>


                        <div class="row justify-content-start align-items-center">
                           <div class="col-xs-11 col-sm-11 col-md-11 col-lg-11" id="dTxtDescripcion">
                                <textarea id="kdDescripcion" class="w-100" required validationmessage="Llenar Descripcion"></textarea>
                                <span class="k-invalid-msg" data-for="kdDescripcion"></span>
                            </div>
                        </div>

                            
                  

                        <div class="row justify-content-center align-items-center pt-2 window-footer">
                             <div class="col-xs-9 col-sm-7 col-md-3 col-lg-3">
                                 <button id="kdBtnGuardar">Guardar</button>
                            </div>
                        </div>
                        <div class="row justify-content-center align-items-center pt-2 window-footer">
                             <div class="col-xs-9 col-sm-7 col-md-3 col-lg-3">
                                 <button id="kdBtnActualizar">Actualizar</button>
                            </div>
                        </div>

                    </div>
                    </div>
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
    <script src="js/jsProductosTipos.js"></script>



</asp:Content>
