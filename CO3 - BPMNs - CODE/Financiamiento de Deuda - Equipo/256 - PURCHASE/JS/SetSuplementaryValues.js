var vOfferingID = (vIsDeuda) ? OFFERING_NUMBER_DEUDA : OFFERING_NUMBER_EQUIPO;
var vPurchaseSeq = transactionId;
var vStatus = '2';
var vEffectiveMode = 'I';
var vEffectiveTime = getTimeCBS(true, INITIAL_PAYMENT_DATE, false, '');
var vExpireTime = getTimeCBS(false, INITIAL_PAYMENT_DATE, true, INSTALLMENTS);
var vActivationMode = 'A';
var vDesc4Invoice = 'C_DESC4INVOICE_OFF';
var vDesc4InvoiceProp = '1';
var vDesc4InvoiceValue = (vIsDeuda) ? getDesc4Value(true, false, vDeudaTotal) : getDesc4Value(false, true, vDeudaTotal);
var vExtAppPlanID = 'C_EXT_APP_PLANID_OFF';
var vExtAppPlanIDProp = '1';
var vExtAppPlanIDValue = (vIsDeuda) ? getExtAppPlanValue(true, false, vDeudaTotal) : getExtAppPlanValue(false, true, vDeudaTotal);
var vInstallTotalCycle = 'C_INSTALL_TOTAL_CYCLE';
var vInstallTotalCycleProp = '1';
var vInstallTotalCycleValue = INSTALLMENTS;
var vInstallAmount = 'C_INSTALL_AMOUNT_PER_CYCLE';
var vInstallAmountProp = '1';
var vInstallAmountValue = fillDecimals(vDeudaTotal.toFixed(2), 6);

var vList = {};
var MSJson = '';
var vListArray = new Array();
var vTmpObject = new Object();
var vNameDeuda = ['CUENTA', 'OFFERING_DEUDA', 'SEQUENCE_DEUDA', 'MONTO_DEUDA', 'CUOTAS_DEUDA', 'FECHA_INICIO_DEUDA', 'FECHA_FIN_DEUDA', 'STATUS_DEUDA'];
var vValueDeuda = [ACCOUNT, vOfferingID, vPurchaseSeq, vDeudaTotal, INSTALLMENTS, vEffectiveTime, vExpireTime, 'VIGENTE'];
var vNameEquipo = ['CUENTA', 'OFFERING_EQUIPO', 'SEQUENCE_EQUIPO', 'MONTO_EQUIPO', 'CUOTAS_EQUIPO', 'FECHA_INICIO_EQUIPO', 'FECHA_FIN_EQUIPO', 'STATUS_EQUIPO'];
var vValueEquipo = [ACCOUNT, vOfferingID, vPurchaseSeq, vDeudaTotal, INSTALLMENTS, vEffectiveTime, vExpireTime, 'VIGENTE'];

if (vIsDeuda) {


    for (var i = 0; i < vNameDeuda.length; i++) {
        vTmpObject = new Object();
        vTmpObject.name = vNameDeuda[i];
        vTmpObject.value = vValueDeuda[i];
        vListArray.push(vTmpObject);
    }

    vList.atributeList = vListArray;

} else {
    //vTmpObject.name = 'NAME_EQUIPO';
    //vTmpObject.value = ACCOUNT;
    //vListArray.push(vTmpObject);
    for (var i = 0; i < vNameEquipo.length; i++) {
        vTmpObject = new Object();
        vTmpObject.name = vNameEquipo[i];
        vTmpObject.value = vValueEquipo[i];
        vListArray.push(vTmpObject);
    }
    vList.atributeList = vListArray;

}


MSJson = JSON.stringify(vList);