var vEventType = typeof eventType != 'undefined' ? eventType : 'PLAN_VAS';
var vSubEvent = typeof subevent != 'undefined' ? subevent : 'CREATESUBS';
var vSubscriberTypeVAS = subscriberType;
var vVasTypePlan = typeof typePlan != 'undefined' ? typePlan : 'POS';
var vAnnex = annex;
var vAs400TransactionID = typeof TRANSACTIONID != 'undefined' ? TRANSACTIONID : '0';
var vOCEPExTransactionID = typeof externalTransacionId != 'undefined' ? externalTransacionId : '0';
var vTransType = typeof TRANSTYPE != 'undefined' ? TRANSTYPE : '1';
var vTransDate = typeof TRANSDATE != 'undefined' ? TRANSDATE : ' ';
var vTransTime = typeof TRANSTIME != 'undefined' ? TRANSTIME : ' ';
var vSubNum = typeof SUBSNUMB != 'undefined' ? SUBSNUMB : subscriberId;
var vUser = typeof USER != 'undefined' ? USER : 'CDCPE';
var vProgram = typeof PROGRAM != 'undefined' ? PROGRAM : 'CDCPE';
var vPlanCode = typeof PLANCODE != 'undefined' ? PLANCODE : ' ';
var vPlanVas = typeof PLANVAS != 'undefined' ? PLANVAS : ' ';
var vIMSI = typeof IMSI != 'undefined' ? IMSI : '0';
var vSimcard = typeof SIMCARD != 'undefined' ? SIMCARD : '0';
var vScheduleBillday = typeof BILLDAY != 'undefined' ? BILLDAY : ' ';
var vScheduleEntitlement = typeof ENTITLEMENT != 'undefined' ? ENTITLEMENT : 'HN_POS,Postpaid';
var vSchSrvStartDate='';

if(typeof SRVSTARDATE != 'undefined'){
	vSchSrvStartDate=SRVSTARDATE;
}
else{
	if(typeof DEVICE != 'undefined'){
		if(DEVICE=='CDCPE'){
			vSchSrvStartDate=TRANSDATE;
		}
	}
}


var vSchSrvEndDate = typeof SRVENDDATE != 'undefined' ? SRVENDDATE : '0';
var vSchInclude = typeof INCLUDE != 'undefined' ? INCLUDE : ' ';
var vExecute = 'TRUE';

var vExecuteDate = new Date();
var ONE_MIN = 1 * 60 * 1000;

vScheduleDateWarning = parseTimeToScheduleDate(vExecuteDate.getTime() + ONE_MIN);


