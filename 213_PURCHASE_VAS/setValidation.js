var navInfo = new Object();
var vPlanEntitlement = '';
var vDefaultEntitlement = 'Default_Service_Local';
var vUnsub = false;
var vUnSubDef = false;
var vUnSubCbs = false;
var vPlanVasPurchaseSeq = '';

//if (typeof vPaqInfo != 'undefined') {
if(navObject.pccJson.filled){
	//navInfo = processJson(vPaqInfo);
	navInfo=navObject.pccJson.obj;
	// if(typeof navInfo.Plans != 'undefined'){
	// 	vPlanEntitlement = navInfo.Plans.ServiceName;
	// 	vUnsub = true;
	// }
	if (typeof navInfo.DefaultService != 'undefined') {
		vDefaultEntitlement = navInfo.DefaultService.ServiceName;
		vUnSubDef = true;
	}
	/*********************************valida servicios de Apps existentes en PCC***********/
	var vCounter2 = 0;
	var vUnsubPCCApp = new Array();
	var vPCCAppDel = '';
	// if(vAppsArray != 'undefined'){
	// 	if(navInfo.Applications != 'undefined'){
	// 		for(var k=0;k<vAppsArray.length;k++){
	// 		for(var j=0;j<navInfo.Applications.length;j++){
	// 				if(vAppsArray[k]==navInfo.Applications[j].ServiceName){
	// 					vUnsub=true;
	// 					vUnsubPCCApp.push(navInfo.Applications[j].ServiceName);
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	if(typeof navInfo.Plans != 'undefined') {
		for (var j = 0; j < navInfo.Plans.length; j++) {
			vUnsubPCCApp.push(navInfo.Plans[j].ServiceName);
		}
		vUnsub = true;
		vPCCAppDel = vUnsubPCCApp[vCounter2];
	}
}
/****************************** Validacion CBS***********************/
if (typeof supplementaryOffers != 'undefined') {
	if (supplementaryOffers instanceof Array) {
		for (var i = 0; i < supplementaryOffers.length; i++) {
			if (vOfferingPlanVAS == supplementaryOffers[i].OfferingKey.OfferingID) {
				vUnSubCbs = true;
				vUnsubOffering = supplementaryOffers[i].OfferingKey.OfferingID;
				vPlanVasPurchaseSeq = supplementaryOffers[i].OfferingKey.PurchaseSeq;
				break;
			}
		}
	} else {
		if (vOfferingPlanVAS == supplementaryOffers.OfferingKey.OfferingID) {
			vUnSubCbs = true;
			vUnsubOffering = supplementaryOffers.OfferingKey.OfferingID;
			vPlanVasPurchaseSeq = supplementaryOffers.OfferingKey.PurchaseSeq;
		}
	}
}
/*************************Validacion de Apps*****************************/
var vAppsArray = new Array();
var vCounter = 0;
var doLoop = false;
var vPCCApp = '';
if (vHasUnlimited) {
	vAppsArray = vPCCService.split(',');
	vPCCApp = vAppsArray[vCounter];
}