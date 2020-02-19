var vType = '';
var vAccount = '';
var vInvoicesNo = '';
var vAmounts = '';
var vIsDeuda = false;
var vDeudaTotal = 0;
var vInvoice = '';
var vInvoiceAmount = '';
var vCounter = 0;
var vInstallmentOffer = '';
var vInstallmentNumber = '';
var vInstallmentDate = INITIAL_PAYMENT_DATE;
var vTmpString = '';
var vPrima=PRIMA;
var vTotalAmount='';

if (typeof TYPE != 'undefined') {
    vType = TYPE;
}

if (vType.toUpperCase() == 'DEUDA') {
    vIsDeuda = true;
    // vInvoicesNo = INVOICES_No.split(" ");
     vAmounts = AMOUNTS.split(" ");
    // vInvoice = vInvoicesNo[vCounter];
    // vInvoiceAmount = vAmounts[vCounter];
    vInstallmentOffer = OFFERING_NUMBER_DEUDA;
    vInstallmentNumber = parseInt(INSTALLMENTS);

    for (var i = 0; i < vAmounts.length; i++) {

        vDeudaTotal += parseFloat(vAmounts[i]);
    }

    vTotalAmount=vDeudaTotal-parseFloat(vPrima);

} else {
    vInstallmentOffer = OFFERING_NUMBER_EQUIPO;
    vInstallmentNumber = parseInt(INSTALLMENTS);
    vInvoicesNo = INVOICES_No;
    vAmounts = AMOUNTS;
    vDeudaTotal += parseFloat(vAmounts);
    vTotalAmount=vDeudaTotal-parseFloat(vPrima);
}