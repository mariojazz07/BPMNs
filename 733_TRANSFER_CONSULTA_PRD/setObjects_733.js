var navObject = setNavObjects();
var enrichedOfferings = {appOfferings: [], susOfferings: [], cmbOfferings: [], packOfferings: [], undefOfferings: []};
var bPckOffers = new Array();
var supplementaryOffers = new Array();
var subscriptionItems = new Array();
var packageWallet;
var tmpOffers;
var activePackSeq = '0';
var activeAppsSeq = new Array();
var packInstances;
var tmpInstances;
if(navObject.offeringJson.filled){
    supplementaryOffers = getSupplementaryOfferings('', navObject.offeringJson.obj);
}
if(navObject.walletJson.filled){
    packageWallet = getWalletObj(strPackBalance, navObject.walletJson);
}
if(typeof(packageWallet) != 'undefined'){
    tmpOffers = getSortedItems(packageWallet.FreeUnitItemDetail);
    activePackSeq = tmpOffers.length > 0 ? tmpOffers[0].FreeUnitOrigin.OfferingKey.PurchaseSeq : '0';
}

function setNavObjects(){
    var navObject = {walletJson:{filled:false}, offeringJson:{filled:false}, pccJson:{filled: false}};
    if(typeof(vFreeUnitWallets) != 'undefined'){
        navObject.walletJson.obj = getJSON(vFreeUnitWallets);
        navObject.walletJson.filled = true;
    }
    if(typeof(vStrOfferingInfo) != 'undefined'){
        navObject.offeringJson.obj = getJSON(vStrOfferingInfo);
        navObject.offeringJson.filled = true;
    }
    if(typeof(vStrPcc) != 'undefined'){
        navObject.pccJson.obj = processJson(vStrPcc);
        navObject.pccJson.filled = true;
    }
    return navObject;
}
function getWalletObj(walletName, walletObj){
    var tmpItm;
    if(walletObj.filled){
        tmpItm = getWalletByType(walletName, walletObj.obj);
    }
    return tmpItm;
}

function setEnrichment(pEnriched, enrichedItem){
    var enrichedObj = pEnriched;
    switch(enrichedItem.offerType){
        case 'APP':
            enrichedObj.appOfferings.push(enrichedItem);
            break;
        case 'SUS':
        case 'SUSAPP':
            enrichedObj.susOfferings.push(enrichedItem);
            break;
        case 'PAQ':
            enrichedObj.packOfferings.push(enrichedItem);
            break;
        case 'CMB':
            enrichedObj.cmbOfferings.push(enrichedItem);
            break;
        default:
            enrichedObj.undefOfferings.push(enrichedItem);
            break;
    }
    return enrichedObj;
}

function splitInstances(itemArray, activeId){
    var activeInstance = new Object();
    var queuedInstances = new Array();
    var splitObj = new Array();
    var strtIdx = 0;
    if(itemArray instanceof Array){
        if(itemArray.length > 0){
            if(activeId == itemArray[0].FreeUnitOrigin.OfferingKey.PurchaseSeq){
                activeInstance = itemArray[0];
                strtIdx = 1;
            }
            if(itemArray.length >= 1){
                for(var i = strtIdx; i < itemArray.length; i++){
                    queuedInstances.push(itemArray[i]);
                }
            }
        }
    } else {
        if(activeId == itemArray.FreeUnitOrigin.OfferingKey.PurchaseSeq){
            activeInstance = itemArray;
        } else{
            queuedInstances.push(itemArray);
        }
    }
    splitObj.active = activeInstance;
    splitObj.queued = queuedInstances;
    return splitObj;
}
function snatchInstances(itemArray, offeringLst, include, snatchIns, snatchSeq){
    var snatchedInstances = new Array();
    var snatchId = '';
    if(itemArray instanceof Array){
        for(var i = 0; i < itemArray.length; i++){
            if(snatchSeq){
                if(snatchIns){
                    snatchId = itemArray[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
                } else {
                    snatchId = itemArray[i].OfferingKey.PurchaseSeq;
                }
            } else{
                if(snatchIns){
                    snatchId = itemArray[i].FreeUnitOrigin.OfferingKey.OfferingID;
                } else {
                    snatchId = itemArray[i].OfferingKey.OfferingID;
                }
            }
            if(include){
                if(existsOffer(offeringLst, snatchId)){
                    snatchedInstances.push(itemArray[i]);
                }
            } else {
                if(!existsOffer(offeringLst, snatchId)){
                    snatchedInstances.push(itemArray[i]);
                }
            }
        }
    } else {
        if(snatchSeq){
            if(snatchIns){
                snatchId = itemArray.FreeUnitOrigin.OfferingKey.PurchaseSeq;
            } else {
                snatchId = itemArray.OfferingKey.PurchaseSeq;
            }
        } else{
            if(snatchIns){
                snatchId = itemArray.FreeUnitOrigin.OfferingKey.OfferingID;
            } else {
                snatchId = itemArray.OfferingKey.OfferingID;
            }
        }
        if(include){
            if(existsOffer(offeringLst, snatchId)){
                snatchedInstances.push(itemArray);
            }
        } else {
            if(!existsOffer(offeringLst, snatchId)){
                snatchedInstances.push(itemArray);
            }
        }
    }
    return snatchedInstances;
}
function existsOffer(offerLst, offerSeq){
    var flag = false;
    if(offerLst instanceof Array){
        for(var i = 0; i < offerLst.length; i++){
            if(offerLst[i] == offerSeq){
                flag = true;
                break;
            }
        }
    } else {
        flag = offerLst == offerSeq;
    }
    return flag;
}
function setPackageItems(instances, queue){
    var packItem;
    var tmpItem;
    var currentAmtBts = 0;
    var initialAmtBts = 0;
    var consumptionAmtBts = 0;
    var itmClass = !queue ? 'Vigente' : 'Pendiente';
    var itmOffer = '';
    var itmProduct = '';
    var itmPurchaseSeq = '';
    var itmName = '';
    var itmType = 'Paquete';
    var itmMeasure = 'MB';
    var itmServiceStart = '';
    var itmServiceEnd = '';
    var itmQtaPrcntg = '';
    var itmQtaValue = '';
    var itmQtaConsumption = '';
    var itmQtaBalance = '';
    if(instances instanceof Array){
        packItem = new Array();
        for(var i = 0; i < instances.length; i++){
            tmpItem = new Object();
            currentAmtBts = new Number(instances[i].CurrentAmount);
            initialAmtBts = new Number(instances[i].InitialAmount);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = instances[i].FreeUnitOrigin.OfferingKey.OfferingID;
            itmProduct = "0";
            itmPurchaseSeq = instances[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
            itmName = instances[i].FreeUnitOrigin.OfferingKey.OfferingName;
            itmServiceStart = instances[i].EffectiveTime;
            itmServiceEnd = instances[i].ExpireTime;
            itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            itmQtaValue = getUnit(initialAmtBts, 'KB');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
            itmQtaBalance = getUnit(currentAmtBts, 'KB');
            tmpItem = setItem(itmOffer, itmProduct, itmPurchaseSeq, itmName, itmType, itmMeasure, itmServiceStart, 
                itmServiceEnd, itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, false, false, true);
            packItem.push(tmpItem);
        }
    } else {
        packItem = new Object();
        if(typeof(instances.CurrentAmount) != 'undefined'){
            currentAmtBts = new Number(instances.CurrentAmount);
            initialAmtBts = new Number(instances.InitialAmount);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = instances.FreeUnitOrigin.OfferingKey.OfferingID;
            itmProduct = "0";
            itmPurchaseSeq = instances.FreeUnitOrigin.OfferingKey.PurchaseSeq;
            itmName = instances.FreeUnitOrigin.OfferingKey.OfferingName;
            itmServiceStart = instances.EffectiveTime;
            itmServiceEnd = instances.ExpireTime;
            itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            itmQtaValue = getUnit(initialAmtBts, 'KB');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
            itmQtaBalance = getUnit(currentAmtBts, 'KB');
            packItem = setItem(itmOffer, itmProduct, itmPurchaseSeq, itmName, itmType, itmMeasure, itmServiceStart, 
                itmServiceEnd, itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, false, false, true);
        }
    }
    return packItem;
}
function setItem(pOffering, pProduct, pPurchaseSeq, pName, pType, pMeasure, pServiceStart, 
    pServiceEnd, pQtaPcntg, pQtaValue, pQtaConsumption, pQtaBalance, pClass, isApp, addActive, pActive){
    var objItem = new Object();
    objItem.offering = pOffering;
    objItem.productId = pProduct;
    objItem.purchase_seq = pPurchaseSeq;
    objItem.product_name = pName;
    objItem.type_name = pType;
    objItem.measure = pMeasure;
    objItem.service_start = pServiceStart;
    objItem.service_end = pServiceEnd;
    if(!isApp){
        objItem.qta_percentage = pQtaPcntg;
        objItem.qta_value = pQtaValue;
        objItem.qta_consumption = pQtaConsumption;
        objItem.qta_balance = pQtaBalance;
    } else{
        objItem.hour_percentage = pQtaPcntg;
        objItem.total_hours = pQtaValue;
        objItem.hours_consumed = pQtaConsumption;
        objItem.hours_remaining = pQtaBalance;
    }
    if(addActive){
        objItem.active = pActive;
    }
    objItem["class"] = pClass;
    return objItem;
}
function setItemSubs(pOffering, pProduct, pPurchaseSeq, pName, pType, pMeasure, pServiceStart, 
    pServiceEnd, pQtaPcntg, pQtaValue, pQtaConsumption, pQtaBalance, pClass, isApp, addActive, pActive){
    var objItem = new Object();
    objItem.offering = pOffering;
    objItem.productId = pProduct;
    objItem.purchase_seq = pPurchaseSeq;
    objItem.product_name = pName;
    objItem.type_name = pType;
    objItem.measure = pMeasure;
    objItem.service_start = pServiceStart;
    objItem.next_renewal = pServiceEnd;
    if(!isApp){
        objItem.qta_percentage = pQtaPcntg;
        objItem.qta_value = pQtaValue;
        objItem.qta_consumption = pQtaConsumption;
        objItem.qta_balance = pQtaBalance;
    } else{
        objItem.hour_percentage = pQtaPcntg;
        objItem.total_hours = pQtaValue;
        objItem.hours_consumed = pQtaConsumption;
        objItem.hours_remaining = pQtaBalance;
    }
    if(addActive){
        objItem.active = pActive;
    }
    objItem["class"] = pClass;
    return objItem;
}
function getUnit(val, unit){
    var btKb = 1024;
    var kbMb = 1024;
    var valMB = '0';
    switch(unit){
        case "BT":
            valMB = String(new Number(Math.ceil((val / 1024) / 1024)).toFixed(2));
            break;
        case "KB":
            valMB = String(new Number(Math.ceil(val / 1024).toFixed(2)));
            break;
        default:
            valMB = String(val);
            break;
    }
    return valMB;
}
function setPackage(pInstances){
    var packItem = new Object();
    packItem.active = setPackageItems(pInstances.active, false);
    packItem.queued = setPackageItems(pInstances.queued, true);
    return packItem;
}
function setApplications(pInstances){
    var appItem = new Object();
    appItem.active = setAppItems(pInstances.active, false);
    appItem.queued = setAppItems(getSortedItems(pInstances.queued), true);
    return appItem;
}
function splitApps(itemArray){
    var appArray = new Array();
    var tmpArray;
    var bustedOffers = new Array();
    var tmpId;
    for(var i = 0; i < itemArray.length; i++){
        tmpId = itemArray[i].OfferingKey.OfferingID;
        if(!existsOffer(bustedOffers, tmpId)){
            bustedOffers.push(tmpId);
            LOGGER.info('tmpId:' + tmpId);
            tmpArray = getSortedItems(snatchInstances(itemArray, tmpId, true, false, false));
            LOGGER.info('tmpArray:' + tmpArray.length);
            if(tmpArray.length > 0){
                appArray.push(tmpArray);
            }
        }
    }
    LOGGER.info('appArray:' + JSON.stringify(appArray));
    return appArray;
}
function splitOffers(pApps, pActiveIds){
    var appItem = new Object();
    var activeOffers = new Array();
    var queuedOffers = new Array();
    var tmpArray;
    for(var i = 0; i < pApps.length; i++){
        tmpArray = pApps[i];
        for(var j = 0; j < tmpArray.length; j++){
            if(existsOffer(pActiveIds, tmpArray[j].OfferingKey.PurchaseSeq)){
                activeOffers.push(tmpArray[j]);
            } else {
                queuedOffers.push(tmpArray[j]);
            }
        }
    }
    appItem.active = activeOffers;
    appItem.queued = queuedOffers;
    return appItem;
}
function setAppItems(instances, queue){
    var packItem;
    var tmpItem;
    var currentAmtBts = 0;
    var initialAmtBts = 0;
    var consumptionAmtBts = 0;
    var itmClass = !queue ? 'Vigente' : 'Pendiente';
    var itmOffer = '';
    var itmProduct = '';
    var itmPurchaseSeq = '';
    var itmName = '';
    var itmType = 'Aplicacion';
    var itmMeasure = 'Hrs';
    var itmServiceStart = '';
    var itmServiceEnd = '';
    var itmQtaPrcntg = '';
    var itmQtaValue = '';
    var itmQtaConsumption = '';
    var itmQtaBalance = '';
    if(instances instanceof Array){
        packItem = new Array();
        for(var i = 0; i < instances.length; i++){
            tmpItem = new Object();
            itmServiceStart = instances[i].EffectiveTime;
            itmServiceEnd = instances[i].ExpirationTime;
            currentAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, true);
            initialAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, false);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = typeof(instances[i].OfferingKey) != 'undefined' ? instances[i].OfferingKey.OfferingID : '0';
            itmProduct = typeof(instances[i].productId) != 'undefined' ? instances[i].productId : '0';
            itmPurchaseSeq = typeof(instances[i].OfferingKey) != 'undefined' ? instances[i].OfferingKey.PurchaseSeq : '0';
            itmName = instances[i].offerName;
            itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            itmQtaValue = getUnit(initialAmtBts, 'HR');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'HR');
            itmQtaBalance = getUnit(currentAmtBts, 'HR');
            tmpItem = setItem(itmOffer, itmProduct, itmPurchaseSeq, itmName, itmType, itmMeasure, itmServiceStart, 
                itmServiceEnd, itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, true, false, true);
            packItem.push(tmpItem);
        }
    } else {
        packItem = new Object();
        if(typeof(instances.CurrentAmount) != 'undefined'){
            itmServiceStart = instances.EffectiveTime;
            itmServiceEnd = instances.ExpirationTime;
            currentAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, true);
            initialAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, false);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = typeof(instances.OfferingKey) != 'undefined' ? instances.OfferingKey.OfferingID : '0';
            itmProduct = typeof(instances.productId) != 'undefined' ? instances.productId : '0';
            itmPurchaseSeq = typeof(instances.OfferingKey) != 'undefined' ? instances.OfferingKey.PurchaseSeq : '0';
            itmName = instances.offerName;
            itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            itmQtaValue = getUnit(initialAmtBts, 'HR');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'HR');
            itmQtaBalance = getUnit(currentAmtBts, 'HR');
            packItem = setItem(itmOffer, itmProduct, itmPurchaseSeq, itmName, itmType, itmMeasure, itmServiceStart, 
                itmServiceEnd, itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, true, false, true);
        }
    }
    return packItem;
}
function getHoursDiff(pIni, pFin, sysdate){
    var initialDate = !sysdate ? getCbsDate(pIni) : new Date();
    var endDate = getCbsDate(pFin);
    var vDiffMillis = Math.abs(endDate.getTime() - initialDate.getTime());
    var vHourDiff = Math.ceil(vDiffMillis / (60*60*1000))
    return vHourDiff;
}
function getActiveApps(pArray){
    var activeArray = new Array();
    for(var i = 0; i < pArray.length; i++){
        if(pArray[i] instanceof Array){
            activeArray.push(pArray[i][0].OfferingKey.PurchaseSeq);
        } else {
            activeArray.push(pArray[i].OfferingKey.PurchaseSeq);
        }
    }
    return activeArray;
}