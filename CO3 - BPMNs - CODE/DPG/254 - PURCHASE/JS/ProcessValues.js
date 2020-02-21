var vJsonDPG = '';
var vClient = '';
var vLocation = '';
var vError = false;
var vJsonObject = {listOfTgquerycustomerinforqio: new Object()};
var vJsonRequestCustomer;
var vJsonRequestBilling;
var vJsonRequestService;
var vCFacturacion = '';
var vCServicio = '';

if (typeof vJsonDPGMS != 'undefined') {
    vJsonDPG=JSON.parse(vJsonDPGMS);
    LOGGER.info(tLinea+vJsonDPG+tLinea);

    for (var i = 0; i <= vJsonDPG.length; i++) {
        if (vJsonDPG[i].name == 'CLIENTE') {
            vClient = vJsonDPG[i].value;
            vLocation = vJsonDPG[i].value;
            vJsonObject.listOfTgquerycustomerinforqio.account = new Object();
            vJsonObject.listOfTgquerycustomerinforqio.account.integrationId = vClient;
            //vJsonObject.location=vLocation;
            vJsonRequestCustomer = JSON.stringify(vJsonObject);
            break;
        }
        }

        for (var j = 0; j <= vJsonDPG.length; j++) {
        if (vJsonDPG[j].name == 'CUENTAFACTURACION') {
            vCFacturacion = vJsonDPG[j].value;
            vJsonObject.listOfTgquerycustomerinforqio.account = new Object();
            vJsonObject.listOfTgquerycustomerinforqio.account.integrationId = vCFacturacion;
            vJsonRequestBilling = JSON.stringify(vJsonObject);
            break;
        } 
    }

    for (var k = 0; k <= vJsonDPG.length; k++) {
        if (vJsonDPG[k].name == 'CUENTASERVICIO') {
            vCServicio = vJsonDPG[k].value;
            vJsonObject.listOfTgquerycustomerinforqio.account = new Object();
            vJsonObject.listOfTgquerycustomerinforqio.account.integrationId = vCServicio;
            vJsonRequestService = JSON.stringify(vJsonObject);
            break;
        }
    }
    //vJsonObject.integrationId = vClient;
    //vJsonObject.location = vLocation;
    //vJsonRequest = JSON.stringify(vJsonObject);
} else {
    vError = true;
}