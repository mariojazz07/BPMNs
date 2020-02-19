var vLogJson = {
    queryObj: new Object()
};
var vJsonResult = getJSON(vJsonResponse);
var vTmpJson = '';
var vStarDate = '';
var vEndDate = '';
var vJsonQuery='';

if (typeof vJsonResult.QueryInvoiceEnhancedResultMsg.QueryInvoiceEnhancedResult != 'undefined') {
    vTmpJson = vJsonResult.QueryInvoiceEnhancedResultMsg.QueryInvoiceEnhancedResult.InvoiceInfo;
    if (vTmpJson instanceof Array) {
        vStarDate = vTmpJson[0].InvoiceDate;
        vEndDate = vTmpJson[vTmpJson.length - 1].InvoiceDate;
    } else {
        vStarDate = vTmpJson.InvoiceDate;
        vEndDate = vTmpJson.InvoiceDate;
    }
}

vLogJson.queryObj.acctAccessCode = new Object();
vLogJson.queryObj.acctAccessCode.accountKey = ACCOUNT;
vLogJson.queryObj.totalRowNum = '100';
vLogJson.queryObj.beginRowNum = '0';
vLogJson.queryObj.fetchRowNum = '100';
vLogJson.queryObj.startTime = vStarDate;
vLogJson.queryObj.endTime = vEndDate;
vJsonQuery = JSON.stringify(vLogJson);


