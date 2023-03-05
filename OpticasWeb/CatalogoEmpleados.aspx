<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/mpOpticas.Master" CodeBehind="CatalogoEmpleados.aspx.cs" Inherits="OpticasWeb.CatalogoEmpleados" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphCss" runat="server">
    <%--    <link rel="stylesheet" href="js/plugins/kendoui/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="js/plugins/kendoui/styles/kendo.bootstrap-v4.min.css" />
    <link href="js/plugins/kendoui/styles/kendo.default.mobile.min.css" rel="stylesheet" />--%>
    <%--    <script src="js/plugins/sweetalert2/sweetalert2.all.min.js"></script>
      <link href="js/plugins/KendoUI-R1-2023/styles/kendo.common.min.css" rel="stylesheet" />--%>
    <%--<link href="js/plugins/KendoUI-R1-2023/styles/kendo.default.min.css" rel="stylesheet" />
    <link href="js/plugins/KendoUI-R1-2023/styles/kendo.default.mobile.min.css" rel="stylesheet" />--%>
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.bootstrap-v4.min.css" rel="stylesheet" />
    <link href="css/cssCatalogoEmpleados.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphPrincipal" runat="server">
    <h1 class="page-header p-1">Catálogo Empleados <small>Gran Visión</small></h1>

    <div class="row row-space-30">
        <div class="col-lg-12 ui-sortable">
            <div class="panel panel-primary" data-sortable-id="index-1">
                <div class="panel-heading ui-sortable-handle">
                    <h4 class="panel-title">
                        <span class="fa-stack fa-lg">
                            <i class="far fa-circle fa-stack-2x"></i>
                            <i class="fa fas fa-list-alt fa-stack-1x"></i>
                        </span>

                        Empleados
                    </h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
                    </div>
                </div>

                <div class="panel-body p-t-10">
                    <div id="grdMisMuestras" class="kendoGrid"></div>

                    <div id="kdWindow" class="panel panel-info" data-sortable-id="index-1">
                        <div class="row justify-content-start align-items-center">
                            <div class="col-sm-4" id="dTxtNombre">
                                <input id="kdTxtNombre" name="kdTxtNombre" class="w-100" required validationmessage="Llenar Nombre" />
                                <span class="k-invalid-msg" data-for="kdTxtNombre"></span>
                            </div>

                            <div class="col-sm-4" id="dTxtApellidoPaterno">
                                <input id="kdTxtApellidoPaterno" name="kdTxtApellidoPaterno" class="w-100" required validationmessage="Llenar Apellido" />
                                <span class="k-invalid-msg" data-for="kdTxtApellidoPaterno"></span>
                            </div>



                            <div class="col-sm-3" id="dTxtApellidoMaterno">
                                <input id="kdTxtApellidoMaterno" name="kdTxtApellidoMaterno" class="w-100" required validationmessage="Llenar Apellido" />
                                <span class="k-invalid-msg" data-for="kdTxtApellidoMaterno"></span>
                            </div>
                        </div>

                        <div class="row justify-content-start align-items-center">
                            <div class="col-4" id="dTxtCorreoElectronico">
                                <input id="kdTxtCorreoElectronico" name="kdTxtCorreoElectronico" class="w-100" required validationmessage="Llenar Correo" />
                                <span class="k-invalid-msg" data-for="kdTxtCorreoElectronico"></span>
                            </div>

                            <div class="col-4" id="dTxtNumeroTelefono">
                                <input id="kdTxtNumeroTelfono" name="kdTxtNumeroTelfono" class="w-100" type="tel" required validationmessage="Llenar Número de Telefono" pattern="[0-9]{10}" title="" />
                                <span class="k-invalid-msg" data-for="kdTxtNumeroTelfono"></span>
                            </div>

                            <div class="col-3">
                                <input id="kdDdlSucursal" name="kdDdlSucursal" class="w-100" required validationmessage="Seleccionar Sucursal" />
                                <span class="k-invalid-msg" data-for="kdDdlSucursal"></span>
                            </div>
                        </div>


                        <div class="row justify-content-start align-items-center">
                            <div class="col-4">
                                <input id="kdDdlPuesto" name="kdDdlPuesto" class="w-100" required validationmessage="Seleccionar Puesto" />
                                <span class="k-invalid-msg" data-for="kdDdlPuesto"></span>
                            </div>

                            <div class="col-4">
                                <input id="kdDdlGenero" name="kdDdlGenero" class="w-100" required validationmessage="Seleccionar Género" />
                                <span class="k-invalid-msg" data-for="kdDdlGenero"></span>
                            </div>

                            <div class="col-3">
                                <input class="w-100" id="kdDpFechaNacimiento" name="kdDpFechaNacimiento" required validationmessage="Seleccionar Fecha" />
                                <span class="k-invalid-msg" data-for="kdDpFechaNacimiento"></span>
                            </div>
                        </div>

                        <div class="row justify-content-start align-items-center">
                            <div class="col-4">
                                <input class="w-100" id="kdDpFechaIngreso" name="kdDpFechaIngreso" required validationmessage="Seleccionar Fecha" />
                                <span class="k-invalid-msg" data-for="kdDpFechaIngreso"></span>
                            </div>

                            <div class="col-4">
                                <input class="w-100" id="kdDpFechaBaja" name="kdDpFechaBaja" />
                            </div>


                        </div>

                        <div class="row justify-content-end align-items-center pt-2 window-footer">
                            <button id="kdBtnGuardar">Guardar</button>
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
    <script src="js/jsCatalogoEmpleados.js"></script>

    <%--<script src="js/plugins/KendoUI-R1-2023/js/kendo.all.min.js"></script>--%>
    <%--<script src="js/plugins/KendoUI-R1-2023/js/messages/kendo.messages.es-MX.min.js"></script>--%>
    <%--<script src="js/plugins/KendoUI-R1-2023/js/kendo.timezones.min.js"></script>--%>
    <%--<script src="js/plugins/KendoUI-R1-2023/js/cultures/kendo.culture.es-MX.min.js"></script>--%>
</asp:Content>
