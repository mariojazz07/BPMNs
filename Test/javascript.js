var BPMN_RESPONSE_CODE = '0';
var BPMN_RESPONSE_MESSAGE = '';
var strMsj = '';

if(!validPlan){
BPMN_RESPONSE_CODE = '105';
BPMN_RESPONSE_MESSAGE = 'Plan no compatible.';
strMsj = vMsjPlanActivo;
MESSAGE = strMsj;
} else if(!validCos){
BPMN_RESPONSE_CODE = '103';
BPMN_RESPONSE_MESSAGE = 'Cos Invalido';
strMsj = vMsjCos;
MESSAGE = strMsj;
}




/*
var BPMN_RESPONSE_CODE = '0';

var BPMN_RESPONSE_MESSAGE = '';

var strMsj = '';



if(tEntitlementActivoInvalido){

    BPMN_RESPONSE_CODE = '120';

    BPMN_RESPONSE_MESSAGE = 'Paquete Activo no compatible.';

    strMsj = MSG_PAQ_ACTIVO_INVALIDO;

    strMsj = strMsj.replace('<NOMBRE_PAQUETE_ACTUAL>', tNombrePaqActual);

    MESSAGE = strMsj;

} else if(tPaqEncoladoInvalido) {

    BPMN_RESPONSE_CODE = '121';

    BPMN_RESPONSE_MESSAGE = 'Paquete Encolado no compatible.';

    strMsj = MSG_PAQ_ENCOLADO_INVALIDO;

    MESSAGE = strMsj;

} else if(!validPlan){

    BPMN_RESPONSE_CODE = '105';

    BPMN_RESPONSE_MESSAGE = 'Plan no compatible.';

    strMsj = vMsjPlanActivo;

    MESSAGE = strMsj;

} else if(!validCos){

    BPMN_RESPONSE_CODE = '103';

    BPMN_RESPONSE_MESSAGE = 'Cos Invalido';

    strMsj = vMsjCos;

    MESSAGE = strMsj;

}

*/