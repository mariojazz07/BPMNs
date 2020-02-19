var BPMN_RESPONSE_CODE = '0';
var BPMN_RESPONSE_MESSAGE = 'Operation Successful';
var JSON_RESPONSE='';

if(vIsEnhanced && vTaskResult){
    JSON_RESPONSE=JSON.stringify(InvoicesObj);
}
else if(!vIsEnhanced && vTaskResult){
    JSON_RESPONSE=JSON.stringify(vInvoiceDetail);
}
else{
    var BPMN_RESPONSE_CODE = '100';
    var BPMN_RESPONSE_MESSAGE = vResultError;
}

