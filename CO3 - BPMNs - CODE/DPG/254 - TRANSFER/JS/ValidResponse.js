var vIsOK=false;
var vDPGTotalAmount='';
var vDPATotalAmount='';
var pipe='|';

if(typeof vResponseCode != 'undefined'){
    if(vResponseCode=='0'){
        vIsOK=true;
    }
}

if(typeof vMainBillingAccount != 'undefined'){
    vDPATotalAmount=vMainBillingAccount;
}

if (typeof vDPGAmount != 'undefined'){
    vDPGTotalAmount=vDPAAmount;
}






//LOGGER.info(tLinea+'Llego a Validar ValidarPCC'+tLinea);