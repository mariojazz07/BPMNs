var vValid=false;
var vDPGClient=DPG_CLIENT_TYPE;
var vBPMResponseCode='';
var vBPMMessage='';

if(vDPGClient!='3'){
    vValid=true;
}

if(vValid){
    vBPMResponseCode='0';
    vBPMMessage='Cliente Valido para Devolucion Deposito';

}
else{
    vBPMResponseCode='104';
    vBPMMessage='Cliente No Valido para Devolucion Deposito';
}