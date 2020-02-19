if(typeof vBillingDay != 'undefined'){
    if(vBillingDay == '00' || vBillingDay == '0'){
        vBillingDay = '1';
    }
} else{
    var vBillingDay = '1';
}

LOGGER.info(tLinea+'Llego a Validar BillingDay'+tLinea);