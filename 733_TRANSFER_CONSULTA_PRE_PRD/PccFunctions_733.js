function processJson(strJsonInfo){

    var vSubscribedServices;

    var vSubscriberQuotas;

    var vSubscriber;

    var vJsonObj;

    var vDataObj = new Object();

    var vTmpObj = new Object();

    

    if(typeof strJsonInfo != 'undefined'){

        vJsonObj = JSON.parse(strJsonInfo);

        

        if(vJsonObj.getSubscriberAllInfResponse.result.resultCode == 0){

            vSubscriber = vJsonObj.getSubscriberAllInfResponse.result.subscriber;

            

            if(typeof vJsonObj.getSubscriberAllInfResponse.result.subscribedService != 'undefined'){

                vSubscribedServices = vJsonObj.getSubscriberAllInfResponse.result.subscribedService;

                vSubscriberQuotas = vJsonObj.getSubscriberAllInfResponse.result.subscriberQuota;

                

                if(vSubscribedServices instanceof Array){

                  for(var i = 0; i < vSubscribedServices.length; i++){

                    vDataObj = setDataProperties(joinInfo(vSubscribedServices[i], vSubscriberQuotas), vDataObj);

                  }

                } else {

                  vDataObj = setDataProperties(joinInfo(vSubscribedServices, vSubscriberQuotas), vDataObj);

                }

            }

            

            vDataObj.User = joinInfo(undefined, undefined, vSubscriber);

        }

    }

    

    return vDataObj;

}



function getAttribute(serviceItems, attribute){

    var attributeItem = {key: 'NA', value: 'NA'};

    

    if(typeof serviceItems != 'undefined'){

        for(var i = 0; i < serviceItems.attribute.length; i++){

            if(serviceItems.attribute[i].key == attribute){

                attributeItem = serviceItems.attribute[i];

                

                break;

            }

        }

    }

    

    return attributeItem;

}



function getQuota(quotaItems, serviceName){

    var quotaItem = new Array();

    

    if(typeof(quotaItems) != 'undefined'){

        if(quotaItems instanceof Array){

            for(var i = 0; i < quotaItems.length; i++){

                if(getAttribute(quotaItems[i], 'SRVNAME').value == serviceName){

                    quotaItem.push(quotaItems[i]);

                }

            }

        } else {

            if(getAttribute(quotaItems, 'SRVNAME').value == serviceName){

                quotaItem.push(quotaItems);

            }

        }

    }

    

    return quotaItem;

}



function getUniqueQuota(quotaItems){

    var quotaItem;

    

    if(typeof(quotaItems) != 'undefined'){

        if(quotaItems instanceof Array){

            for(var i = 0; i < quotaItems.length; i++){

                if(quotaBL.toUpperCase().indexOf(getAttribute(quotaItems[i], 'QTANAME').value.toUpperCase()) < 0){

                    quotaItem = quotaItems[i];

                    

                    break;

                }

            }

        } else {

            if(quotaBL.toUpperCase().indexOf(getAttribute(quotaItems, 'QTANAME').value.toUpperCase()) < 0){

                quotaItem = quotaItems;

            }

        }

    }

    

    return quotaItem;

}



function joinInfo(serviceItem, quotaItem, subscriberItem){

    var tmpObj = new Object();

    var itemTmp;

    var quotaArray = new Array();

    var tmpQuotaArray = new Array();

    var quotaObj;

    var tmpQuota = new Object();

    

    tmpObj.ServiceName = getAttribute(serviceItem, 'SRVNAME').value;

    tmpObj.ProductName = getAttribute(serviceItem, 'SRVPRODUCTNAME').value;

    

    quotaArray = getQuota(quotaItem, tmpObj.ServiceName);

    

    itemTmp = getAttribute(serviceItem, 'SRVPRODUCTTYPE');

    tmpObj.ServiceType = tmpObj.ServiceName == 'Default_Service_Local' ? 'DEF' : itemTmp.value;

    

    itemTmp = getAttribute(serviceItem, 'SRVPRODUCTTYPEID');

    tmpObj.ServiceTypeId = itemTmp.value;

    tmpObj.ServiceExpired = getAttribute(serviceItem, 'SRVISEXPIRED').value;

    tmpObj.ServiceStartDate = getAttribute(serviceItem, 'SRVSTARTDATETIME').value;

    tmpObj.ServiceEndDate = getAttribute(serviceItem, 'SRVENDDATETIME').value;

    

    if(!plMultiQuota){

        if(quotaArray.length > 0){

            quotaObj = getUniqueQuota(quotaArray);

        }

        

        tmpObj.QuotaName = getAttribute(quotaObj, 'QTANAME').value;

        tmpObj.QuotaValue = getAttribute(quotaObj, 'QTAVALUE').value;

        tmpObj.QuotaBalance = getAttribute(quotaObj, 'QTABALANCE').value;

        tmpObj.QuotaConsumption = getAttribute(quotaObj, 'QTACONSUMPTION').value;

        tmpObj.QuotaValueMb = getAttribute(quotaObj, 'QTAVALUE_MB').value;

        tmpObj.QuotaBalanceMb = getAttribute(quotaObj, 'QTABALANCE_MB').value;

        tmpObj.QuotaConsumptionMb = getAttribute(quotaObj, 'QTACONSUMPTION_MB').value;

        tmpObj.QuotaPercentage = getAttribute(quotaObj, 'QTAPERCENTAGE').value;

        tmpObj.QuotaStatus = getAttribute(quotaObj, 'QTASTATUS').value;

        tmpObj.SubscriberBillCycle = getAttribute(subscriberItem, 'USRBILLCYCLEDATE').value;

    } else {

        

        if(tmpObj.ServiceType == 'PL'){

            

            for(var i = 0; i < quotaArray.length; i++){

                tmpQuota.QuotaName = getAttribute(quotaArray[i], 'QTANAME').value;

                tmpQuota.QuotaValue = getAttribute(quotaArray[i], 'QTAVALUE').value;

                tmpQuota.QuotaBalance = getAttribute(quotaArray[i], 'QTABALANCE').value;

                tmpQuota.QuotaConsumption = getAttribute(quotaArray[i], 'QTACONSUMPTION').value;

                tmpQuota.QuotaValueMb = getAttribute(quotaArray[i], 'QTAVALUE_MB').value;

                tmpQuota.QuotaBalanceMb = getAttribute(quotaArray[i], 'QTABALANCE_MB').value;

                tmpQuota.QuotaConsumptionMb = getAttribute(quotaArray[i], 'QTACONSUMPTION_MB').value;

                tmpQuota.QuotaPercentage = getAttribute(quotaArray[i], 'QTAPERCENTAGE').value;

                tmpQuota.QuotaStatus = getAttribute(quotaArray[i], 'QTASTATUS').value;

                

                tmpQuotaArray.push(tmpQuota);

                tmpQuota = new Object();

            }

            

            tmpObj.Quotas = tmpQuotaArray;

        } else {

            if(quotaArray.length > 0){

                quotaObj = getUniqueQuota(quotaArray);

            }

            

            tmpObj.QuotaName = getAttribute(quotaObj, 'QTANAME').value;

            tmpObj.QuotaValue = getAttribute(quotaObj, 'QTAVALUE').value;

            tmpObj.QuotaBalance = getAttribute(quotaObj, 'QTABALANCE').value;

            tmpObj.QuotaConsumption = getAttribute(quotaObj, 'QTACONSUMPTION').value;

            tmpObj.QuotaValueMb = getAttribute(quotaObj, 'QTAVALUE_MB').value;

            tmpObj.QuotaBalanceMb = getAttribute(quotaObj, 'QTABALANCE_MB').value;

            tmpObj.QuotaConsumptionMb = getAttribute(quotaObj, 'QTACONSUMPTION_MB').value;

            tmpObj.QuotaPercentage = getAttribute(quotaObj, 'QTAPERCENTAGE').value;

            tmpObj.QuotaStatus = getAttribute(quotaObj, 'QTASTATUS').value;

            tmpObj.SubscriberBillCycle = getAttribute(subscriberItem, 'USRBILLCYCLEDATE').value;

        }

    }

    

    return tmpObj;

}



function setDataProperties(objItem, dataItem){

    switch(objItem.ServiceType){

        case 'PAQ':

            dataItem.Packages = objItem;

            break;

        case 'SUS':

            dataItem.Subscriptions = objItem;

            break;

        case 'PL':

            dataItem.Plans = objItem;

            break;

        case 'APP':

            if(typeof dataItem.Applications == 'undefined'){

                dataItem.Applications = new Array();

            }

            dataItem.Applications.push(objItem);

            break;

        case 'ADD':

            if(typeof dataItem.Addons == 'undefined'){

                dataItem.Addons = new Array();

            }

            dataItem.Addons.push(objItem);

            break;

        case 'DEF':

            dataItem.DefaultService = objItem;

            break;

        case 'SUB':

            dataItem.User = objItem;

            break;

        default:

            if(typeof dataItem.Unbound == 'undefined'){

                dataItem.Unbound = new Array();

            }

            dataItem.Unbound.push(objItem);

    }

    

    return dataItem;

}