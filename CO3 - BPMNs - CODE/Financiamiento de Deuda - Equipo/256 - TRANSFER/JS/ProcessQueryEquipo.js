var vEquipoIsOK = false;
var vInstallArray=new Array();

if (typeof QueryRentCycleTaskService__responseCode != 'undefined') {
    if (QueryRentCycleTaskService__responseCode == 0) {
        vEquipoIsOK = true;
    }
}

if (vEquipoIsOK) {
    var TmpInstall = new Object();
    var vDatesArray = new Array();
    var vTmpAmount='';
    var vTmpInstallTotal='';

    TmpInstall.Name = 'Financiamiento de Equipo:' + getMSAttributes('NAME_EQUIPO', MSFinancial);
    TmpInstall.Type = 'Equipo';
    TmpInstall.Offering = vOfferingEquipo;
    vTmpAmount=getMSAttributes('MONTO_EQUIPO', MSFinancial);
    TmpInstall.Amount = vTmpAmount;
    vTmpInstallTotal=getMSAttributes('CUOTAS_EQUIPO', MSFinancial);
    TmpInstall.Install_total = vTmpInstallTotal;
    TmpInstall.Total_amount = parseFloat(vTmpAmount) * parseFloat(vTmpInstallTotal);

    //processed
    vDatesArray = getProcessedInstallments(vProcessedCycleE, vEquipoInitDate, SubscriberInfoJson, vOfferingEquipo);
    TmpInstall.Processed = vDatesArray;
    vInstallArray.push(TmpInstall);

    vJson.Installments=vInstallArray;
    
}