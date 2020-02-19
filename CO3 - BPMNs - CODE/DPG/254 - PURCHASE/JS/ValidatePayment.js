var vPaymentResult = '';
var vResultCode = '';
var vIsValid = false;
var vPaymentSerial = '';
var vPaymentTransId = '';
var vDPGAmount = '';
var vDPGTime = '';

if (typeof vJsonResponse != 'undefined') {
    vPaymentResult = getJSON(vJsonResponse);
    vResultCode = vPaymentResult.PaymentResultMsg.ResultHeader.ResultCode;
    if (vResultCode == '0') {
        vIsValid = true;
        vPaymentSerial = vPaymentResult.PaymentResultMsg.PaymentResult.PaymentSerialNo;
        vPaymentTransId = vPaymentResult.PaymentResultMsg.PaymentResult.TransId;
        vDPGAmount = vPaymentResult.PaymentResultMsg.PaymentResult.BalanceChgInfo.NewBalanceAmt;
        vDPGAmount = parseFloat(vDPGAmount / 1000000).toFixed(2);
        vDPGTime = vPaymentResult.PaymentResultMsg.PaymentResult.PaymentTime;
    } else {
        vIsValid = false;
    }
}