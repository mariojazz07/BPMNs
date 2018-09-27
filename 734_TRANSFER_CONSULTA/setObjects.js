var navObject = setNavObjects();
var enrichedOfferings = {
    appOfferings: [],
    susOfferings: [],
    cmbOfferings: [],
    packOfferings: [],
    undefOfferings: [],
    planOfferings: []
    //,addonsOfferings: [],addonsT2Offerings: []
};
var bPckOffers = new Array();
var supplementaryOffers = new Array();
var primaryOffers = new Array();
var subscriptionItems = new Array();
var packageWallet;
var planWallet;
var addonWallet;
var tmpOffers;
var tmpOffers_plan;
var tmpOffers_addons;
var activePackSeq = '0';
var activePlanSeq = '0';
var activeAddSeq = '0';
var activeAppsSeq = new Array();
var packInstances;
var planInstances;
var addInstances;
var tmpInstances;
var tmpInstances_plan;
var tmpInstances_add;
var tmpInstances_addT2;
var planBillCycle = '-';
var vACLExist=false;

if(typeof vExists!= 'undefined'){
    if(vExists=='true'){
        vACLExist=true;
    }
}

if (navObject.offeringJson.filled) {
    supplementaryOffers = getSupplementaryOfferings("", navObject.offeringJson.obj);
    primaryOffers = getPrimaryOfferings("", navObject.offeringJson.obj);
    planBillCycle = getBillCycleCBS(navObject.offeringJson.obj);
}

if (navObject.walletJson.filled) {
    packageWallet = getWalletObj(strPackBalance, navObject.walletJson);
    planWallet = getWalletObj(strPlanBalance, navObject.walletJson);
    addonWallet = getWalletObj(strAddonBalance, navObject.walletJson);
}

if (typeof (packageWallet) != 'undefined') {
    tmpOffers = getSortedItems(packageWallet.FreeUnitItemDetail);
    activePackSeq = tmpOffers.length > 0 ? tmpOffers[0].FreeUnitOrigin.OfferingKey.PurchaseSeq : '0';
}

if (typeof (planWallet) != 'undefined') {
    //tmpOffers_plan = getSortedItems(planWallet.FreeUnitItemDetail);
    tmpOffers_plan = getSortedItemsPospaid(planWallet.FreeUnitItemDetail);
    activePlanSeq = tmpOffers_plan.length > 0 ? tmpOffers_plan[0].FreeUnitOrigin.OfferingKey.PurchaseSeq : '0';
}

if (typeof (addonWallet) != 'undefined') {
    tmpOffers_addons = getSortedItems(addonWallet.FreeUnitItemDetail);
    activeAddSeq = tmpOffers_addons.length > 0 ? tmpOffers_addons[0].FreeUnitOrigin.OfferingKey.PurchaseSeq : '0';
}

function setNavObjects() {
    var navObject = {walletJson: {filled: false},offeringJson: {filled: false},pccJson: {filled: false}};

    if (typeof (vFreeUnitWallets) != 'undefined') {
        navObject.walletJson.obj = getJSON(vFreeUnitWallets);
        navObject.walletJson.filled = true;
    }

    if (typeof (vStrOfferingInfo) != 'undefined') {
        navObject.offeringJson.obj = getJSON(vStrOfferingInfo);
        navObject.offeringJson.filled = true;
    }

    if (typeof (vStrPcc) != 'undefined') {
        navObject.pccJson.obj = processJson(vStrPcc);
        navObject.pccJson.filled = true;
    }

    return navObject;
}

function getWalletObj(walletName, walletObj) {
    var tmpItm;
    if (walletObj.filled) {
        tmpItm = getWalletByType(walletName, walletObj.obj);
    }
    return tmpItm;
}

function setEnrichment(pEnriched, enrichedItem) {
    var enrichedObj = pEnriched;
    switch (enrichedItem.offerType) {
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
        case 'PLAN':
            enrichedObj.planOfferings.push(enrichedItem);
            break;
            // case 'ADD':
            //     enrichedObj.addonsOfferings.push(enrichedItem);
            //     break;
            // case 'ADDRET':
            //     enrichedObj.addonsT2Offerings.push(enrichedItem);
            //     break;
        default:
            enrichedObj.undefOfferings.push(enrichedItem);
            break;
    }
    return enrichedObj;
}

function splitInstancesPlan(itemArray, activeId) {
    var activeInstance = new Object();
    var queuedInstances = new Array();
    var splitObj = new Array();
    var strtIdx = 0;
    if (itemArray instanceof Array) {
        if (itemArray.length > 0) {
            for (var i = 0; i < itemArray.length; i++) {
                 if(java.lang.Thread.interrupted()){
				break;
			}
                if (activeId == itemArray[i].FreeUnitOrigin.OfferingKey.PurchaseSeq) {
                    activeInstance = itemArray[i];
                    //strtIdx = 1;
                }
                // if (itemArray.length >= 1) {
                //     for (var i = strtIdx; i < itemArray.length; i++) {
                //         queuedInstances.push(itemArray[i]);
                //     }
                // }
            }
        }
    } else {
        if (activeId == itemArray.FreeUnitOrigin.OfferingKey.PurchaseSeq) {
            activeInstance = itemArray;
        } else {
            queuedInstances.push(itemArray);
        }
    }
    splitObj.active = activeInstance;
    //splitObj.queued = queuedInstances;
    return splitObj;
}

function splitInstancesAddons(itemArray, activeOff) {
    var addRetInstance = new Object();
    var addInstance = new Array();
    var splitObj = new Array();
    if (itemArray instanceof Array) {
        if (itemArray.length > 0) {
            for (var i = 0; i < itemArray.length; i++) {
                 if(java.lang.Thread.interrupted()){
				break;
			}
                if (activeOff == itemArray[i].FreeUnitOrigin.OfferingKey.OfferingID) {
                    addRetInstance = itemArray[i];
                } else {
                    addInstance.push(itemArray[i]);
                }
            }
        }
    } else {
        if (activeOff == itemArray.FreeUnitOrigin.OfferingKey.OfferingID) {
            addRetInstance = itemArray;
        } else {
            addInstance.push(itemArray);
        }
    }
    splitObj.addonsT2 = addRetInstance;
    splitObj.addons = addInstance;
    return splitObj;
}

function splitInstances(itemArray, activeId) {
    var activeInstance = new Object();
    var queuedInstances = new Array();
    var splitObj = new Array();
    var strtIdx = 0;
    if (itemArray instanceof Array) {
        if (itemArray.length > 0) {
            if (activeId == itemArray[0].FreeUnitOrigin.OfferingKey.PurchaseSeq) {
                activeInstance = itemArray[0];
                strtIdx = 1;
            }
            if (itemArray.length >= 1) {
                for (var i = strtIdx; i < itemArray.length; i++) {
                    if(java.lang.Thread.interrupted()){
				break;
			}
                    queuedInstances.push(itemArray[i]);
                }
            }
        }
    } else {
        if (activeId == itemArray.FreeUnitOrigin.OfferingKey.PurchaseSeq) {
            activeInstance = itemArray;
        } else {
            queuedInstances.push(itemArray);
        }
    }
    splitObj.active = activeInstance;
    splitObj.queued = queuedInstances;
    return splitObj;
}

function snatchInstances(itemArray, offeringLst, include, snatchIns, snatchSeq) {
    var snatchedInstances = new Array();
    var snatchId = '';
    if (itemArray instanceof Array) {
        for (var i = 0; i < itemArray.length; i++) {
             if(java.lang.Thread.interrupted()){
				break;
			}
            if (snatchSeq) {
                if (snatchIns) {
                    snatchId = itemArray[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
                } else {
                    snatchId = itemArray[i].OfferingKey.PurchaseSeq;
                }
            } else {
                if (snatchIns) {
                    snatchId = itemArray[i].FreeUnitOrigin.OfferingKey.OfferingID;
                } else {
                    snatchId = itemArray[i].OfferingKey.OfferingID;
                }
            }
            if (include) {
                if (existsOffer(offeringLst, snatchId)) {
                    snatchedInstances.push(itemArray[i]);
                }
            } else {
                if (!existsOffer(offeringLst, snatchId)) {
                    snatchedInstances.push(itemArray[i]);
                }
            }
        }
    } else {
        if (snatchSeq) {
            if (snatchIns) {
                snatchId = itemArray.FreeUnitOrigin.OfferingKey.PurchaseSeq;
            } else {
                snatchId = itemArray.OfferingKey.PurchaseSeq;
            }
        } else {
            if (snatchIns) {
                snatchId = itemArray.FreeUnitOrigin.OfferingKey.OfferingID;
            } else {
                snatchId = itemArray.OfferingKey.OfferingID;
            }
        }
        if (include) {
            if (existsOffer(offeringLst, snatchId)) {
                snatchedInstances.push(itemArray);
            }
        } else {
            if (!existsOffer(offeringLst, snatchId)) {
                snatchedInstances.push(itemArray);
            }
        }
    }
    return snatchedInstances;
}

function existsOffer(offerLst, offerSeq) {
    var flag = false;
    if (offerLst instanceof Array) {
        for (var i = 0; i < offerLst.length; i++) {
             if(java.lang.Thread.interrupted()){
				break;
			}
            if (offerLst[i] == offerSeq) {
                flag = true;
                break;
            }
        }
    } else {
        flag = offerLst == offerSeq;
    }
    return flag;
}

function setPackageItems(instances, queue) {
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
    if (instances instanceof Array) {
        packItem = new Array();
        for (var i = 0; i < instances.length; i++) {
             if(java.lang.Thread.interrupted()){
				break;
			}
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
        if (typeof (instances.CurrentAmount) != 'undefined') {
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

//Funcion Planes VAS
function setPlanItems(instances, CbsCycle, queue) {
    var planItem = new Object();
    var tmpPlanItem = new Array();
    var tmpItem = new Object();
    var currentAmtBts = 0;
    var initialAmtBts = 0;
    var consumptionAmtBts = 0;
    //var itmClass = !queue ? 'Vigente' : 'Pendiente';
    var itmClass = 'Vigente';
    var itmOffer = '';
    var itmProduct = '';
    var itmPurchaseSeq = '';
    var itmName = '';
    var itmType = 'Plan';
    var itmMeasure = 'MB';
    var itmServiceStart = '';
    var itmServiceEnd = '';
    var itmQtaPrcntg = '';
    var itmQtaValue = '';
    var itmQtaConsumption = '';
    var itmQtaBalance = '';
    var itmBillCylcle = CbsCycle;
    if (instances instanceof Array) {
       
        for (var i = 0; i < instances.length; i++) {
             if(java.lang.Thread.interrupted()){
				break;
			}
            tmpItem = new Object();
            currentAmtBts = new Number(instances[i].CurrentAmount);
            initialAmtBts = new Number(instances[i].InitialAmount);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = instances[i].FreeUnitOrigin.OfferingKey.OfferingID;
            itmPurchaseSeq = instances[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
            //planItem.offering = itmOffer;
            //planItem.productId = "0";
            //planItem.purchase_seq = instances[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
            planItem.product_name = instances[i].FreeUnitOrigin.OfferingKey.OfferingName;
            planItem.type_name = itmType;
            //itmServiceStart = instances[i].EffectiveTime;
            //itmServiceEnd = instances[i].ExpireTime;
            planItem.service_start = itmBillCylcle != "-" ? getCycleDate(new Number(itmBillCylcle)) : itmBillCylcle;
            planItem.service_end = '-';
            itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            itmQtaValue = getUnit(initialAmtBts, 'KB');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
            itmQtaBalance = getUnit(currentAmtBts, 'KB');
            tmpItem.measure = itmMeasure;
            tmpItem.qta_balance = itmQtaBalance;
            tmpItem.qta_consumption = itmQtaConsumption;
            tmpItem.qta_value = itmQtaValue;
            tmpItem.qta_percentage = itmQtaPrcntg;
            //tmpItem = setItemPlanCBS(itmMeasure,itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, false, false, true);
            //planItem.push(tmpItem);
            if (itmOffer == vOfferingPlanVAS && itmPurchaseSeq == vPurchaseSeqVAS) {
                tmpPlanItem.push(tmpItem);
                break;
            }
            tmpItem = new Object();
        }
        planItem.quotas = tmpPlanItem;
    } else if (plMultiQuota){
        var planItem2=new Object();
        //tmpPlanItem = new Array();
        //tmpItem = new Object();
        if (typeof (instances.CurrentAmount) != 'undefined') {
            currentAmtBts = new Number(instances.CurrentAmount);
            initialAmtBts = new Number(instances.InitialAmount);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = instances.FreeUnitOrigin.OfferingKey.OfferingID;
            itmPurchaseSeq = instances.FreeUnitOrigin.OfferingKey.PurchaseSeq;
            //planItem.offering = instances.FreeUnitOrigin.OfferingKey.OfferingID;
            //planItem.productId = "0";
            //planItem.purchase_seq = instances.FreeUnitOrigin.OfferingKey.PurchaseSeq;
            // if (itmOffer == vOfferingPlanVAS && itmPurchaseSeq == vPurchaseSeqVAS) {
            planItem.product_name = instances.FreeUnitOrigin.OfferingKey.OfferingName;
            planItem.type_name = itmType;
            //itmServiceStart = instances.EffectiveTime;
            //itmServiceEnd = instances.ExpireTime;
            planItem.service_start = itmBillCylcle != "-" ? getCycleDate(new Number(itmBillCylcle)) : itmBillCylcle;
            planItem.service_end = '-';
            itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            itmQtaValue = getUnit(initialAmtBts, 'KB');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
            itmQtaBalance = getUnit(currentAmtBts, 'KB');
            planItem2.measure = itmMeasure;
            planItem2.qta_balance = itmQtaBalance;
            planItem2.qta_consumption = itmQtaConsumption;
            planItem2.qta_value = itmQtaValue;
            planItem2.qta_percentage = itmQtaPrcntg;
            tmpPlanItem.push(planItem2);
            //planItem = setItemPlanCBS(itmMeasure,itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, false, false, true);
            //}
        }
        planItem.quotas = tmpPlanItem;
    }
    else{
         if (typeof (instances.CurrentAmount) != 'undefined') {
            currentAmtBts = new Number(instances.CurrentAmount);
            initialAmtBts = new Number(instances.InitialAmount);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = instances.FreeUnitOrigin.OfferingKey.OfferingID;
            itmPurchaseSeq = instances.FreeUnitOrigin.OfferingKey.PurchaseSeq;
            //planItem.offering = instances.FreeUnitOrigin.OfferingKey.OfferingID;
            //planItem.productId = "0";
            //planItem.purchase_seq = instances.FreeUnitOrigin.OfferingKey.PurchaseSeq;
            // if (itmOffer == vOfferingPlanVAS && itmPurchaseSeq == vPurchaseSeqVAS) {
            planItem.product_name = instances.FreeUnitOrigin.OfferingKey.OfferingName;
            planItem.type_name = itmType;
            //itmServiceStart = instances.EffectiveTime;
            //itmServiceEnd = instances.ExpireTime;
            planItem.service_start = itmBillCylcle != "-" ? getCycleDate(new Number(itmBillCylcle)) : itmBillCylcle;
            planItem.service_end = '-';
            itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            itmQtaValue = getUnit(initialAmtBts, 'KB');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
            itmQtaBalance = getUnit(currentAmtBts, 'KB');
            planItem.measure = itmMeasure;
            planItem.qta_balance = itmQtaBalance;
            planItem.qta_consumption = itmQtaConsumption;
            planItem.qta_value = itmQtaValue;
            planItem.qta_percentage = itmQtaPrcntg;
         }

    }
    return planItem;
}

//Funcion Addons
function setAddonsItems(instances, CbsCycle, queue) {
    var addonItm = new Object();
    var addItem;
    var addItemT2;
    var tmpItem;
    var currentAmtBts = 0;
    var initialAmtBts = 0;
    var consumptionAmtBts = 0;
    //var itmClass = !queue ? 'Vigente' : 'Pendiente';
    var itmClass = 'Vigente';
    var itmOffer = '';
    var itmProduct = '';
    var itmPurchaseSeq = '';
    var itmName = '';
    var itmType = 'Addon';
    var itmMeasure = 'MB';
    var itmServiceStart = '';
    var itmServiceEnd = '';
    var itmQtaPrcntg = '';
    var itmQtaValue = '';
    var itmQtaConsumption = '';
    var itmQtaBalance = '';
    var itmBillCylcle = CbsCycle;
    if (instances instanceof Array) {
        addItem = new Array();
        if(instances.length>0){
        itmServiceStart = instances[instances.length - 1].EffectiveTime;
        itmServiceEnd = instances[0].ExpireTime;
        for (var i = 0; i < instances.length; i++) {
             if(java.lang.Thread.interrupted()){
				break;
			}
            tmpItem = new Object();
            //currentAmtBts = new Number(instances[i].CurrentAmount);
            currentAmtBts += new Number(instances[i].CurrentAmount);
            initialAmtBts += new Number(instances[i].InitialAmount);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = instances[i].FreeUnitOrigin.OfferingKey.OfferingID;
            //itmProduct = "0";
            //itmPurchaseSeq = instances[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
            if (typeof vAddonRetOffering != 'undefined') {
            if (itmOffer.indexOf(vAddonRetOffering) < 0) {
               // if (itmOffer == vAddonRetOffering) {
                    itmName += itmName == '' ? instances[i].FreeUnitOrigin.OfferingKey.OfferingName : ',' + instances[i].FreeUnitOrigin.OfferingKey.OfferingName;
                }
            } else {
                itmName += itmName == '' ? instances[i].FreeUnitOrigin.OfferingKey.OfferingName : ',' + instances[i].FreeUnitOrigin.OfferingKey.OfferingName;
            }
        }
        itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
        itmQtaValue = getUnit(initialAmtBts, 'KB');
        itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
        itmQtaBalance = getUnit(currentAmtBts, 'KB');
        addonItm.product_name = itmName;
        addonItm.type_name = itmType;
        addonItm.measure = itmMeasure;
        addonItm.service_start = itmServiceStart;
        addonItm.service_end = itmServiceEnd;
        addonItm.qta_balance = itmQtaBalance;
        addonItm.qta_consumption = itmQtaConsumption;
        addonItm.qta_value = itmQtaValue;
        if (vChannelPC == channelId) {
            addonItm.qta_percentage = String(new Number(itmQtaPrcntg) - 100);
            if (addonItm.qta_percentage < 0)
                addonItm.qta_percentage = String(new Number(addonItm.qta_percentage) * (-1));
        } else {
            addonItm.qta_percentage = itmQtaPrcntg;
        }
        }
    } else {
        itmServiceStart = instances.EffectiveTime;
        itmServiceEnd = instances.ExpireTime;
        tmpItem = new Object();
        //currentAmtBts = new Number(instances[i].CurrentAmount);
        currentAmtBts += new Number(instances.CurrentAmount);
        initialAmtBts += new Number(instances.InitialAmount);
        consumptionAmtBts = initialAmtBts - currentAmtBts;
        itmOffer = instances.FreeUnitOrigin.OfferingKey.OfferingID;
        //itmProduct = "0";
        //itmPurchaseSeq = instances[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
        if (typeof vAddonRetOffering != 'undefined') {
            if (itmOffer.indexOf(vAddonRetOffering) < 0) {
                //if (itmOffer == vAddonRetOffering) {
                itmName += itmName == '' ? instances.FreeUnitOrigin.OfferingKey.OfferingName : ',' + instances.FreeUnitOrigin.OfferingKey.OfferingName;
            }
        } else {
            itmName += itmName == '' ? instances.FreeUnitOrigin.OfferingKey.OfferingName : ',' + instances.FreeUnitOrigin.OfferingKey.OfferingName;
        }
        itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
        itmQtaValue = getUnit(initialAmtBts, 'KB');
        itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
        itmQtaBalance = getUnit(currentAmtBts, 'KB');
        addonItm.product_name = itmName;
        addonItm.type_name = itmType;
        addonItm.measure = itmMeasure;
        addonItm.service_start = itmServiceStart;
        addonItm.service_end = itmServiceEnd;
        addonItm.qta_balance = itmQtaBalance;
        addonItm.qta_consumption = itmQtaConsumption;
        addonItm.qta_value = itmQtaValue;
        if (vChannelPC == channelId) {
            addonItm.qta_percentage = String(new Number(itmQtaPrcntg) - 100);
            if (addonItm.qta_percentage < 0)
                addonItm.qta_percentage = String(new Number(addonItm.qta_percentage) * (-1));
        } else {
            addonItm.qta_percentage = itmQtaPrcntg;
        }
    }
    return addonItm;
}

/*Addons de Retenciones*/
function setRetAddon(instances) {
    var addonItm = new Object();
    var tmpAddon = new Object();
    if (typeof vAddonRetOffering != 'undefined' && typeof vAddonRetExpire != 'undefined') {
        tmpAddon = getAddRet(instances.addonsT2, vAddonRetOffering);
        if (typeof tmpAddon != 'undefined') {
            addonItm.product_name = tmpAddon.FreeUnitOrigin.OfferingKey.OfferingName;
            addonItm.type_name = 'Addon';
            addonItm.service_start = tmpAddon.EffectiveTime;
            addonItm.service_end = getRetEndDate(vAddonRetExpire);
        }
    }
    return addonItm;
}

function getRetEndDate(val) {
    //04/12/2017 23:59:13 
    var strDate = val.replace(/\D/g, ' ');
    var dateArray = strDate.split(' ');
    var day = padStr(dateArray[0], 2, '0', STR_PAD_LEFT);
    var year = dateArray[2];
    var month = padStr(dateArray[1], 2, '0', STR_PAD_LEFT);
    var hours = padStr(dateArray[3], 2, '0', STR_PAD_LEFT);
    var minutes = padStr(dateArray[4], 2, '0', STR_PAD_LEFT);
    var seconds = padStr(dateArray[5], 2, '0', STR_PAD_LEFT);
    var format = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds;
    return format;
}

function getAddRet(addArray, addName) {
    var addItem;
   
    if (addArray instanceof Array) {
        for (var i = 0; i < addArray.length; i++) {
            if (addArray[i].FreeUnitOrigin.OfferingKey.OfferingID.indexOf(vAddonRetOffering) >= 0) {
                addItem = addArray[i];
                break;
            }
        }
    } else {
        if(typeof (addArray.FreeUnitOrigin)!= 'undefined'){
        if (addArray.FreeUnitOrigin.OfferingKey.OfferingID.indexOf(vAddonRetOffering) >= 0) {
            addItem = addArray;
        }
        }
    }
    
    
    return addItem;
}
/*Fin Retenciones*/

function getCycleDate(billingDay) {
    var vNow = new Date(vSysDate.getTime());
    var addMonth = true;
    var vMonth = '0';
    var vAdd = billingDay > 1 ? 2 : 1;
    if (vNow.getDate() > billingDay) {
        vNow.setMonth(vNow.getMonth() + vAdd);
        addMonth = false;
    }
    vMonth = addMonth ? String((vNow.getMonth() + 1)) : String(vNow.getMonth());
    vNow.setDate(billingDay - 1);
    return padStr(vNow.getFullYear(), 4, '0', STR_PAD_LEFT) + '' + padStr(vMonth, 2, '0', STR_PAD_LEFT) + '' + padStr(String(vNow.getDate()), 2, '0', STR_PAD_LEFT) + '' + padStr(String(23), 2, '0', STR_PAD_LEFT) + '' + padStr(String(59), 2, '0', STR_PAD_LEFT) + '' + padStr(String(59), 2, '0', STR_PAD_LEFT);
}

function setItem(pOffering, pProduct, pPurchaseSeq, pName, pType, pMeasure, pServiceStart,
    pServiceEnd, pQtaPcntg, pQtaValue, pQtaConsumption, pQtaBalance, pClass, isApp, addActive, pActive) {
    var objItem = new Object();
    objItem.offering = pOffering;
    objItem.productId = pProduct;
    objItem.purchase_seq = pPurchaseSeq;
    objItem.product_name = pName;
    objItem.type_name = pType;
    objItem.measure = pMeasure;
    objItem.service_start = pServiceStart;
    objItem.service_end = pServiceEnd;
    if (!isApp) {
        objItem.qta_percentage = pQtaPcntg;
        objItem.qta_value = pQtaValue;
        objItem.qta_consumption = pQtaConsumption;
        objItem.qta_balance = pQtaBalance;
    } else {
        objItem.hour_percentage = pQtaPcntg;
        objItem.total_hours = pQtaValue;
        objItem.hours_consumed = pQtaConsumption;
        objItem.hours_remaining = pQtaBalance;
    }
    if (addActive) {
        objItem.active = pActive;
    }
    objItem["class"] = pClass;
    return objItem;
}

function setItemSubs(pOffering, pProduct, pPurchaseSeq, pName, pType, pMeasure, pServiceStart,
    pServiceEnd, pQtaPcntg, pQtaValue, pQtaConsumption, pQtaBalance, pClass, isApp, addActive, pActive) {
    var objItem = new Object();
    objItem.offering = pOffering;
    objItem.productId = pProduct;
    objItem.purchase_seq = pPurchaseSeq;
    objItem.product_name = pName;
    objItem.type_name = pType;
    objItem.measure = pMeasure;
    objItem.service_start = pServiceStart;
    objItem.next_renewal = pServiceEnd;
    if (!isApp) {
        objItem.qta_percentage = pQtaPcntg;
        objItem.qta_value = pQtaValue;
        objItem.qta_consumption = pQtaConsumption;
        objItem.qta_balance = pQtaBalance;
    } else {
        objItem.hour_percentage = pQtaPcntg;
        objItem.total_hours = pQtaValue;
        objItem.hours_consumed = pQtaConsumption;
        objItem.hours_remaining = pQtaBalance;
    }
    if (addActive) {
        objItem.active = pActive;
    }
    objItem["class"] = pClass;
    return objItem;
}

function getUnit(val, unit) {
    var btKb = 1024;
    var kbMb = 1024;
    var valMB = '0';
    switch (unit) {
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

function setPackage(pInstances) {
    var packItem = new Object();
    packItem.active = setPackageItems(pInstances.active, false);
    packItem.queued = setPackageItems(pInstances.queued, true);
    return packItem;
}

function setPlanCBS(pInstances, vCycle) {
    var planItem = new Object();
    //planItem.active = setPlanItems(pInstances.active,vCycle,false);
    //planItem.queued = setPlanItems(pInstances.queued,vCycle,true);
    planItem = setPlanItems(pInstances.active, vCycle, false);
    return planItem;
}

function setAddCBS(pInstances, vCycle) {
    var addItem = new Object();
    addItem = setAddonsItems(pInstances.addons, vCycle, false);
    //addItem.queued = setAddonsItems(pInstances.queued, vCycle, true);
    return addItem;
}

function setApplications(pInstances) {
    var appItem = new Object();
    appItem.active = setAppItems(pInstances.active, false);
    appItem.queued = setAppItems(getSortedItems(pInstances.queued), true);
    return appItem;
}

function splitApps(itemArray) {
    var appArray = new Array();
    var tmpArray;
    var bustedOffers = new Array();
    var tmpId;
    for (var i = 0; i < itemArray.length; i++) {
         if(java.lang.Thread.interrupted()){
				break;
			}
        tmpId = itemArray[i].OfferingKey.OfferingID;
        if (!existsOffer(bustedOffers, tmpId)) {
            bustedOffers.push(tmpId);
            LOGGER.info('tmpId:' + tmpId);
            tmpArray = getSortedItems(snatchInstances(itemArray, tmpId, true, false, false));
            LOGGER.info('tmpArray:' + tmpArray.length);
            if (tmpArray.length > 0) {
                appArray.push(tmpArray);
            }
        }
    }
    //LOGGER.info('appArray:' + JSON.stringify(appArray));
    return appArray;
}

function splitOffers(pApps, pActiveIds) {
    var appItem = new Object();
    var activeOffers = new Array();
    var queuedOffers = new Array();
    var tmpArray;
    for (var i = 0; i < pApps.length; i++) {
         if(java.lang.Thread.interrupted()){
				break;
			}
        tmpArray = pApps[i];
        for (var j = 0; j < tmpArray.length; j++) {
            if (existsOffer(pActiveIds, tmpArray[j].OfferingKey.PurchaseSeq)) {
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

function setAppItems(instances, queue) {
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
    if (instances instanceof Array) {
        packItem = new Array();
        for (var i = 0; i < instances.length; i++) {
             if(java.lang.Thread.interrupted()){
				break;
			}
            tmpItem = new Object();
            itmServiceStart = instances[i].EffectiveTime;
            itmServiceEnd = instances[i].ExpirationTime;
            currentAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, true);
            initialAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, false);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = typeof (instances[i].OfferingKey) != 'undefined' ? instances[i].OfferingKey.OfferingID : '0';
            itmProduct = typeof (instances[i].productId) != 'undefined' ? instances[i].productId : '0';
            itmPurchaseSeq = typeof (instances[i].OfferingKey) != 'undefined' ? instances[i].OfferingKey.PurchaseSeq : '0';
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
        if (typeof (instances.CurrentAmount) != 'undefined') {
            itmServiceStart = instances.EffectiveTime;
            itmServiceEnd = instances.ExpirationTime;
            currentAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, true);
            initialAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, false);
            consumptionAmtBts = initialAmtBts - currentAmtBts;
            itmOffer = typeof (instances.OfferingKey) != 'undefined' ? instances.OfferingKey.OfferingID : '0';
            itmProduct = typeof (instances.productId) != 'undefined' ? instances.productId : '0';
            itmPurchaseSeq = typeof (instances.OfferingKey) != 'undefined' ? instances.OfferingKey.PurchaseSeq : '0';
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

function getHoursDiff(pIni, pFin, sysdate) {
    var initialDate = !sysdate ? getCbsDate(pIni) : new Date();
    var endDate = getCbsDate(pFin);
    var vDiffMillis = Math.abs(endDate.getTime() - initialDate.getTime());
    var vHourDiff = Math.ceil(vDiffMillis / (60 * 60 * 1000))
    return vHourDiff;
}

function getActiveApps(pArray) {
    var activeArray = new Array();
    for (var i = 0; i < pArray.length; i++) {
         if(java.lang.Thread.interrupted()){
				break;
			}
        if (pArray[i] instanceof Array) {
            activeArray.push(pArray[i][0].OfferingKey.PurchaseSeq);
        } else {
            activeArray.push(pArray[i].OfferingKey.PurchaseSeq);
        }
    }
    return activeArray;
}