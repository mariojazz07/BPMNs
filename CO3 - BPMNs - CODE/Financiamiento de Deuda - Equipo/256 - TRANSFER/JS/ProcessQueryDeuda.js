

var vDeudaIsOK = false;


if (typeof vOfferingIdD != 'undefined') {
    
        vDeudaIsOK = true;
        //LOGGER.info(tLinea+'Llega a procesar vDeudaIsOK_1'+tLinea);
    
}

if (vDeudaIsOK) {
    var TmpInstall = new Object();
    var vDatesArray = new Array();
    var vTmpAmount='';
    var vTmpInstallTotal='';
    //var vInstallArray=new Array();

    //LOGGER.info(tLinea+'Llega a procesar vDeudaIsOK_2'+tLinea);
    TmpInstall.Name = 'Financiamiento de Deuda:' + getMSAttributes('NAME_DEUDA', MSFinancial);
    TmpInstall.Type = 'Deuda';
    TmpInstall.Offering = vOfferingDeuda;
    TmpInstall.Sequence=getMSAttributes('SEQUENCE_DEUDA',MSFinancial);
    vTmpAmount=getMSAttributes('MONTO_DEUDA', MSFinancial);
    TmpInstall.Amount = vTmpAmount;
    vTmpInstallTotal=getMSAttributes('CUOTAS_DEUDA', MSFinancial);
    TmpInstall.Install_total = vTmpInstallTotal;
    TmpInstall.Total_amount = (parseFloat(vTmpAmount) * parseFloat(vTmpInstallTotal)).toString();

    //processed
   // LOGGER.info(tLinea+'vProcessedCyclesD:'+vProcessedCyclesD+tLinea);
   
  
    vDatesArray = getProcessedInstallments(vProcessedCyclesD, vDeudaInitDate, SubscriberInfoJson, vOfferingDeuda);
    
    TmpInstall.Processed = vDatesArray;
    vInstallArray.push(TmpInstall);
    vJson.Installments=vInstallArray;
}

//LOGGER.info(tLinea+'vDeudaIsOK:'+vDeudaIsOK+tLinea);