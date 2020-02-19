var vJsonTmpObject = {
    refundObj: {
        acctAccessCode: new Object()
    },
    refundInfo: new Object(),
    refundChannel: new Object()
};

var vJsonObject = '';
var vTmpArray = new Array();
var vTmpObject = new Object();
var vMSJson = JSON.parse(JsonMS);
var vRefundSerial = '';

for (var i = 0; i < vMSJson.length; i++) {
    if (vMSJson[i].name == 'DEPOSIT_SERIAL') {
        vRefundSerial = vMSJson[i].value;
        break;
    }
}

vJsonTmpObject.refundSerialNo = "";
vJsonTmpObject.refundObj.acctAccessCode.accountCode = subscriberId;
vJsonTmpObject.refundObj.acctAccessCode.payType = '2';
vTmpObject.refundType = '3';
//vTmpObject.refundType = (!vIsDPA) ? '1' : '2';
vTmpObject.paymentSerialNo = vRefundSerial;
vTmpObject.depositType = (!vIsDPA) ? 'C_DEPOSITO_PAGO_EN_GARANTIA' : '';
//vTmpObject.amount=parseFloat(vTotalAmount)*1000000;
vTmpObject.amount=parseFloat(vFinalDPGAmount)*1000000;
vTmpArray.push(vTmpObject);
vJsonTmpObject.refundInfo = vTmpArray;
vJsonTmpObject.refundChannel.paymentMethod = 'A';
vJsonObject = JSON.stringify(vJsonTmpObject);