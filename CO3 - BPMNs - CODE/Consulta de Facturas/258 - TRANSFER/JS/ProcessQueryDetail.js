//var vJsonResult = getJSON(vJsonResponse);
var vJsonResult = JSON.parse(vJsonResponse);
var vTmpObject = new Object();
var vInvoiceDetail = {
    InvoiceDetail: new Object()
};

var vTmpInvoiceArray = new Array();
var vResultError = '';
var vTaskResult = false;
var vInvoiceDetailArray = new Array();

if (vJsonResult.resultHeader.resultCode == '0') {


    //var vTmpJson = vJsonResult.queryInvoiceDetailResult.invoiceDetail[0];
    var vTmpInvoiceDetail = vJsonResult.queryInvoiceDetailResult.invoiceDetail;


    if (vTmpInvoiceDetail instanceof Array) {
        for (var i = 0; i < vTmpInvoiceDetail.length; i++) {
            var vTmpJson = new Object();
            var vTmpObject = new Object();
            var vTmpJson = vJsonResult.queryInvoiceDetailResult.invoiceDetail[i];
            var vTmpTaxArray = new Array();
            vTmpObject.InvoiceID = vTmpJson.invoiceID;
            vTmpObject.ServiceCategory = vTmpJson.serviceCategory;
            vTmpObject.ChargeCode = vTmpJson.chargeCode;
            vTmpObject.ChargeAmount = vTmpJson.chargeAmount;
            vTmpObject.OfferingID = vTmpJson.taxAmount;
            vTmpObject.Quantity = vTmpJson.quantity;
            vTmpObject.TAXAmount = vTmpJson.taxAmount;
            vTmpTaxArray = vTmpJson.taxList;
            if (typeof vTmpTaxArray != 'undefined') {
                if (vTmpTaxArray instanceof Array) {
                    for (var j = 0; j < vTmpTaxArray.length; j++) {
                        var vTmpTaxObject = new Object();
                        vTmpTaxObject.TaxCode = vTmpJson.taxList[j].taxCode;
                        vTmpTaxObject.TaxAmt = vTmpJson.taxList[j].taxAmt;
                        vTmpTaxObject.CurrencyID = vTmpJson.taxList[j].currencyId;
                        vTmpInvoiceArray.push(vTmpTaxObject);
                    }
                } else {
                    var vTmpTaxObject = new Object();
                    vTmpTaxObject.TaxCode = vTmpJson.taxList.taxCode;
                    vTmpTaxObject.TaxAmt = vTmpJson.taxList.taxAmt;
                    vTmpTaxObject.CurrencyID = vTmpJson.taxList.currencyId;
                    vTmpInvoiceArray.push(vTmpTaxObject);
                }
            }
            vTmpObject.TaxList = vTmpInvoiceArray;
            vTmpObject.OpenAmount = vTmpJson.openAmount;
            vTmpObject.CurrencyID = vTmpJson.currencyID;
            vTmpObject.Status = vTmpJson.status;
            vTmpObject.DiscountAmount = vTmpJson.discountAmt;
            vTmpObject.OpenTAXAmount = vTmpJson.openTaxAmount;
            //Adicionales
            if (vTmpJson.AdditionalProperty instanceof Array) {
                for (var k = 0; k < vTmpJson.AdditionalProperty.length; k++) {
                    var vTmpValue = vTmpJson.AdditionalProperty[k].Value;
                    var vTmpCode = vTmpJson.AdditionalProperty[k].Code;
                    vTmpObject[vTmpValue] = vTmpCode;
                }
            } else if (typeof vTmpJson.AdditionalProperty != 'undefined') {
                var vTmpValue = vTmpJson.AdditionalProperty.Value;
                var vTmpCode = vTmpJson.AdditionalProperty.Code;
                vTmpObject[vTmpValue] = vTmpCode;
            }
            //
            //vInvoiceDetail.InvoiceDetail = vTmpObject;
            vInvoiceDetailArray.push(vTmpObject);
            vTaskResult = true;

        }
        vInvoiceDetail.InvoiceDetail = vInvoiceDetailArray;
    } else {
        var vTmpJson = vJsonResult.queryInvoiceDetailResult.invoiceDetail;
        var vTmpTaxArray = new Array();
        vTmpObject.InvoiceID = vTmpJson.invoiceID;
        vTmpObject.ServiceCategory = vTmpJson.serviceCategory;
        vTmpObject.ChargeCode = vTmpJson.chargeCode;
        vTmpObject.ChargeAmount = vTmpJson.chargeAmount;
        vTmpObject.OfferingID = vTmpJson.taxAmount;
        vTmpObject.Quantity = vTmpJson.quantity;
        vTmpObject.TAXAmount = vTmpJson.taxAmount;
        vTmpTaxArray = vTmpJson.taxList;
        if (typeof vTmpTaxArray != 'undefined') {
            if (vTmpTaxArray instanceof Array) {
                for (var j = 0; j < vTmpTaxArray.length; j++) {
                    var vTmpTaxObject = new Object();
                    vTmpTaxObject.TaxCode = vTmpJson.taxList[j].taxCode;
                    vTmpTaxObject.TaxAmt = vTmpJson.taxList[j].taxAmt;
                    vTmpTaxObject.CurrencyID = vTmpJson.taxList[j].currencyId;
                    vTmpInvoiceArray.push(vTmpTaxObject);
                }
            } else {
                var vTmpTaxObject = new Object();
                vTmpTaxObject.TaxCode = vTmpJson.taxList.taxCode;
                vTmpTaxObject.TaxAmt = vTmpJson.taxList.taxAmt;
                vTmpTaxObject.CurrencyID = vTmpJson.taxList.currencyId;
                vTmpInvoiceArray.push(vTmpTaxObject);
            }
        }
        vTmpObject.TaxList = vTmpInvoiceArray;
        vTmpObject.OpenAmount = vTmpJson.openAmount;
        vTmpObject.CurrencyID = vTmpJson.currencyID;
        vTmpObject.Status = vTmpJson.status;
        vTmpObject.DiscountAmount = vTmpJson.discountAmt;
        vTmpObject.OpenTAXAmount = vTmpJson.openTaxAmount;
        //Adicionales
        if (vTmpJson.AdditionalProperty instanceof Array) {
            for (var k = 0; k < vTmpJson.AdditionalProperty.length; k++) {
                var vTmpValue = vTmpJson.AdditionalProperty[k].Value;
                var vTmpCode = vTmpJson.AdditionalProperty[k].Code;
                vTmpObject[vTmpValue] = vTmpCode;
            }
        } else if (typeof vTmpJson.AdditionalProperty != 'undefined') {
            var vTmpValue = vTmpJson.AdditionalProperty.Value;
            var vTmpCode = vTmpJson.AdditionalProperty.Code;
            vTmpObject[vTmpValue] = vTmpCode;
        }
        //
        vInvoiceDetail.InvoiceDetail = vTmpObject;
        vTaskResult = true;
    }
} else {
    vResultError = vJsonResult.resultHeader.resultDesc;
}