var vSchSubscriberType = '';
var vSchTypePlan = '';
var vSchAnnex = '';
var vSchTransactionId = '';
var vSchTransType = '';
var vSchPlanCode = '';
var vSchPlanVasNew = '';
var vSchPlanVasOld = '';
var vSchBillday = '';
var vSchEntitlement = '';
var vSchSrvEndDate = '';
var vSchType = '';
var vSchInclude = '';


///
if (typeof subscriberType != 'undefined' && typeof TypePlan != 'undefined' && typeof annex != 'undefined' && typeof PLANCODE != 'undefined' &&
	typeof PLANVASNEW != 'undefined' && typeof PLANVASOLD != 'undefined' && typeof BILLDAY != 'undefined' && typeof ENTITLEMENT != 'undefined' &&
	typeof vEndDateAs400 != 'undefined' && typeof TYPE != 'undefined' && typeof INCLUDE != 'undefined') {
	vSchSubscriberType = subscriberType;
	vSchTypePlan = TypePlan;
	vSchAnnex = annex;
	vSchTransactionId = transactionId;
	vSchTransType = '3';
	vSchPlanCode = PLANCODE;
	vSchPlanVasNew = PLANVASNEW;
	vSchPlanVasOld = PLANVASOLD;
	vSchBillday = BILLDAY;
	vSchEntitlement = ENTITLEMENT;
	vSchSrvEndDate = vEndDateAs400;
	vSchType = TYPE;
	vSchInclude = INCLUDE;
}