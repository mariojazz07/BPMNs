var MSTmpJson = {};
var MSJson = '';
var vListArray = new Array();
var vNameDPG = ['CURRENT_AMOUNT','STATUS'];
var vValueDPG = [vMainBillingAccount,'AFECTADO'];

// var vTmpObject = new Object();
// vTmpObject.name = vNameDPG;
// vTmpObject.value = vValueDPG;
// vListArray.push(vTmpObject);
// MSTmpJson.atributeList = vListArray;
// MSJson = JSON.stringify(MSTmpJson);
var vInitialAmount='';
var vMSJson = JSON.parse(JsonMS);

for (var i = 0; i < vMSJson.length; i++) {
    if (vMSJson[i].name == 'INITIAL_AMOUNT') {
        vInitialAmount = vMSJson[i].value;
        break;
    }
}

var DEPOSIT_INITIAL_AMOUNT=vInitialAmount;
var DEPOSIT_CURRENT_AMOUNT=vMainBillingAccount;
var DEPOSIT_STATUS='AFECTADO';




for (var i = 0; i < vNameDPG.length; i++) {
    vTmpObject = new Object();
    vTmpObject.name = vNameDPG[i];
    vTmpObject.value = vValueDPG[i];
    vListArray.push(vTmpObject);
}
MSTmpJson.atributeList = vListArray;
MSJson=JSON.stringify(MSTmpJson);