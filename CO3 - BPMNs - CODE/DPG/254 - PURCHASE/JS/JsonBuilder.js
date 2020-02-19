var vJsonTmpObject = {
    paymentObj: {
        acctAccessCode: new Object()
    },
    paymentInfo: new Object()
};
var vJsonObject = '';
var vTmpArray = new Array();
var vTmpObject = new Object();

if (!vIsDPA) {
    vJsonTmpObject.paymentSerialNo = vPaymentNumber.replace(/-/g, "");
    vJsonTmpObject.paymentType = vPaymentType;
    vJsonTmpObject.paymentChannelID = vChannelID.toString();
    vJsonTmpObject.opType = vOptType;
    vJsonTmpObject.depositType = vDepositType;
    //vJsonTmpObject.paymentObj.acctAccessCode.primaryIdentity=subscriberId;
    vJsonTmpObject.paymentObj.acctAccessCode.accountCode = subscriberId;
    //
    vTmpObject.paymentMethod = vPayMethod;
    vTmpObject.amount = vAmount * 1000000;
    vTmpArray.push(vTmpObject);
    vJsonTmpObject.paymentInfo.cashPayment = vTmpArray;
    vJsonTmpObject.currencyID = vCurrency;
    vJsonObject = JSON.stringify(vJsonTmpObject);

} else {
    vJsonTmpObject.paymentSerialNo = vPaymentNumber.replace(/-/g, "");
    vJsonTmpObject.paymentType = vPaymentType;
    vJsonTmpObject.paymentChannelID = vChannelID;
    vJsonTmpObject.opType = vOptType;
    //vJsonTmpObject.depositType=vDepositType;
    //vJsonTmpObject.paymentObj.acctAccessCode.primaryIdentity=subscriberId;
    vJsonTmpObject.paymentObj.acctAccessCode.accountCode = subscriberId;
    //
    vTmpObject.paymentMethod = vPayMethod;
    vTmpObject.amount = vAmount;
    vTmpArray.push(vTmpObject);
    vJsonTmpObject.paymentInfo.cashPayment = vTmpArray;
    vJsonTmpObject.currencyID = vCurrency;
    vJsonObject = JSON.stringify(vJsonTmpObject);
}