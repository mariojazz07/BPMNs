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

function trimExhaustedInstances(instances) {
	var tmpInstances = new Array();
	if (instances instanceof Array) {
		//LOGGER.info(tLinea + 'Entro a validar trimExhaustedInstances:' + typeof (instances) + tLinea);
		for (var i = 0; i < instances.length; i++) {
			if (new Number(instances[i].CurrentAmount) > 0) {
				tmpInstances.push(instances[i]);
			}
		}
	} else {
		if (new Number(instances.CurrentAmount) > 0) {
				tmpInstances.push(instances);
		}
	}
	return tmpInstances;
}


//Agregado para Pospago
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
//

function getSortedInstances(wallet) {
	var sortedInstances = new Array();
	var itemDetail;
	var tmpInstances = trimExhaustedInstances(wallet.FreeUnitItemDetail);
	if (tmpInstances instanceof Array) {
		itemDetail = tmpInstances;
		//LOGGER.info(tLinea + 'Entro a validar getSortedInstances:' + typeof (itemDetail) + tLinea);
		sortedInstances = quickSort(itemDetail, 0, (itemDetail.length - 1));
	} else {
		sortedInstances.push(tmpInstances);
	}
	return sortedInstances;
}


//Agregado para pospago
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
//

function swap(items, firstIdx, secondIdx) {
	var tmp = items[firstIdx];
	items[firstIdx] = items[secondIdx];
	items[secondIdx] = tmp;
}

function partition(items, left, right) {
	var pivot = items[Math.floor((right + left) / 2)];
	var i = left;
	var j = right;
	while (i <= j) {
		while (new Number(items[i].ExpireTime) > new Number(pivot.ExpireTime)) {
			i++;
		}
		while (new Number(items[j].ExpireTime) < new Number(pivot.ExpireTime)) {
			j--;
		}
		if (i <= j) {
			swap(items, i, j);
			i++;
			j--;
		}
	}
	return i;
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

function getCbsDateStr(cbsDate) {
	var vYear = cbsDate.substring(0, 4);
	var vMonth = new Number(cbsDate.substring(4, 6)) - 1;
	var vDay = cbsDate.substring(6, 8);
	var vHours = cbsDate.substring(8, 10);
	var vMinutes = cbsDate.substring(10, 12);
	var vSeconds = cbsDate.substring(12, 14);
	return new Date(vYear, vMonth, vDay, vHours, vMinutes, vSeconds);
}

