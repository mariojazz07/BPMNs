
if(typeof vServiceAccount != 'undefined'){
    var vJsonService = JSON.parse(vServiceAccount);
}
else{
    var vJsonService = '';
}

//var vJsonService = JSON.parse(vServiceAccount);
var vIsOK=false;
var vTypeValue = '';

if (typeof vJsonService != '') {
    var vTypeValue = '';
    for (var i = 0; i < vJsonService.length; i++) {
        if (vJsonService[i].name == 'SEGMENTO') {
            vTypeValue = vJsonService[i].value;
            break;
        }
    }
}

if(vTypeValue=='1' || vTypeValue=='2'){
    vIsOK=true;
}