var JsonObject={adjustmentObj:{acctAccessCode:new Object()}};
var JsonString='';
var TmpArray=new Array();
var TmpObject=new Object();
var vRemark='';

JsonObject.adjustmentSerialNo=transactionId;
JsonObject.adjustmentObj.acctAccessCode.accountCode=vAccount;
JsonObject.opType='1';
TmpObject.adjustmentType= (vOperation=='DEBITO')?'2':'1';
TmpObject.adjustmentAmt=(parseFloat(vAmount).toFixed(2))*1000000;
TmpObject.currencyID='1153';
TmpArray.push(TmpObject);
JsonObject.adjustmentInfo=TmpArray;
JsonObject.adjustmentReasonCode=vReasonCode;
//JsonObject.adjustmentReasonCode='312';
TmpArray=new Array();
TmpObject=new Object();
TmpObject.code='C_ADJUST_TYPE';
TmpObject.value='ADJ';
TmpArray.push(TmpObject);
TmpObject=new Object();
TmpObject.code='C_REMARKS';
TmpObject.value= vRemark;
TmpArray.push(TmpObject);
JsonObject.additionalProperty=TmpArray;
JsonString=JSON.stringify(JsonObject);


