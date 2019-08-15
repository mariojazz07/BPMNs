var doLoop = false;

vCounter++;

if (vInvoicesNo.length < vCounter) {
    vInvoice = vInvoicesNo[vCounter];
    vInvoiceAmount = vAmounts[vCounter];
    doLoop = true;
}