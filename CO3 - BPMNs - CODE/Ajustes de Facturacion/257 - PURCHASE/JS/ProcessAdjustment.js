var vIsFiscal = false;
var vAccount = ACCOUNT;
var vAmount = AMOUNT;
var vType = TYPE;
var vOperation = OPERATION;
var vMotivo = MOTIVO;
var vSucursal = '';
var vRuleType = '';


if (typeof vType != 'undefined') {
    if (vType == 'FISCAL') {
        vIsFiscal = true;
        vSucursal = SUCURSAL;
        var vInvoiceNo = INVOICE_No;

    } else if (vType == 'NO_FISCAL') {

        vSucursal = 'NA';
    }
}

if (vOperation == 'CREDITO' && vIsFiscal) {
    vRuleType = 'NC';
} else if (vOperation == 'DEBITO' && vIsFiscal) {
    vRuleType = 'ND';
} else if (vOperation == 'CREDITO' && !vIsFiscal) {
    vRuleType = 'NAC';
} else if (vOperation == 'DEBITO' && !vIsFiscal) {
    vRuleType = 'NAD';
}