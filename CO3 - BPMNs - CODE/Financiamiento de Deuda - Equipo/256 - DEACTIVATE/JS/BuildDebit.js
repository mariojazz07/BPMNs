var vComment='Ajuste de Debito Baja de Financiamiento';
var vProductId='9002333';
var vRequestAccount=vBillingAccount;
var vRequestAmount='';
var vRequestType='NO_FISCAL';
var vRequestOperation='DEBITO';
var vRequestMotivo='Ajuste por Financiamiento de Deuda/Equipo.';
var vTotalDebit='';

vFeeValue=parseFloat(vFeeValue).toFixed(2);
vFeeValue=parseFloat(vFeeValue);
vPaidFees=parseInt(vPaidFees);
vInstallments=parseInt(vInstallments);
vTotalDebit=(vInstallments*vFeeValue)-(vPaidFees*vFeeValue);
vRequestAmount=parseFloat(vTotalDebit);

LOGGER.info(tLinea+'vInstallments:'+vInstallments+tLinea);
LOGGER.info(tLinea+'vFeeValue:'+vFeeValue+tLinea);
LOGGER.info(tLinea+'vPaidFees:'+vPaidFees+tLinea);
LOGGER.info(tLinea+'vTotalDebit:'+vTotalDebit+tLinea);
