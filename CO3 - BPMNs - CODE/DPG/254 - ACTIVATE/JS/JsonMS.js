var MSTmpJson = {};
var MSJson = '';
var vListArray = new Array();
var vNameDPG = ['CURRENT_AMOUNT', 'STATUS'];
var vValueDPG = [vFinalDPGAmount.toString(), 'AFECTADO'];

// var vTmpObject = new Object();
// vTmpObject.name = vNameDPG;
// vTmpObject.value = vValueDPG;
// vListArray.push(vTmpObject);
// MSTmpJson.atributeList = vListArray;
// MSJson = JSON.stringify(MSTmpJson);

var vInitialAmount = '';
var vMSJson = JSON.parse(JsonMS);

for (var i = 0; i < vMSJson.length; i++) {
    if (vMSJson[i].name == 'INITIAL_AMOUNT') {
        vInitialAmount = vMSJson[i].value;
        break;
    }
}

for (var j = 0; j < vNameDPG.length; j++) {
    vTmpObject = new Object();
    vTmpObject.name = vNameDPG[j];
    vTmpObject.value = vValueDPG[j];
    vListArray.push(vTmpObject);
}
MSTmpJson.atributeList = vListArray;
MSJson = JSON.stringify(MSTmpJson);

var DEPOSIT_INITIAL_AMOUNT = vInitialAmount;
var DEPOSIT_CURRENT_AMOUNT = vFinalDPGMSAmount.toString();
var DEPOSIT_STATUS = 'AFECTADO';

LOGGER.info(tLinea + 'vFinalDPGAmount:' + vFinalDPGAmount + tLinea);
