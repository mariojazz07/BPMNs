var vHasUnlimited = false;
var vHasFUP128 = false;
var vHasFUP64 = false;
var vPccJsonInfo;
var vUpdateUsrCategory = false;
var vSetOffering = false;
var vCategoryPCC = 'normal';

if (typeof vPCCService != 'undefined') {
	if (vPCCService != 'NA') {
		vHasUnlimited = true;
	}
}

if (typeof vIsPrimaryPlan != 'undefined') {
	if (!vIsPrimaryPlan) {
		vSetOffering = true;
	}
}


//Validar tipo de plan FUP
if (typeof vPaqInfo != 'undefined') {
	vPccJsonInfo = JSON.parse(vPaqInfo);
}


if (typeof FUP != 'undefined') {
	vHasFUP128 = true;
	vCategoryPCC = GetUsrCategoryByType(vPaymentType,FUP);
	vUpdateUsrCategory = ValidateCategory(vPccJsonInfo, vCategoryPCC);

} else if (vSubscriberFound && vPaymentType == '2') {
	vCategoryPCC = 'Hibrido';
	vUpdateUsrCategory = ValidateCategory(vPccJsonInfo, vCategoryPCC);
} else {
	vCategoryPCC = 'normal';
	vUpdateUsrCategory = ValidateCategory(vPccJsonInfo, vCategoryPCC);
}





function ValidateCategory(vPCCObject, vFUPType) {
	var vActualCategory = '';
	var vUpdateCategory = false;
	if (typeof vPCCObject != 'undefined') {
		vActualCategory = GetUsrCategory(vPCCObject);
		if (vFUPType != vActualCategory) {
			vUpdateCategory = true;
		}
	}
	return vUpdateCategory;
}

function GetUsrCategory(vPCCObject) {
	var vUsrCategory = 'USRCATEGORY';
	var vUsrSubscriber = '';
	var vUsrActualCategory = '';
	if (typeof vPCCObject != 'undefined') {
		vUsrSubscriber = vPCCObject.getSubscriberAllInfResponse.result.subscriber.attribute;
		for (var i = 0; i < vUsrSubscriber.length; i++) {
			if (vUsrCategory == vUsrSubscriber[i].key) {
				vUsrActualCategory = vUsrSubscriber[i].value;
				break;
			}
		}
	}
	return vUsrActualCategory;
}

function GetUsrCategoryByType(vSubType, vFUPType) {
	var vFUPByType = '';
	if (vSubType == '1') {
		switch (vFUPType) {
			case '128':
				vFUPByType = 'PosF128';
				break;
			case '64':
				vFUPByType = 'PosF64';
				break;
		}

	}
	else if(vSubType=='2'){
		switch(vFUPType){
			case '128':
				vFUPByType = 'HibF128';
				break;
			case '64':
				vFUPByType = 'HibF64';
				break;
		}
	}

	return vFUPByType;
}