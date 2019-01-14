var plMultiQuota = false;
if (typeof (MULTI_LST) != 'undefined') {
	multiQuotasLst = MULTI_LST;
}
if (typeof (ORIGEN) != 'undefined') {
	plMultiQuota = multiQuotasLst.toUpperCase().indexOf(ORIGEN.toUpperCase()) >= 0;
}

var navObject = {};

var PCCAllServices = {Services: new Object(),User:new Object()};

var JSON_RESPONSE = '';

if (typeof vPaqInfo != 'undefined') {

	navObject.obj = processJson(vPaqInfo);

LOGGER.info(tLinea+'navObject.obj:'+JSON.stringify(navObject.obj)+tLinea);

	if (typeof navObject.obj.Plans != 'undefined') {

		PCCAllServices.Services.Plans = setPlanServices(navObject.obj);
	}

	if (typeof navObject.obj.Applications != 'undefined') {
		PCCAllServices.Services.Apps = setAppsServices(navObject.obj);
	}


	if (typeof navObject.obj.Unbound != 'undefined') {
		PCCAllServices.Services.Default = setDefServices(navObject.obj);
	}

	PCCAllServices.User.subscriberId = subscriberId.toString();
	PCCAllServices.User.billCycle=navObject.obj.User.SubscriberBillCycle.toString();
}
else{
	PCCAllServices.User.subscriberId='Cliente No Existe en PCC';
}





function setPlanServices(navObjectPCC) {
	var PCCPlanItems = navObjectPCC.Plans;
	var PCCPlans = new Array();
	var TempPlanItem = new Object();
	var billCycle = typeof (navObjectPCC.User.SubscriberBillCycle) != 'undefined' ? navObjectPCC.User.SubscriberBillCycle : "-";
	var TempItem = new Array();

	if(PCCPlanItems instanceof Array){
	for (var i = 0; i < PCCPlanItems.length; i++) {
		TempItem = PCCPlanItems[i];
		TempPlanItem.prname = TempItem.ProductName;
		TempPlanItem.srvname = TempItem.ServiceName;
		TempPlanItem.stardate = billCycle != "-" ? getCycleDate(new Number(billCycle)) : billCycle;

		if (typeof TempItem.ServiceEndDate != 'undefined' && TempItem.ServiceEndDate != '-1') {
			TempPlanItem.enddate = TempItem.ServiceEndDate;
		} else {
			TempPlanItem.enddate = "-";
		}
		PCCPlans.push(TempPlanItem);
		TempPlanItem=new Object();

	}
	}
	else{
		TempItem=PCCPlanItems;
		TempPlanItem.prname = TempItem.ProductName;
		TempPlanItem.srvname = TempItem.ServiceName;
		TempPlanItem.stardate = billCycle != "-" ? getCycleDate(new Number(billCycle)) : billCycle;

		if (typeof TempItem.ServiceEndDate != 'undefined' && TempItem.ServiceEndDate != '-1') {
			TempPlanItem.enddate = TempItem.ServiceEndDate;
		} else {
			TempPlanItem.enddate = "-";
		}
		PCCPlans=TempPlanItem;
	}

	return PCCPlans;
}

function setAppsServices(navObjectPCC) {
	var PCCAppsItems = navObjectPCC.Applications;
	var PCCApps = new Array();
	var TempAppsItem = new Object();
	var billCycle = typeof (navObjectPCC.User.SubscriberBillCycle) != 'undefined' ? navObjectPCC.User.SubscriberBillCycle : "-";
	var TempItem = new Array();

	if(PCCAppsItems instanceof Array){
	for (var i = 0; i < PCCAppsItems.length; i++) {
		TempItem = PCCAppsItems[i];
		//Apps
		TempAppsItem.prname = TempItem.ProductName;
		TempAppsItem.srvname = TempItem.ServiceName;
		TempAppsItem.stardate = billCycle != "-" ? getCycleDate(new Number(billCycle)) : billCycle;

		if (typeof TempItem.ServiceEndDate != 'undefined' && TempItem.ServiceEndDate != '-1') {
			TempAppsItem.enddate = TempItem.ServiceEndDate;
		} else {
			TempAppsItem.enddate = "-";
		}

		PCCApps.push(TempAppsItem);
		TempAppsItem=new Object();

	}
	}
	else{
		TempItem=PCCAppsItems;
		TempAppsItem.prname = TempItem.ProductName;
		TempAppsItem.srvname = TempItem.ServiceName;
		TempAppsItem.stardate = billCycle != "-" ? getCycleDate(new Number(billCycle)) : billCycle;

		if (typeof TempItem.ServiceEndDate != 'undefined' && TempItem.ServiceEndDate != '-1') {
			TempAppsItem.enddate = TempItem.ServiceEndDate;
		} else {
			TempAppsItem.enddate = "-";
		}
		PCCApps=TempAppsItem;
	}

	return PCCApps;
}

function setDefServices(navObjectPCC) {
	var PCCDefItems = navObjectPCC.Unbound;
	var PCCDef = new Array();
	var TempDefItem = new Object();
	var billCycle = typeof (navObjectPCC.User.SubscriberBillCycle) != 'undefined' ? navObjectPCC.User.SubscriberBillCycle : "-";
	var TempItem = new Array();
	var vBaseServices = 'Base_Service_OCS_Pos_SY_FUP,Base_Service_OCS_Pos_SY';

	if(PCCDefItems instanceof Array){
	for (var i = 0; i < PCCDefItems.length; i++) {
		TempItem = PCCDefItems[i];
		//Apps

		if (vBaseServices.indexOf(TempItem.ServiceName) < 0) {
			TempDefItem.prname = TempItem.ProductName;
			
		} else {
			TempDefItem.prname = 'Servicio Base PCC-CBS';
		}

		TempDefItem.srvname = TempItem.ServiceName;
		TempDefItem.stardate = billCycle != "-" ? getCycleDate(new Number(billCycle)) : billCycle;

		if (typeof TempItem.ServiceEndDate != 'undefined' && TempItem.ServiceEndDate != '-1') {
			TempDefItem.enddate = TempItem.ServiceEndDate;
		} else {
			TempDefItem.enddate = "-";
		}

		PCCDef.push(TempDefItem);
		TempDefItem=new Object();


	}
	}
	else{
		TempItem=PCCDefItems;
		if (vBaseServices.indexOf(TempItem.ServiceName) < 0) {
			TempDefItem.prname = TempItem.ProductName;
			
		} else {
			TempDefItem.prname = 'Servicio Base PCC-CBS';
		}

		TempDefItem.srvname = TempItem.ServiceName;
		TempDefItem.stardate = billCycle != "-" ? getCycleDate(new Number(billCycle)) : billCycle;

		if (typeof TempItem.ServiceEndDate != 'undefined' && TempItem.ServiceEndDate != '-1') {
			TempDefItem.enddate = TempItem.ServiceEndDate;
		} else {
			TempDefItem.enddate = "-";
		}
		PCCDef=TempDefItem;
	}

	return PCCDef;
}

function getCycleDate(billingDay) {
	var vSysDate = new Date();
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