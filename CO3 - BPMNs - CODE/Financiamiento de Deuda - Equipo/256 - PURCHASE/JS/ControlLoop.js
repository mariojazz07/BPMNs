var doLoop = false;

vCounter++;

if (vInvoicesNo.length < vCounter) {
    vRequestInvoiceNo = vInvoicesNo[vCounter];
    vRequestAmount = vAmounts[vCounter];
    doLoop = true;
}