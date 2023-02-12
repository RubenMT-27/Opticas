function libGrupos{

    this.GetListGrupos = function (fnResult) {
        sparam = JSON.stringify(this);

        var UrlWebApi = "" //Obtiene la URL base de la api

        $.ajax({
            type: "GET",
            url: UrlWebApi + "Index/GetListGrupos",
            data: { 'sparam': sparam },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            beforeSend: function () {

            },
            complete: function () {

            },
            success: function (result) {
            }
        })
    }
}

//function GetClientID(ControlId) {
//    return $("[id$=" + ControlId + "]").attr("Id");
//}