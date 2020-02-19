var vCreatePcc = false;

var allowError = true;

if(typeof PCCGetSubscriberAllInfTask__platformErrorCode != 'undefined'){

    if(PCCGetSubscriberAllInfTask__platformErrorCode == '12302' || PCCGetSubscriberAllInfTask__platformErrorCode == '' || PCCGetSubscriberAllInfTask__platformErrorCode == ' ' || PCCGetSubscriberAllInfTask__platformErrorCode == null || PCCGetSubscriberAllInfTask__platformErrorCode == 'null'){

        vCreatePcc = true;

    } else {

        allowError = false;

    }

}


LOGGER.info(tLinea+'vCreatePcc:'+vCreatePcc+tLinea);
LOGGER.info(tLinea+'PCCGetSubscriberAllInfTask__platformErrorCode:'+PCCGetSubscriberAllInfTask__platformErrorCode+tLinea);



