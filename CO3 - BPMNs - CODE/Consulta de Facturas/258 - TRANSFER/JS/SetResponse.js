var BPMN_RESPONSE_CODE = '0';
var BPMN_RESPONSE_MESSAGE = 'Operation Successful';
var JSON_RESPONSE='';

if(vIsEnhanced){
    JSON_RESPONSE=JSON.stringify(InvoicesObj);
}
else{
    JSON_RESPONSE=JSON.stringify(vInvoiceDetail);
}

