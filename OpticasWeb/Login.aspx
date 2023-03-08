<%@ Page Title="" Language="C#" MasterPageFile="~/mpLogin.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="OpticasWeb.Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphCss" runat="server">
    <link href="css/Kendo/Kendo-2023-R1/styles/kendo.common.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphJs" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="cphPrincipal" runat="server">
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-5">
                    
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-7 col-lg-5">
                    <div class="login-wrap p-0">
                        <h2 class="heading-section mb-4 text-center">Inicio de Sesión</h2>
                        <h3 class="mb-4 text-center">Opticas Gran Visión</h3>
                        <form action="#" class="signin-form">
                            <div class="form-group">
                                <input type="text" id="txtUsuario" class="form-control" placeholder="Usuario">
                            </div>
                            <div class="form-group">
                                <input id="txtContraseña" type="password" class="form-control" placeholder="Contraseña">
                                <span toggle="#txtContraseña" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                            </div>
                            <div class="form-group">
                                <button type="submit" id="btnIniciarSesion" class="form-control btn btn-primary submit px-3">Iniciar Sesión</button>
                            </div>
                            <div class="form-group d-md-flex">
                                <div class="w-50">
                                    <label class="checkbox-wrap checkbox-primary">
                                        Recordar contraseña
									  <input type="checkbox" checked>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div class="w-50 text-md-right">
                                    <a href="#" style="color: #fff">¿Olvidaste tu contraseña?</a>
                                </div>
                            </div>
                        </form>
                        <%--  <p class="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
                        <div class="social d-flex text-center">
                            <a href="#" class="px-2 py-2 mr-md-1 rounded"><span class="ion-logo-facebook mr-2"></span>Facebook</a>
                            <a href="#" class="px-2 py-2 ml-md-1 rounded"><span class="ion-logo-twitter mr-2"></span>Twitter</a>
                        </div>--%>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cphScripts" runat="server">
    <script src="js/Kendo/Kendo-2023-R1/js/kendo.all.min.js"></script>
    <script src="js/Kendo/Kendo-2023-R1/js/messages/kendo.messages.es-MX.min.js"></script>
</asp:Content>
