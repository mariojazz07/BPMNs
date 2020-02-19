var vAmount = AMOUNT;
var vFeeValue = FEE_VALUE;
var vPaidFees = PAID_FEES;
var vFeesToPay = FEES_TO_PAY;
var vType = TYPE;
var vPaidType = PAID_TYPE;
var vIsPartial = false;
var vIsDeuda = false;
var vOfferingDeuda='';
var vPsqDeuda='';
var vOfferingEquipo='';
var vPsqEquipo='';

var vOldInstallTotal;
var vOldInstallAmount;
var vNewInstallTotal;
var vNewInstallAmount;


if (vPaidType == 'PARTIAL') {
    vIsPartial = true;

}
if (vType == 'DEUDA') {
    vIsDeuda = true;
    vOfferingDeuda=getMSAttributes('OFFERING_DEUDA',JsonMS);
    vPsqDeuda=getMSAttributes('SEQUENCE_DEUDA',JsonMS);
    vOldInstallTotal=getMSAttributes('CUOTAS_DEUDA',JsonMS);
    vOldInstallAmount=getMSAttributes('MONTO_DEUDA',JsonMS);

}
else if(vType='EQUIPO'){
    vOfferingEquipo=getMSAttributes('OFFERING_EQUIPO',JsonMS);
    vPsqEquipo=getMSAttributes('SEQUENCE_EQUIPO',JsonMS);
    vOldInstallTotal=getMSAttributes('CUOTAS_EQUIPO',JsonMS);
    vOldInstallAmount=getMSAttributes('MONTO_EQUIPO',JsonMS);
}



