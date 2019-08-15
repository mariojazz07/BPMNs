var vOfferingID = (vIsDeuda) ? OFFERING_NUMBER_DEUDA : OFFERING_NUMBER_EQUIPO;
var vPurchaseSeq = transacionId;
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
var vExtAppPlanIDValue = (vIsDeuda) ? '' : '';
var vInstallTotalCycle = 'C_INSTALL_TOTAL_CYCLE';
var vInstallTotalCycleProp = '1';
var vInstallTotalCycleValue = INSTALLMENTS;
var vInstallAmount = 'C_INSTALL_AMOUNT_PER_CYCLE';
var vInstallAmountProp = '1';
var vInstallAmountValue = vDeudaTotal;

var vList = {};
var MSJson='';
var vListArray = new Array();
var vTmpObject = new Object();

if (vIsDeuda) {
    vTmpObject.name = 'CUENTA';
    vTmpObject.value = ACCOUNT;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'OFFERING_DEUDA';
    vTmpObject.value = vOfferingID;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'SEQUENCE_DEUDA';
    vTmpObject.value = transacionId;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'MONTO_DEUDA';
    vTmpObject.value = vDeudaTotal;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'CUOTAS_DEUDA';
    vTmpObject.value = INSTALLMENTS;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'FECHA_INICIO_DEUDA';
    vTmpObject.value = vEffectiveTime;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'FECHA_FIN_DEUDA';
    vTmpObject.value = vExpireTime;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'STATUS_DEUDA';
    vTmpObject.value = 'VIGENTE';
    vListArray.push(vTmpObject);
    vList.atributeList=vListArray;

} else {
    //vTmpObject.name = 'NAME_EQUIPO';
    //vTmpObject.value = ACCOUNT;
    //vListArray.push(vTmpObject);
    vTmpObject.name = 'OFFERING_EQUIPO';
    vTmpObject.value = vOfferingID;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'SEQUENCE_EQUIPO';
    vTmpObject.value = transacionId;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'MONTO_EQUIPO';
    vTmpObject.value = vDeudaTotal;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'CUOTAS_EQUIPO';
    vTmpObject.value = INSTALLMENTS;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'FECHA_INICIO_EQUIPO';
    vTmpObject.value = vEffectiveTime;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'FECHA_FIN_EQUIPO';
    vTmpObject.value = vExpireTime;
    vListArray.push(vTmpObject);
    vTmpObject.name = 'STATUS_EQUIPO';
    vTmpObject.value = 'VIGENTE';
    vListArray.push(vTmpObject);
    vList.atributeList=vListArray;

}


MSJson=JSON.stringify(vList);