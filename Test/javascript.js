var consumedAppQuota = true;
var expiredAppQuota = true;
var passBy = false;
var vSKey = 'NA';
var navInfo = new Object();
var offeringInfo = new Object();
var appInfo = new Object();
var vPaqEntitlement = '';
var vDefaultEntitlement = 'Default_Service_Local';
var vUnSubDef = false;
var extendDuration = false;
var appOfferings = new Object();
var vQueueDate;
var subType = 'POS';
var validPlan = true;
var vSkipValidation = false;
var strStartTimeOld = '';

if(typeof SVC_KEY != 'undefined'){
    vSKey = SVC_KEY;
}

if(typeof vSkipVal != 'undefined'){
    vSkipValidation = vSkipVal.toUpperCase() == 'TRUE';
}

if(typeof vCbsSkipTypes != 'undefined'){
    subType = vCbsSkipTypes;
    passBy = subType.index(vSubscriberType) < 0;
}

vMtr = transformMtr(vMtrProduct, vProductId, vCalendariza, vAprovisiona, '', '', '', vSKey);
vMtrPcc = vMtr.replace(/;/gi, '|');

/*if(typeof vStrInfo != 'undefined'){

    offeringInfo = getJSON(vStrInfo);

    appOfferings = getSupplementaryOfferings(vOfferingId, offeringInfo);

    

    if(appOfferings.length > 0){

        appOfferings = getSortedInstances(appOfferings);

        

        vQueueDate = getCbsDateStr(appOfferings[0].ExpirationTime);

        vEffectiveTime = parseTimeToCBSDate(vQueueDate.getTime());

        vQueueDate.setMinutes(vQueueDate.getMinutes() + vProductDuration);

        vExpireTime = parseTimeToCBSDate(vQueueDate.getTime());

    }

}*/



if(typeof vPaqInfo != 'undefined'){

    navInfo = processJson(vPaqInfo);

    

    if(typeof navInfo.Applications != 'undefined'){

        appInfo = findService(vEntitlement, navInfo.Applications);

        extendDuration = appInfo.queue;

        

        if(extendDuration){
            vEffectiveTime = appInfo.EndDate;
            vExpireTime = appInfo.QueueDate;
            strExpireDate = appInfo.ExpireDateMS;
            //strExpireDateSpr = appInfo.QueueDate;
            strStartTimeOld = appInfo.StartDate;
         vScheduleDateWarning = appInfo.ScheduleDateWarning; 
        }

    }

    

    if(!vSkipValidation){

        switch(vSubscriberType){

            case 'HIB':

            case 'HIC':

            case 'HIB20':

            case 'CIN':

            case 'POS':

                if(typeof navInfo.Plans != 'undefined'){

                    if(typeof navInfo.Plans.QuotaPercentage != 'undefined'){

                        validPlan = new Number(navInfo.Plans.QuotaPercentage) <= 0;

                    }

                }

                break;

            default:

                validPlan = true;

                break;

        }

    }

}

function findService(pService, paqJson){
    var objItem;
    var vServiceEndDate;
    var strServiceEnd = '';
    var strScheduleDateWarning = '';
    var strServiceQueueDate = '';
    var strExpireMS = '';
    var vServiceItem = new Object();
    var doQueue = false;
    var vStarTime = '';

    for(var i = 0; i < paqJson.length; i++){
        objItem = paqJson[i];

        if(objItem.ServiceName == pService){

            doQueue = true;
            //vExpireDate = getProductExpireDate(vDuration, 2, vServiceEndDate);
            vServiceEndDate = getCbsDate(String(objItem.ServiceEndDate));
            strServiceQueueDate = parseTimeToCBSDate(getProductExpireDate(vDuration, vServiceEndDate, 2));
            vServiceEndDate = getCbsDate(strServiceQueueDate);
            strServiceEnd = parseTimeToCBSDate(vServiceEndDate.getTime());
            strExpireMS = parseTimeToDateGeneric(vServiceEndDate.getTime());
            strScheduleDateWarning = parseTimeToScheduleDate(vServiceEndDate.getTime());
            vStarTime = String(objItem.ServiceStartDate);
            break;
        }

    }

    vServiceItem.queue = doQueue;
    vServiceItem.QueueDate = strServiceQueueDate;
    vServiceItem.EndDate = strServiceEnd;
    vServiceItem.ExpireDateMS = strExpireMS;
    vServiceItem.StartDate = vStarTime;
    vServiceItem.ScheduleDateWarning = strScheduleDateWarning;

    return vServiceItem;
}


function getCbsDate(cbsDate){
    var vYear = cbsDate.substring(0, 4);
    var vMonth = new Number(cbsDate.substring(4, 6)) - 1;
    var vDay = cbsDate.substring(6, 8);
    var vHours = cbsDate.substring(8, 10);
    var vMinutes = cbsDate.substring(10, 12);
    var vSeconds = cbsDate.substring(12, 14);

    return new Date(vYear,vMonth,vDay,vHours,vMinutes,vSeconds);
}