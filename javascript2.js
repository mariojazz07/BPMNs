var validPlan = false;
var validType = false;
var sendDeezer = false;
var validatePlan = false;
var sendZeroTrigger = false;
var sendWarning = true;
var validateBlackberry = false;
var cbsCharge = true;
var vProductId = productId;
var vProductDuration = parseInt(vDuration);
var vMtr = '';
var vAprovisiona = 'A';
var vCalendariza = 'N';
var vDynamicRental = false;
var vDynamicValue = '0';
var isBlackberry = false;

if(typeof vDynamicRentalProp != 'undefined'){
    vDynamicRental = vDynamicRentalProp.toUpperCase() == 'TRUE'; 
}
if(typeof vOfferingId == 'undefined'){
    if(typeof OFFERING != 'undefined'){
        var vOfferingId = OFFERING;
    }
}
if(typeof vDynamicValueProp != 'undefined'){
    vDynamicValue = vDynamicValueProp;
}
if(typeof vCbs != 'undefined'){
    cbsCharge = vCbs == 'TRUE';
}
if(typeof vPlanName == 'undefined'){
    var vPlanName = 'N/A';
}
if(typeof vBlackBerry != 'undefined'){
    validateBlackberry = vBlackBerry == 'TRUE';
}
validType = vAllowedTypes.indexOf(vSubscriberType) >= 0;
if(vSubscriberType == 'PRE'){
    validPlan = true;
} else{
    validatePlan = true;
    validPlan = false;
}
if(typeof vDeezer != 'undefined'){
    sendDeezer = vDeezer == 'TRUE';
}
if(typeof vSendSms != 'undefined'){
    sendSms = vSendSms == 'TRUE';
}
if(typeof vSendZeroBalanceTrigger != 'undefined'){
    sendZeroTrigger = vSendZeroBalanceTrigger == 'TRUE';
}
if(typeof vMappedProduct != 'undefined'){
    if(vMappedProduct != '0'){
        vProductId = vMappedProduct;
    }
}