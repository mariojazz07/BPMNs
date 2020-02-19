var vAmount=AMOUNT;
var vDepositType='C_DEPOSITO_PAGO_EN_GARANTIA';
var vPaymentType='';
var vPaymentNumber='';
var vChannelID='';
var vOptType='';
var vPayMethod='1001';
var vCurrency='1061';
var vIsCorrect=false;
var vIsDPA=false;


if(typeof TYPE != 'undefined'){
    if(TYPE=='DPA'){
        vIsDPA=true;
    }
}

