var vAmount = '0';
var vDepositType = 'C_DEPOSITO_PAGO_EN_GARANTIA';
var vPaymentType = '';
var vPaymentNumber = transactionId;
var vChannelID = channelId;
var vOptType = '';
var vPayMethod = '1001';
var vCurrency = '1061';
var vIsCorrect = false;
var vIsDPA = false;


vPaymentType = '1';


if (typeof amount != 'undefined') {
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