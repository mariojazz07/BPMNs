var vAmount = '0';
var vDepositType = 'C_DEPOSITO_PAGO_EN_GARANTIA';
var vPaymentType = '1';
var vPaymentNumber = transactionId;
var vChannelID = channelId;
var vOptType = '';
var vPayMethod = '1001';
var vCurrency = '1153';
var vIsCorrect = false;
var vIsDPA = false;
var vExternal=EXTERNAL;
var vIsExternal=false;

if (typeof AMOUNT != 'undefined') {
    vAmount = AMOUNT;
    vIsCorrect = true;
}

if (typeof TYPE != 'undefined') {
    if (TYPE == 'DPA') {
        vIsDPA = true;
    }
}

if (vIsDPA) {
    vOptType = '2';
} else {
    vOptType = '3';
}

if(typeof vExternal != 'undefined' && vExternal=='TRUE'){
    vIsExternal=true;
}