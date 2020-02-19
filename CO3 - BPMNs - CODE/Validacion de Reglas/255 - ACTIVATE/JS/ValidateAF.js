var vTmpDate=new Date();
var vTmpTime='';
var vTotalDays='';
var vCorrectDate=false;
var vCorrectAmount=false;

if(vIsAFDate){
    var vInvoiceDate=getFinancialDate(INVOICE_DATE);
    vTmpTime=vTmpDate.getTime()-vInvoiceDate.getTime();
    vTotalDays=vTmpTime / (1000 * 3600 * 24); 
    if(vTotalDays<=90){
        vCorrectDate=true;
    }

    if(vCorrectDate){
        vBPMResponseCode='0';
        vBPMMessage='Cliente Valido para Ajuste de Facturacion';
    
    }
    else if(!vCorrectDate){
        vBPMResponseCode='105';
        vBPMMessage='Factura Mayor a 90 dias: Debe utilizar Motivo +90';
    }
}
else if(vIsAFAmount){
    var vInvoiceAmount=parseFloat(AMOUNT).toFixed(2);
    var vAdjustAmount=parseFloat(ADJUST_AMOUNT).toFixed(2);
    if(parseFloat(vAdjustAmount)<=parseFloat(vInvoiceAmount)){
        vCorrectAmount=true;
    }

    if(vCorrectAmount){
        vBPMResponseCode='0';
        vBPMMessage='Cliente Valido para Ajuste de Facturacion';
    
    }
    else if(!vCorrectAmount){
        vBPMResponseCode='106';
        vBPMMessage='Monto de Credito no Valido';
    }
}



