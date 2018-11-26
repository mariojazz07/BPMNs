var vEventType=eventType;
var vSubEvent=subevent;
var vSubscriberTypeVAS=subscriberType;
var vVasTypePlan=typePlan;
var vAnnex=annex;
var vAs400TransactionID=TRANSACTIONID;
var vOCEPExTransactionID= typeof externalTransacionId != 'undefined'?externalTransacionId:'';
var vTransType=TRANSTYPE;
// var vTransDate=TRANSDATE;
// var vTransTime=TRANSTIME;

//
var vSubNum=SUBSNUMB;
var vUser=USER;
var vProgram=PROGRAM;
//
var vTransDate='';
var vTransTime='';
var vPlanCode=PLANCODE;
var vPlanVas=PLANVAS;

//
var vIMSI=IMSI;
var vSimcard=SIMCARD;
//
var vScheduleBillday=BILLDAY;
var vScheduleEntitlement=ENTITLEMENT;
var vSchSrvStartDate=SRVSTARDATE;
var vSchSrvEndDate=SRVENDDATE;
var vSchInclude=INCLUDE;
var vExecute='TRUE';

var vTmpDate=new Date();
var vTmpTransDate = parseDateToStringAS(vTmpDate);
var vTmpTransTime=parseDateToStringCBSTime(vTmpDate);
vTransDate=vTmpTransDate;
vTransTime=vTmpTransTime;









