var MSTmpJson = {};
var MSJson = '';
var vListArray = new Array();
var vNameDPG = ['CURRENT_AMOUNT','STATUS'];
var vValueDPG = ['0','DEVUELTO'];

// var vTmpObject = new Object();
// vTmpObject.name = vNameDPG;
// vTmpObject.value = vValueDPG;
// vListArray.push(vTmpObject);
// MSTmpJson.atributeList = vListArray;
// MSJson = JSON.stringify(MSTmpJson);


for (var i = 0; i < vNameDPG.length; i++) {
    vTmpObject = new Object();
    vTmpObject.name = vNameDPG[i];
    vTmpObject.value = vValueDPG[i];
    vListArray.push(vTmpObject);
}
MSTmpJson.atributeList = vListArray;
MSJson=JSON.stringify(MSTmpJson);

var DEPOSIT_INITIAL_AMOUNT = getMSAttributes('INITIAL_AMOUNT',JsonMS);
var DEPOSIT_CURRENT_AMOUNT = '0';
var DEPOSIT_STATUS = 'DEVUELTO';
