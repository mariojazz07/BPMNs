var vError = false;
var vStatus = '';
var vAccount = ACCOUNT;
var vRetrieveDetail = '0';
var vTotalRow = '100';
var vBeginRow = '0';
var vFetchRow = '0';
var vIsEnhanced=false;
var vIsDetail=false;
var vJsonQuery = {
    queryObj: {
        acctAccessCode: new Object()
    },
    invoiceHeaderFilter: new Object()
};

if (productId == '9002366') {
    if (typeof INVOICE_TYPE != 'undefined') {
        vStatus = (INVOICE_TYPE == 'OPEN') ? 'O' : ((INVOICE_TYPE == 'CLOSED') ? 'C' : '');


    }
    vJsonQuery.queryObj.acctAccessCode.accountCode = vAccount;
    vJsonQuery.invoiceHeaderFilter.Status = vStatus;
    vJsonQuery.retrieveDetail = vRetrieveDetail;
    vJsonQuery.totalRowNum = vTotalRow;
    vJsonQuery.beginRowNum = vBeginRow;
    vJsonQuery.fetchRowNum = vFetchRow;
    vIsEnhanced=true;



}

else if(productId=='9002367'){

    vJsonQuery.queryObj.acctAccessCode.accountCode = vAccount;
    vJsonQuery.invoice=new Object();
    vJsonQuery.invoice.invoiceID=INVOICE_ID;
    vJsonQuery.totalRowNum = vTotalRow;
    vJsonQuery.beginRowNum = vBeginRow;
    vJsonQuery.fetchRowNum = vFetchRow;
    vIsDetail=true;

}