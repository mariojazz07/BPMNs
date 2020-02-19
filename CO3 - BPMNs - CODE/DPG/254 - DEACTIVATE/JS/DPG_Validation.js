var vAmount='0';
var vDepositType='C_DEPOSITO_PAGO_EN_GARANTIA';
var vPaymentType='';
var vPaymentNumber='';
var vChannelID='';
var vOptType='';
var vPayMethod='1001';
var vCurrency='1153';
var vIsCorrect=false;
var vIsDPA=false;
var vIsDPG=false;
var vIsAffected=false;

if(eventType=='AFECTACION_DPG'){
    vIsAffected=true;
}
if (typeof AMOUNT != 'undefined'){
    vAmount=AMOUNT;
    vIsCorrect=true;
}

if(typeof TYPE != 'undefined'){
    if(TYPE=='DPG'){
        vIsDPG=true;
    }
    else if(TYPE=='DPA'){
        vIsDPA=true;
    }
}

