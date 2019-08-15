var vJsonResult = getJSON(vJsonResponse);
var vTmpObject = new Object();
var vInvoiceInfo = new Array();
var InvoicesObj={Invoices:new Object};
var vTmpJson = vJsonResult.QueryInvoiceEnhancedResultMsg.QueryInvoiceEnhancedResult.InvoiceInfo;

for (var i = 0; i < vTmpJson.length; i++) {
    vTmpObject = new Object();
    vTmpObject.PrimaryIdentity = subscriberId;
    vTmpObject.AccountKey = vTmpJson[i].AcctKey;
    vTmpObject.InvoiceType = vTmpJson[i].InvoiceType;
    vTmpObject.TransType = vTmpJson[i].TransType;
    vTmpObject.InvoiceID = vTmpJson[i].InvoiceID;
    vTmpObject.InvoiceNo = vTmpJson[i].InvoiceNo;
    vTmpObject.BillCycleID = vTmpJson[i].BillCycleID;
    vTmpObject.InvoiceAmount = vTmpJson[i].InvoiceAmount;
    vTmpObject.TAXAmount = vTmpJson[i].TAXAmount;
    vTmpObject.OpenAmount = vTmpJson[i].OpenAmount;
    vTmpObject.InvoiceDate = vTmpJson[i].InvoiceDate;
    vTmpObject.DueDate = vTmpJson[i].DueDate;
    vTmpObject.Status = vTmpJson[i].Status;
    vTmpObject.OpenTaxAmount = vTmpJson[i].OpenTaxAmount;
    //Adicionales
    if (vTmpJson.AdditionalProperty instanceof Array) {
        for (var j = 0; j < vTmpJson.AdditionalProperty.length; j++) {
            var vTmpValue = vTmpJson.AdditionalProperty[j].Value;
            var vTmpCode = vTmpJson.AdditionalProperty[j].Code;
            vTmpObject[vTmpValue] = vTmpCode;

        }
    } else if (typeof vTmpJson.AdditionalProperty != 'undefined') {
        var vTmpValue = vTmpJson.AdditionalProperty.Value;
        var vTmpCode = vTmpJson.AdditionalProperty.Code;
        vTmpObject[vTmpValue] = vTmpCode;
    }

    //
    vInvoiceInfo.push(vTmpObject);


}

InvoicesObj.Invoices.InvoiceInfo=vInvoiceInfo;