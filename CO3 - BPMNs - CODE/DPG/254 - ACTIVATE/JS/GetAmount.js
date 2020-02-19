var vBalanceAmount = '';
var vDoRefund = false;
var vTotalAmount = 0;
var vFinalDPGAmount = 0;
var vFinalDPGMSAmount=0;
var vIsDPG = false;
var vIsDPA = false;
var vIsError = false;
var vType = TYPE;
var vJsonObject = '';

if (typeof vJsonBalanceResponse != 'undefined') {
    vJsonObject = JSON.parse(vJsonBalanceResponse);
}

if (typeof vType != 'undefined') {
    if (vType == 'DPG') {
        var vDPGAmount = getDepositBalance(subscriberId, vJsonObject, true, false);
        if (typeof vDPGAmount != 'undefined') {
            vIsDPG = true;
            LOGGER.info(tLinea + 'vDPGAmount:' + vDPGAmount + tLinea);
        }
    } else if (vType == 'DPA') {
        var vMainBillingAccount = getDepositBalance(subscriberId, vJsonObject, false, true);
        if (typeof vMainBillingAccount != 'undefined') {
            vIsDPA = true;
            LOGGER.info(tLinea + 'vMainBillingAccount:' + vMainBillingAccount + tLinea);
        }
    }
}

if (!vIsDPG && !vIsDPA) {
    vIsError = true;
}

if (typeof vJsonBalanceResponse != 'undefined') {
    if (vIsDPG) {
        vBalanceAmount = getTotalAmount(JSON.parse(vJsonBalanceResponse));
        //vDPGAmount = vDPGAmount;
        LOGGER.info(tLinea + 'vBalanceAmount:' + vBalanceAmount + tLinea);
       // LOGGER.info(tLinea + 'vDPGAmount:' + vDPGAmount + tLinea);


        if (vBalanceAmount >= vDPGAmount) {
            LOGGER.info(tLinea + 'Llego a validar vBalanceAmount > vDPGAmount' + tLinea);
            vFinalDPGAmount = vDPGAmount;
            vFinalDPGMSAmount=0;
            vDoRefund = true;
        } else if (vBalanceAmount < vDPGAmount) {
            //vTotalAmount = vBalanceAmount;
            vFinalDPGAmount = vBalanceAmount;
            vFinalDPGMSAmount=parseFloat(vDPGAmount-vBalanceAmount).toFixed(2);
            vDoRefund = true;
        }
        else if(vBalanceAmount==0){
            vFinalDPGAmount=0;
            vFinalDPGMSAmount=parseFloat(vDPGAmount).toFixed(2);
            vDoRefund=false;
        }
    }
}

