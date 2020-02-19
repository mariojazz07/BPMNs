//var vListArray = new Array();
//var vNameDPG = ['ACCOUNT', 'SUBSCRIBER', 'DEPOSIT_SERIAL', 'BALANCE_NAME', 'INITIAL_AMOUNT','CURRENT_AMOUNT', 'DEPOSIT_DATE', 'DEPOSIT_TYPE','STATUS'];
// if (!vIsDPA) {
//     var vValueDPG = [ACCOUNT, subscriberId, vPaymentSerial, 'C_DEPOSITO_PAGO_EN_GARANTIA', vDPGAmount,vDPGAmount,vDPGTime, 'DPG','DISPONIBLE'];
// } else {
//     var vValueDPG = [ACCOUNT, subscriberId, vPaymentSerial, 'MAIN_ACCOUNT', vDPGAmount,vDPGAmount, vDPGTime, 'DPA','DISPONIBLE'];
// }
// for (var i = 0; i < vNameDPG.length; i++) {
//     vTmpObject = new Object();
//     vTmpObject.name = vNameDPG[i];
//     vTmpObject.value = vValueDPG[i];
//     vListArray.push(vTmpObject);
// }
// MSTmpJson.atributeList = vListArray;
// MSJson=JSON.stringify(MSTmpJson);
//creando MS
var MSTmpJson = {};
var MSJson = '';
var vTmpObject = new Object();
var vTmpValue = new Object();
var vTmpArray = new Array();

if (typeof JsonMS != 'undefined') {
    var TmpJsonMS = JSON.parse(JsonMS);
    for (var i = 0; i <= TmpJsonMS.length; i++) {
        if (TmpJsonMS[i].name == 'JSON_DEPOSIT') {
            var vJsonObject = TmpJsonMS[i].value;
            break;
        }
    }

    if (!vIsDPA) {
        vTmpArray = vJsonObject.DEPOSIT_INFO.DPG;
        vTmpObject.ACCOUNT = ACCOUNT;
        vTmpObject.SUBSCRIBER = subscriberId;
        vTmpObject.DEPOSIT_SERIAL = vPaymentSerial;
        vTmpObject.BALANCE_NAME = 'C_DEPOSITO_PAGO_EN_GARANTIA';
        vTmpObject.INITIAL_AMOUNT = vDPGAmount;
        vTmpObject.CURRENT_AMOUNT = vDPGAmount;
        vTmpObject.DEPOSIT_DATE = vDPGTime;
        vTmpObject.DEPOSIT_TYPE = 'DPG';
        vTmpObject.STATUS = 'DISPONIBLE';
        //var vActiveDPG=getActiveDPG(vTmpArray);
        //vActiveDPG.push(vTmpObject);
        vTmpValue.name = 'JSON_DEPOSIT';
        //vTmpValue.value = vActiveDPG;
        vTmpArray.push(vTmpObject);
        vJsonObject.DEPOSIT_INFO.DPG = vTmpArray;
        vTmpValue.value = vJsonObject;
        MSTmpJson.atributeList = vTmpValue;
        MSJson = JSON.stringify(MSTmpJson);
    } else {
        vTmpArray = vJsonObject.DEPOSIT_INFO.DPA;
        vTmpObject.ACCOUNT = ACCOUNT;
        vTmpObject.SUBSCRIBER = subscriberId;
        vTmpObject.DEPOSIT_SERIAL = vPaymentSerial;
        vTmpObject.BALANCE_NAME = 'MAIN_ACCOUNT';
        vTmpObject.INITIAL_AMOUNT = vDPGAmount;
        vTmpObject.CURRENT_AMOUNT = vDPGAmount;
        vTmpObject.DEPOSIT_DATE = vDPGTime;
        vTmpObject.DEPOSIT_TYPE = 'DPA';
        vTmpObject.STATUS = 'DISPONIBLE';
        //var vActiveDPG=getActiveDPG(vTmpArray);
        //vActiveDPG.push(vTmpObject);
        vTmpValue.name = 'JSON_DEPOSIT';
        //vTmpValue.value = vActiveDPG;
        vTmpArray.push(vTmpObject);
        vJsonObject.DEPOSIT_INFO.DPA = vTmpArray;
        vTmpValue.value = vJsonObject;
        MSTmpJson.atributeList = vTmpValue;
        MSJson = JSON.stringify(MSTmpJson);
    }
} else {
    var vJsonObject = {
        DEPOSIT_INFO: new Object()
    };
    if (!vIsDPA) {
        vJsonObject.DEPOSIT_INFO.DPG = new Array();
        vTmpArray = vJsonObject.DEPOSIT_INFO.DPG;
        vTmpObject.ACCOUNT = ACCOUNT;
        vTmpObject.SUBSCRIBER = subscriberId;
        vTmpObject.DEPOSIT_SERIAL = vPaymentSerial;
        vTmpObject.BALANCE_NAME = 'C_DEPOSITO_PAGO_EN_GARANTIA';
        vTmpObject.INITIAL_AMOUNT = vDPGAmount;
        vTmpObject.CURRENT_AMOUNT = vDPGAmount;
        vTmpObject.DEPOSIT_DATE = vDPGTime;
        vTmpObject.DEPOSIT_TYPE = 'DPG';
        vTmpObject.STATUS = 'DISPONIBLE';
        //var vActiveDPG=getActiveDPG(vTmpArray);
        //vActiveDPG.push(vTmpObject);
        vTmpValue.name = 'JSON_DEPOSIT';
        //vTmpValue.value = vActiveDPG;
        vTmpArray.push(vTmpObject);
        vJsonObject.DEPOSIT_INFO.DPG = vTmpArray;
        vTmpValue.value = vJsonObject;
        MSTmpJson.atributeList = vTmpValue;
        MSJson = JSON.stringify(MSTmpJson);
    } else {
        vJsonObject.DEPOSIT_INFO.DPA = new Array();
        vTmpArray = vJsonObject.DEPOSIT_INFO.DPA;
        vTmpObject.ACCOUNT = ACCOUNT;
        vTmpObject.SUBSCRIBER = subscriberId;
        vTmpObject.DEPOSIT_SERIAL = vPaymentSerial;
        vTmpObject.BALANCE_NAME = 'MAIN_ACCOUNT';
        vTmpObject.INITIAL_AMOUNT = vDPGAmount;
        vTmpObject.CURRENT_AMOUNT = vDPGAmount;
        vTmpObject.DEPOSIT_DATE = vDPGTime;
        vTmpObject.DEPOSIT_TYPE = 'DPA';
        vTmpObject.STATUS = 'DISPONIBLE';
        //var vActiveDPG=getActiveDPG(vTmpArray);
        //vActiveDPG.push(vTmpObject);
        vTmpValue.name = 'JSON_DEPOSIT';
        //vTmpValue.value = vActiveDPG;
        vTmpArray.push(vTmpObject);
        vJsonObject.DEPOSIT_INFO.DPA = vTmpArray;
        vTmpValue.value = vJsonObject;
        MSTmpJson.atributeList = vTmpValue;
        MSJson = JSON.stringify(MSTmpJson);
    }
}