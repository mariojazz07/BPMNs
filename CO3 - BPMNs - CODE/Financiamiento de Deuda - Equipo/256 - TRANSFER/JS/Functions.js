function getFinancialDate(InstallDate) {
    var vYear = InstallDate.substring(0, 4);
    var vMonth = new Number(InstallDate.substring(4, 6)) - 1;
    var vDay = InstallDate.substring(6, 8);
    var vHours = InstallDate.substring(8, 10);
    var vMinutes = InstallDate.substring(10, 12);
    var vSeconds = InstallDate.substring(12, 14);
    return new Date(vYear, vMonth, vDay, vHours, vMinutes, vSeconds);
}

function getMSAttributes(vName, MSJson) {
    var vList = JSON.parse(MSJson);
    //var vAttributeList=vList.atributeList;
    var vValue='';
    

    for (var i = 0; i < vList.length; i++) {
        if (vList[i].name == vName) {
            vValue = vList[i].value;
            break;
        }
    }

    return vValue;
}

function getJSON(strJson) {
    var vExpr = '([b,c,s]+|[t*,n,s,(0-9)*]+|[v,(0-9)*]+):';
    var vNumExpr = '("[a-z]+":)([0-9]+)(\s*,|}|$)';
    var regEx;
    var numRegExp;
    var tmpJson = '';
    if (typeof REG_EXP != 'undefined') {
        vExpr = REG_EXP;
    }
    regEx = new RegExp(vExpr, 'gi');
    numRegExp = new RegExp(vNumExpr, 'gmi');
    tmpJson = strJson.replace(regEx, '');
    tmpJson = tmpJson.replace(numRegExp, '$1"$2"$3');
    return JSON.parse(tmpJson);
}

function getSupplementaryOfferings(validOfferings, jsonObj) {
    var offeringObj;
    var supplementaryOfferings;
    var vItem;
    var vOfferingItem;
    var vOfferings = new Array();
    if (typeof (jsonObj.QueryCustomerInfoResultMsg) != 'undefined') {
        supplementaryOfferings = jsonObj.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Subscriber.SupplementaryOffering;
    }
    if (typeof (supplementaryOfferings) != 'undefined') {
        if (supplementaryOfferings instanceof Array) {
            for (var i = 0; i < supplementaryOfferings.length; i++) {
                vItem = supplementaryOfferings[i];
                vOfferingItem = vItem.OfferingKey;
                if (typeof (vOfferingItem) != 'undefined') {
                    if (isValidOffering(validOfferings, vOfferingItem.OfferingID) || validOfferings == '') {
                        vOfferings.push(vItem);
                    }
                }
            }
        } else {
            vOfferingItem = supplementaryOfferings.OfferingKey;
            if (typeof (vOfferingItem) != 'undefined') {
                if (isValidOffering(validOfferings, vOfferingItem.OfferingID) || validOfferings == '') {
                    vOfferings.push(supplementaryOfferings);
                }
            }
        }
    }
    return vOfferings;
}

function isValidOffering(validOfferings, offering) {
    var flag = false;
    var tmpArray = validOfferings.split(',');
    for (var i = 0; i < tmpArray.length; i++) {
        if (tmpArray[i] == offering) {
            flag = true;
            break;
        }
    }
    return flag;
}

function getProcessedInstallments(processedCycles, DateInit, infoJson, vOfferingE) {
    var vSubscriberObject = getJSON(infoJson);
    var vOfferingItems = getSupplementaryOfferings(vOfferingE, vSubscriberObject);

    //var vInitDate = getFinancialDate(DateInit);
    var vInitDate=DateInit;
    var vTmpDate = new Date();
    var vYear = '';
    var vMonth = '';
    var vDay = '';
    var vTmpObject = new Object();
    var vProcessedObject=new Array();

    for (var i = 1; i <= parseInt(processedCycles); i++) {
        vTmpObject = new Object();
        //vTmpDate = new Date(vInitDate);
        vTmpDate=vInitDate;
        //LOGGER.info(tLinea+'vInitDate:'+vInitDate+tLinea);
        vTmpDate.setMonth(vTmpDate.getMonth() + i);

        vYear = vTmpDate.getFullYear();
        vMonth = (vTmpDate.getMonth()) < 10 ? '0' + (vTmpDate.getMonth()) : (vTmpDate.getMonth());
        vDay = (vTmpDate.getDate()) < 10 ? '0' + vTmpDate.getDate() : vTmpDate.getDate();
        vTmpObject.InstallNumber = i;
        vTmpObject.Date = vYear.toString() + vMonth.toString() + vDay.toString();
        
        vTmpObject.Status = "closed";
        vProcessedObject.push(vTmpObject);


    }

    return vProcessedObject;

}

var tSaltoL = '\n';

var tLinea = tSaltoL + '************************************************************************' + tSaltoL ;