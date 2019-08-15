var vDeudaIsOK = false;


if (typeof QueryRentCycleTaskService__responseCode != 'undefined') {
    if (QueryRentCycleTaskService__responseCode == 0) {
        vDeudaIsOK = true;
    }
}

if (vDeudaIsOK) {
    var TmpInstall = new Object();
    var vDatesArray = new Array();
    var vTmpAmount='';
    var vTmpInstallTotal='';

    TmpInstall.Name = 'Financiamiento de Deuda:' + getMSAttributes('NAME_DEUDA', MSFinancial);
    TmpInstall.Type = 'Deuda';
    TmpInstall.Offering = vOfferingDeuda;
    vTmpAmount=getMSAttributes('MONTO_DEUDA', MSFinancial);
    TmpInstall.Amount = vTmpAmount;
    vTmpInstallTotal=getMSAttributes('CUOTAS_DEUDA', MSFinancial);
    TmpInstall.Install_total = vTmpInstallTotal;
    TmpInstall.Total_amount = parseFloat(vTmpAmount) * parseFloat(vTmpInstallTotal);

    //processed
    vDatesArray = getProcessedInstallments(vProcessedCycleD, vDeudaInitDate, SubscriberInfoJson, vOfferingDeuda);
    TmpInstall.Processed = vDatesArray;
    vInstallArray.push(TmpInstall);

    vJson.Installments=vInstallArray;
}