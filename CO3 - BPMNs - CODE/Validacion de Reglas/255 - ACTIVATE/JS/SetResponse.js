if (vIsOK) {

    var BPMN_RESPONSE_CODE = '0';
    var BPMN_RESPONSE_MESSAGE = 'Aplica a Financiamiento';


} 
// else if(vMSError){
//     var BPMN_RESPONSE_CODE = '101';
//     var BPMN_RESPONSE_MESSAGE = 'Error Consultando Master Status';


// }

else if(vNoDataMS){
        var BPMN_RESPONSE_CODE = '0';
        var BPMN_RESPONSE_MESSAGE = 'No tiene Financiamiento';
    
    
    }
else{
    var BPMN_RESPONSE_CODE = '102';
    var BPMN_RESPONSE_MESSAGE = 'Cliente con Financiamientos Activos';
}