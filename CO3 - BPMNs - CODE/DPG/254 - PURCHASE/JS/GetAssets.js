var vJsonRequestBillingProfile = '';
var vAccountName = '';
var vBillingAccounId = '';
var vBillingProfileId = '';
var vBillingAccountName = '';
var vOwnerAccountId = '';
var vServiceAccountId = '';
var vTempObject = new Object();
var vError = false;
if (typeof vCustomerDetails != 'undefined' && typeof vBillingDetails != 'undefined' && typeof vServiceDetails != 'undefined') {
    vTempObject = JSON.parse(vCustomerDetails);
    vAccountName = vTempObject.listOfTgquerycustomerinforsio.account.name;
    vTempObject = new Object();
    vTempObject = JSON.parse(vBillingDetails);
    vBillingAccountName = vTempObject.listOfTgquerycustomerinforsio.account.name;
    vBillingAccounId = vTempObject.listOfTgquerycustomerinforsio.account.rowId;
    vBillingProfileId = new Object();
    vBillingProfileId.name = vBillingAccountName;
    vJsonRequestBillingProfile=JSON.stringify(vBillingProfileId);
    vTempObject = new Object();
    vTempObject = JSON.parse(vServiceDetails);
    vOwnerAccountId = vTempObject.listOfTgquerycustomerinforsio.account.masterAccountId;
    vServiceAccountId = vTempObject.listOfTgquerycustomerinforsio.account.rowId;
} else {
    vError = true;
}