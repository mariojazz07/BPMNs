var vInitialAmount='';
var vInitialStatus='';
var vCurrentAmount='';
var vMSJson = JSON.parse(JsonMS);

for (var i = 0; i < vMSJson.length; i++) {
    if (vMSJson[i].name == 'INITIAL_AMOUNT') {
        vInitialAmount = vMSJson[i].value;
        break;
    }
}

for (var i = 0; i < vMSJson.length; i++) {
    if (vMSJson[i].name == 'STATUS') {
        vInitialStatus = vMSJson[i].value;
        break;
    }
}

for (var i = 0; i < vMSJson.length; i++) {
    if (vMSJson[i].name == 'CURRENT_AMOUNT') {
        vCurrentAmount = vMSJson[i].value;
        break;
    }
}

var DEPOSIT_INITIAL_AMOUNT=vInitialAmount;
var DEPOSIT_CURRENT_AMOUNT=(vIsDPG)?vDPGAmount:vMainBillingAccount;

if(vIsDPG){
    if(parseFloat(vDPGAmount).toFixed(2)!= parseFloat(vCurrentAmount).toFixed(2)){
        var DEPOSIT_STATUS= 'AFECTADO';
    }
    else{
        var DEPOSIT_STATUS= vInitialStatus;
    }
}
