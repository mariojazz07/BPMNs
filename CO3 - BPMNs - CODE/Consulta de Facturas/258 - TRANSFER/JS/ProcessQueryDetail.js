//var vJsonResult = getJSON(vJsonResponse);
var vJsonResult = JSON.parse(vJsonResponse);
var vTmpObject = new Object();
var vInvoiceDetail = {InvoiceDetail:new Object()};
var vTmpInvoiceArray=new Array();

var vTmpJson = vJsonResult.queryInvoiceDetailResult.invoiceDetail[0];
var vTmpTaxArray=new Array();

vTmpObject.InvoiceID = vTmpJson.invoiceID;
vTmpObject.ServiceCategory = vTmpJson.serviceCategory;
vTmpObject.ChargeCode = vTmpJson.chargeCode;
vTmpObject.ChargeAmount = vTmpJson.chargeAmount;
vTmpObject.OfferingID = vTmpJson.taxAmount;
vTmpObject.Quantity = vTmpJson.quantity;
vTmpObject.TAXAmount =vTmpJson.taxAmount;


vTmpTaxArray=vTmpJson.taxList;

for(var i=0;i<vTmpTaxArray.length;i++){
    var vTmpTaxObject=new Object();
    
    vTmpTaxObject.TaxCode=vTmpJson.taxList[i].taxCode;
    vTmpTaxObject.TaxAmt=vTmpJson.taxList[i].taxAmt;
    vTmpTaxObject.CurrencyID=vTmpJson.taxList[i].currencyId;
    vTmpInvoiceArray.push(vTmpTaxObject);

}

vTmpObject.TaxList=vTmpInvoiceArray;
vTmpObject.OpenAmount=vTmpJson.openAmount;
vTmpObject.CurrencyID=vTmpJson.currencyID;
vTmpObject.Status=vTmpJson.status;
vTmpObject.DiscountAmount=vTmpJson.discountAmt;
vTmpObject.OpenTAXAmount=vTmpJson.openTaxAmount;



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
vInvoiceDetail.InvoiceDetail=vTmpObject;
