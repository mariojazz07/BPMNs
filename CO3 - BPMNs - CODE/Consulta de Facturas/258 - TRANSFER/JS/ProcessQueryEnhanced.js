var vJsonResult = getJSON(vJsonResponse);
var vTmpObject = new Object();
var vInvoiceInfo = new Array();
var InvoicesObj = {
    Invoices: new Object
};
var vResultError = '';
var vTaskResult = false;
var vTmpJson = '';
if(typeof vJsonResult.QueryInvoiceEnhancedResultMsg.QueryInvoiceEnhancedResult != 'undefined'){
    vTmpJson = vJsonResult.QueryInvoiceEnhancedResultMsg.QueryInvoiceEnhancedResult.InvoiceInfo;
}

if (vJsonResult.QueryInvoiceEnhancedResultMsg.ResultHeader.ResultCode == '0' && typeof vTmpJson != 'undefined') {


    if (vTmpJson instanceof Array) {
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
    } else {

        vTmpObject = new Object();
        vTmpObject.PrimaryIdentity = subscriberId;
        vTmpObject.AccountKey = vTmpJson.AcctKey;
        vTmpObject.InvoiceType = vTmpJson.InvoiceType;
        vTmpObject.TransType = vTmpJson.TransType;
        vTmpObject.InvoiceID = vTmpJson.InvoiceID;
        vTmpObject.InvoiceNo = vTmpJson.InvoiceNo;
        vTmpObject.BillCycleID = vTmpJson.BillCycleID;
        vTmpObject.InvoiceAmount = vTmpJson.InvoiceAmount;
        vTmpObject.TAXAmount = vTmpJson.TAXAmount;
        vTmpObject.OpenAmount = vTmpJson.OpenAmount;
        vTmpObject.InvoiceDate = vTmpJson.InvoiceDate;
        vTmpObject.DueDate = vTmpJson.DueDate;
        vTmpObject.Status = vTmpJson.Status;
        vTmpObject.OpenTaxAmount = vTmpJson.OpenTaxAmount;
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

    InvoicesObj.Invoices.InvoiceInfo = vInvoiceInfo;
    vTaskResult = true;
} else {
    vResultError = vJsonResult.QueryInvoiceEnhancedResultMsg.ResultHeader.ResultDesc;
    if(vResultError=='Operation successfully.'){
        vTaskResult=true;
    }

}