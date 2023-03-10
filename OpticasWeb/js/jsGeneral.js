function ObtenerUrlWeb() {
    var Url = '@System.Configuration.ConfigurationManager.AppSettings["UrlWeb"]';

    return Url;
}

function CrearAlerta(sMsg, sTitulo, sIcono) {
    //Iconos disponibles "error", "info", "question", "success", "warning"
    Swal.fire({
        title: sTitulo,
        text: sMsg,
        icon: sIcono,
        showCloseButton: true
    })
}

function BindHtml(data, tagHtml, tagTemplate) {
    $(tagHtml).html('');
    $(tagTemplate).tmpl(data).appendTo(tagHtml);
}

function CrearAlertaConfirm(sMsg, sTitulo, sIcono) {
    return new Promise(resolve => {
        Swal.fire({
            title: sTitulo,
            text: sMsg,
            icon: sIcono,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            timer: 10000
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })    
}
