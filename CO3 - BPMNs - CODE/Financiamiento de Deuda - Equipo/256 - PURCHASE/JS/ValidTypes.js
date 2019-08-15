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
var vInstallmentNumber='';
var vInstallmentDate=INITIAL_PAYMENT_DATE;

if (typeof TYPE != 'undefined') {
    vType = TYPE;
}

if (vType == 'DEUDA') {
    vIsDeuda = true;
    vInvoicesNo = INVOICES_No.split(",");
    vAmounts = AMOUNTS.split(",");
    vInvoice = vInvoicesNo[vCounter];
    vInvoiceAmount = vAmounts[vCounter];
    vInstallmentOffer = OFFERING_NUMBER_DEUDA;
    vInstallmentNumber=INSTALLMENTS.parseInt();
    
    for(var i=0;i<vAmounts.length;i++){

        vDeudaTotal+=vAmounts[i].parseFloat();
    }

} else {
    vInstallmentOffer = OFFERING_NUMBER_EQUIPO;
    vInstallmentNumber=INSTALLMENTS.parseInt();
    for(var i=0;i<vAmounts.length;i++){

        vDeudaTotal+=vAmounts[i].parseFloat();
    }
}