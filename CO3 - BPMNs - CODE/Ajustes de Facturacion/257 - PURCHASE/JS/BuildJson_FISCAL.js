var JsonObject={adjustmentObj:{acctAccessCode:new Object()}};
var JsonString='';
var TmpArray=new Array();
var TmpObject=new Object();
var vRemark='';


JsonObject.adjustmentSerialNo=transactionId;
JsonObject.adjustmentObj.acctAccessCode.accountCode=vAccount;
JsonObject.opType='1';
//Array
TmpObject.invoiceNo=vInvoiceNo;
TmpObject.adjustmentType= (vOperation=='DEBITO')?'2':'1';
if(vOperation=='DEBITO'){
    if(vReasonCode=='DRINV060N001'|| vReasonCode=='DRINV060N002'||vReasonCode=='DRINV060N003'){
        TmpObject.adjustmentType='4';
    }
}
else if(vReasonCode=='DRINV060N001'|| vReasonCode=='DRINV060N002'||vReasonCode=='DRINV060N003'){
    TmpObject.adjustmentType='3';
}

TmpObject.adjustmentAmt=parseInt(parseFloat(vAmount)*1000000);
TmpObject.currencyID='1153';
TmpArray.push(TmpObject);
JsonObject.invoiceInfo=TmpArray;
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


