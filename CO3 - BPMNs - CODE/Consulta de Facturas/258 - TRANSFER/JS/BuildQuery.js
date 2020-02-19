var vError = false;
var vStatus = '';
var vAccount = ACCOUNT;
var vRetrieveDetail = '0';
var vTotalRow = '100';
var vBeginRow = '0';
var vFetchRow = '0';
var vIsEnhanced = false;
var vIsDetail = false;
var vJsonQueryObj = {queryObj: {acctAccessCode: new Object()},invoiceHeaderFilter: new Object()};
var vJsonQueryObjDetail = {acctAccessCode: new Object()};
var vJsonQuery = '';



if (productId == '9002366') {
    if (typeof INVOICE_TYPE != 'undefined') {
        vStatus = (INVOICE_TYPE == 'OPEN') ? 'O' : ((INVOICE_TYPE == 'CLOSED') ? 'C' : '');
        vJsonQueryObj.queryObj.acctAccessCode.accountCode = vAccount;
        vJsonQueryObj.invoiceHeaderFilter.status = vStatus;
        vJsonQueryObj.retrieveDetail = vRetrieveDetail;
        vJsonQueryObj.totalRowNum = vTotalRow;
        vJsonQueryObj.beginRowNum = vBeginRow;
        vJsonQueryObj.fetchRowNum = vFetchRow;
        vIsEnhanced = true;
        vJsonQuery = JSON.stringify(vJsonQueryObj);
    } else {
    }
} else if (productId == '9002367') {
    vJsonQueryObjDetail.acctAccessCode.accountCode = vAccount;
    vJsonQueryObjDetail.invoice = new Object();
    vJsonQueryObjDetail.invoice.invoiceID = INVOICE_ID;
    vJsonQueryObjDetail.totalRowNum = vTotalRow;
    vJsonQueryObjDetail.beginRowNum = vBeginRow;
    vJsonQueryObjDetail.fetchRowNum = vFetchRow;
    vIsDetail = true;
    vJsonQuery = JSON.stringify(vJsonQueryObjDetail);
}