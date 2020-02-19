var vIsOK = false;
var vDPGCurrentAmount = '';
var vDPACurrentAmount = '';
var vDPGInitialAmount = '';
var vDPAInitialAmount = '';
var vDPGStatus = '';
var vDPAStatus = '';
var pipe = '|';


if (vIsDPG) {
    vDPGCurrentAmount = parseFloat(vDPGAmount).toFixed(2);
} else if (vIsDPA) {
    vDPACurrentAmount = parseFloat(vMainBillingAccount).toFixed(2);
}




if (typeof JsonMS != 'undefined') {

    if (vIsDPG) {
        
        vDPGInitialAmount = getMSAttributes('INITIAL_AMOUNT', JsonMS);
        vDPGStatus = getMSAttributes('STATUS', JsonMS);
    } else if (vIsDPA) {
        vDPAInitialAmount = getMSAttributes('INITIAL_AMOUNT', JsonMS);
        vDPACurrentAmount=getMSAttributes('CURRENT_AMOUNT',JsonMS);
        vDPAStatus = getMSAttributes('STATUS', JsonMS);
    }


   // if (vIsDPG && vDPGStatus != 'DEVUELTO') {
    if (vIsDPG) {
        vIsOK = true;
        var DEPOSIT_INITIAL_AMOUNT = vDPGInitialAmount;
        var DEPOSIT_CURRENT_AMOUNT = vDPGCurrentAmount.toString();
        var DEPOSIT_STATUS = vDPGStatus;
    //} else if (vIsDPA && vDPAStatus != 'DEVUELTO') {
    } else if (vIsDPA) {
        vIsOK = true;
        var DEPOSIT_INITIAL_AMOUNT = vDPAInitialAmount;
        //var DEPOSIT_CURRENT_AMOUNT = vDPACurrentAmount.toString();
        var DEPOSIT_CURRENT_AMOUNT = vDPACurrentAmount;
        var DEPOSIT_STATUS = vDPAStatus;
    }
    

}
