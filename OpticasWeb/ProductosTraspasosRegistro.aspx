<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/mpOpticas.Master" CodeBehind="ProductosTraspasosRegistro.aspx.cs" Inherits="OpticasWeb.ProductosTraspasosRegistro" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphCss" runat="server">
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.bootstrap-v4.min.css" rel="stylesheet" />
    <link href="css/cssGenerales.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphPrincipal" runat="server">
    <h1 class="page-header p-1 text-white">Traspaso de Productos<small class="text-white"> Gran Visión</small></h1>



     <div class="row row-space-30">
        <div class="col-lg-12 ui-sortable">
            <div class="panel panel-primary" data-sortable-id="index-1">
                <div class="panel-heading ui-sortable-handle">
                    <h4 class="panel-title">
                        <span class="fa-stack fa-lg">
                            <i class="far fa-circle fa-stack-2x"></i>
                            <i class="fa fas fa-list-alt fa-stack-1x"></i>
                        </span>

                        Productos Traspasos
                    </h4>
                 
                </div>
          
                        <div id="tabstrip" style="display: none">
                            <ul>
                                <li class="k-active">
                                    Registro
                                </li>
                                <li>
                                    Salidas
                                </li>
                                <li>
                                    Entradas
                                </li>
                                <li>
                                    Seguimiento
                                </li>
                            </ul>

                            <%--------------Tab Traspaso Productos REGISTRO--------------%>
                            <div>
                                     <div class="card-body p-t-10" style="height: 70vh;">
                    <div id="kdGridProductos" class="kendoGrid"></div>

                      <div id="kdWindowTraspaso" style="display: none">
                            <div class="row justify-content-center align-items-center">                         
                            <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
                                <input id="kdTxtProductoGrupo2" name="kdTxtProductoGrupo2" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                             <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
                                <input id="kdTxtProductoTipo2" name="kdTxtProductoTipo2" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                        </div>

                        <div class="row justify-content-center align-items-center">
                              <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtMarca2">
                                <input id="kdTxtMarca2" name="kdTxtMarca2" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                            <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtModelo2">
                                <input id="kdTxtModelo2" name="kdTxtModelo2" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                        </div>
                           <div>
                              
                        </div>


                             <div class="row justify-content-center align-items-center">
                            <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtSucursalOrigen">
                                <input id="kdTxtSucursalOrigen" name="kdTxtSucursalOrigen" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                             <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
                                <input id="kdDdlSucursalDestino" name="kdDdlSucursalDestino" class="w-100" required validationmessage="Seleccionar Sucursal" />
                                <span class="k-invalid-msg" data-for="kdDdlSucursalDestino"></span>
                            </div>
                        </div>


                        <div class="row justify-content-center align-items-center">
                              <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtCantidadOrigen">
                                <input id="kdTxtCantidadOrigen" name="kdTxtCantidadOrigen" class="w-100" style="background-color: #FAFAFA" readonly />
                            </div>
                             <div class="col-xs-6 col-sm-6 col-md-5 col-lg-5">
                                           <input id="kdDdlCantidadDestino" type="number" title="numeric"  min="1" max="10000" step="1" name="kdDdlCantidad" class="w-100" required validationmessage="Ingresar la cantidad"/>                                
                                <span class="k-invalid-msg" data-for="kdDdlCantidadDestino"></span>
                            </div>
                        </div>

                              

                        <div class="row justify-content-center align-items-center pt-2 window-footer">
                             <div class="col-xs-9 col-sm-7 col-md-3 col-lg-3">
                                 <button id="kdBtnAgregar">Agregar</button>
                            </div>
                        </div>

                     
                    </div>
                </div>
                            </div>
                              <%--------------Tab Traspaso Productos Salidas--------------%>
                            <div>
                                     <div class="card-body p-t-10" style="height: 70vh;">
                    <div id="kdGridProductosSalidas" class="kendoGrid"></div>

                      <div id="kdWindowTraspasoSalidas" style="display: none">
                            <div class="row justify-content-center align-items-center">                         
                            <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
                                <input id="kdTxtProductoGrupoSalidas" name="kdTxtProductoGrupoSalidas" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                             <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
                                <input id="kdTxtProductoTipoSalidas" name="kdTxtProductoTipoSalidas" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                        </div>

                        <div class="row justify-content-center align-items-center">
                              <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtMarcaSalidas">
                                <input id="kdTxtMarcaSalidas" name="kdTxtMarcaSalidas" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                            <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtModeloSalidas">
                                <input id="kdTxtModeloSalidas" name="kdTxtModeloSalidas" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                        </div>
                           <div>
                              
                        </div>


                             <div class="row justify-content-center align-items-center">
                            <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtSucursalOrigenSalidas">
                                <input id="kdTxtSucursalOrigenSalidas" name="kdTxtSucursalOrigenSalidas" class="w-100" style="background-color: #FAFAFA" readonly/>
                            </div>
                             <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
                                <input id="kdDdlSucursalDestinoSalidas" name="kdDdlSucursalDestinoSalidas" class="w-100" required validationmessage="Seleccionar Sucursal" />
                                <span class="k-invalid-msg" data-for="kdDdlSucursalDestinoSalidas"></span>
                            </div>
                        </div>


                        <div class="row justify-content-center align-items-center">
                              <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5" id="dTxtCantidadOrigenSalidas">
                                <input id="kdTxtCantidadOrigenSalidas" name="kdTxtCantidadOrigen" class="w-100" style="background-color: #FAFAFA" readonly />
                            </div>
                             <div class="col-xs-6 col-sm-6 col-md-5 col-lg-5">
                                           <input id="kdDdlCantidadDestinoSalidas" type="number" title="numeric"  min="1" max="10000" step="1" name="kdDdlCantidad" class="w-100" required validationmessage="Ingresar la cantidad"/>                                
                                <span class="k-invalid-msg" data-for="kdDdlCantidadDestinoSalidas"></span>
                            </div>
                        </div>

                              

                        <div class="row justify-content-center align-items-center pt-2 window-footer">
                             <div class="col-xs-9 col-sm-7 col-md-3 col-lg-3">
                                 <button id="kdBtnGuardarSalidas">Guardar</button>
                            </div>
                        </div>

                     
                    </div>

                             <div id="kdWindowRepartidor" style="display: none">
                            <div class="row justify-content-center align-items-center">                         
                            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                  <input id="kdDdlRepartidores" name="kdDdlRepartidores" class="w-100" required validationmessage="Seleccionar un repartidor" />
                                <span class="k-invalid-msg" data-for="kdDdlRepartidores"></span>
                            </div>
                           
                        </div>
                                      

                        <div class="row justify-content-center align-items-center pt-2 window-footer">
                             <div class="col-xs-9 col-sm-7 col-md-3 col-lg-3">
                                 <button id="kdBtnEnviar">Enviar</button>
                            </div>
                        </div>

                     
                    </div>
                </div>
                            </div>

                              <%--------------Tab Traspaso Productos Entradas--------------%>
                                    <div>
                                     <div class="card-body p-t-10" style="height: 70vh;">
                    <div id="kdGridProductosEntradas" class="kendoGrid"></div>

  <div id="kdWindowMotivoRechazo" style="display: none">
                            <div class="row justify-content-center align-items-center">                         
                            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                  <input id="kdDdlRepartidoresRechazo" name="kdDdlRepartidoresRechazo" class="w-100" required validationmessage="Seleccionar un repartidor" />
                                <span class="k-invalid-msg" data-for="kdDdlRepartidoresRechazo"></span>
                            </div>
                           
                        </div>
       <div class="row justify-content-center align-items-center">
                           <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10" id="dTxtDescripcion">
                                <textarea id="kdDescripcion" class="w-100" required validationmessage="Ingresar la descripción"></textarea>
                                 <span class="k-invalid-msg" data-for="kdDescripcion"></span>
                            </div>
                        </div>

                        <div class="row justify-content-center align-items-center pt-2 window-footer">
                             <div class="col-xs-9 col-sm-7 col-md-3 col-lg-3">
                                 <button id="kdBtnRechazar">Rechazar</button>
                            </div>
                        </div>

                     
                    </div>
                </div>
                            </div>

                                <div>
                                     <div class="card-body p-t-10" style="height: 70vh;">
                    <div id="kdGridProductosSeguimiento" class="kendoGrid"></div>

                </div>
                            </div>
                        </div>
                </div>
                <div>   
        </div>
    </div>
            </div>


    <div id="confirm"></div>

    <div id="alert"></div>

    <span id="popupNotification"></span>


   
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cphScripts" runat="server">
    <script src="js/Kendo/Kendo-2023-R1/js/kendo.all.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/messages/kendo.messages.es-MX.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/kendo.timezones.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/cultures/kendo.culture.es-MX.min.js"></script>
    <script src="js/plugins/jsZip/jszip.min.js"></script>
    <script src="js/jsProductosTraspasosRegistro.js"></script>
    </asp:Content>
