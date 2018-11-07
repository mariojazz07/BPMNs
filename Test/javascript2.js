var consumedPlanQuota = true;
var expiredPlanQuota = true;
var vPromo = false;
var vSKey = 'NA';
var vMtrProduct = MTR;
var walletJson = new Object();
var packageWallet = new Object();
var packageInstances = new Object();
var planInstances= new Object();
var vPaqEntitlement = '';
var planWallet = new Object();
var navInfo = new Object();
var vUnsub = false;
var vPackageBalance = 'C_Internet_Pack';
var vPlanBalance = 'C_Data_Include';
var vQueueDate;
var vWarningMinutes = parseInt(vWarning) * -1;
var vExpireDate = new Date(vSysDate.getTime());
vExpireDate.setMinutes(vSysDate.getMinutes() + vProductDuration);
var strInitialDate = parseTimeToDateGeneric(vSysDate.getTime());
var strExpireDate = parseTimeToDateGeneric(vExpireDate.getTime());
var vEffectiveTime = parseTimeToCBSDate(vSysDate.getTime());
var vExpireTime = parseTimeToCBSDate(vExpireDate.getTime());
var vComissionDate = parseTimeToComissionDate(vSysDate.getTime());
var vStartDhDate = parseTimeToDHDate(vSysDate.getTime());
var vEndDhDate = parseTimeToDHDate(vExpireDate.getTime());
var vInitialDeezerDate = parseTimeToDate(vSysDate.getTime(), false);
var vFinalDeezerDate = parseTimeToDate(vExpireDate.getTime(), false);
var vBBEndDate = parseTimeToScheduleDate(vExpireDate.getTime());
vExpireDate.setMinutes(vExpireDate.getMinutes() + vWarningMinutes);
var vScheduleDateWarning = parseTimeToScheduleDate(vExpireDate.getTime());
var vScheduleDate = parseTimeToScheduleDate(vExpireDate.getTime());
var vProcess = 'A';
var vQueued = false;
var vExpireProduct = '483';
var cmbRemark = 'cmb;trx;';
var vPrecioPromo = '';


vFreeUnitWallets

if(typeof vFreeUnitWallets !='undefined'){
	walletJson = getWalletJSON(vFreeUnitWallets);
	if(validatePlan && typeof(walletJson)!= 'undefined'){
		planWallet=getWalletByType(vPlanBalance,walletJson);
		if(typeof planWallet != 'undefined'){
			planInstances=getSortedInstancesPospaid(planWallet);
			if(planInstances.length<=0){
				validPlan=true;
			}
		}
	}
}


console.log(validPlan);

function getWalletJSON(strJson) {
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

      

function getWalletByType(strWalletName, walletJson) {
	var walletObj;
	var freeUnits = walletJson.QueryFreeUnitResultMsg.QueryFreeUnitResult.FreeUnitItem;
	var vItem;
	if (typeof (freeUnits) != 'undefined') {
		if (freeUnits instanceof Array) {
			for (var i = 0; i < freeUnits.length; i++) {
				vItem = freeUnits[i];
				if (vItem.FreeUnitType == strWalletName) {
					walletObj = vItem;
					break;
				}
			}
		} else {
			if (freeUnits.FreeUnitType == strWalletName) {
				walletObj = freeUnits;
			}
		}
	}
	return walletObj;
}

function trimExhaustedInstancesPospaid(instances){
    var tmpInstances = new Array();
    var flag = false;
    if(instances instanceof Array){
        for(var i = 0; i < instances.length; i++){
            if(typeof(instances[i].CurrentAmount) != 'undefined'){
                flag = true;
                if(new Number(instances[i].CurrentAmount) > 0){
                    tmpInstances.push(instances[i]);
                }
            }
        }
    } else {
        if(typeof(instances.CurrentAmount) != 'undefined'){
            flag = true;
            if(new Number(instances.CurrentAmount) > 0){
                tmpInstances.push(instances);
            }
        }
    }
    tmpInstances = flag ? tmpInstances : instances;
    return tmpInstances;
}

function getSortedInstancesPospaid(wallet) {
	var sortedInstances = new Array();
	var itemDetail;
	var tmpInstances = trimExhaustedInstancesPospaid(wallet.FreeUnitItemDetail);
	if (tmpInstances instanceof Array) {
		itemDetail = tmpInstances;
		//LOGGER.info(tLinea + 'Entro a validar getSortedInstances:' + typeof (itemDetail) + tLinea);
		sortedInstances = quickSort(itemDetail, 0, (itemDetail.length - 1));
	} else {
		sortedInstances.push(tmpInstances);
	}
	return sortedInstances;
}


function quickSort(items, left, right) {
	var idx;
	//LOGGER.info(tLinea + 'Entro a validar quickSort:' + typeof (items) + tLinea);
	if (items.length > 1) {
		idx = partition(items, left, right);
		if (left < (idx - 1)) {
			quickSort(items, left, (idx - 1));
		}
		if (idx < right) {
			quickSort(items, idx, right);
		}
	}
	return items;
}