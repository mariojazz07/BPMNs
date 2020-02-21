var vProfileId = '';
var vProfileObject = new Object();
var vTmpList;
var vExpr = '([n,s])+:|([s,o,a,p])+:';
var regEx = new RegExp(vExpr, "gi");
var vDepositObject = new Object();
var TmpDepositObj=new Object();
var TmpDeposit = new Array();
var vDepositJson;

if (typeof vBillingProfileDetail != 'undefined') {
    vTmpList = vBillingProfileDetail.replace(regEx, "");
    vProfileObject = JSON.parse(vTmpList);
    vProfileObject = vProfileObject.Envelope.Body.queryBillingProfile_Output.listOfTgQuerybillingprofilersio.account.listOfcomInvoiceProfile.comInvoiceProfile;
    for (var i = 0; i <= vProfileObject.length; i++) {
        if (vProfileObject[i].Status == 'Activo') {
            vProfileId = vProfileObject[i].Id;
            break;
        }
    }
}

TmpDepositObj.accountName = vAccountName;
TmpDepositObj.assetNumber = 'AUTOGEN';
TmpDepositObj.billingAccountId = vBillingAccounId;
TmpDepositObj.billingProfileId = vProfileId;
TmpDepositObj.cfgStateCode = 'User Requested Item';
TmpDepositObj.cfgType = 'eConfigurator';
TmpDepositObj.name = 'DEPOSITOS';
TmpDepositObj.operatingStatus = 'ACTIVO';
TmpDepositObj.ownerAccountId = vOwnerAccountId;
TmpDepositObj.parentAssetId = '';
TmpDepositObj.rootAssetId = '';
TmpDepositObj.productId = '1-68FIGC';
TmpDepositObj.quantity = '1';
TmpDepositObj.serviceAccountId = '1-FVOU-1';
TmpDepositObj.status = 'ACTIVO';
TmpDepositObj.productName = 'DEPOSITOS';
TmpDepositObj.integrationId = 'AUTOGEN';
TmpDepositObj.tgServiceActivationPoint = 'SSG';
TmpDepositObj.tgtigoSalesRepresentative = '5897456';

TmpDeposit.push(TmpDepositObj);
vDepositObject.listOfSWIAssetManagementIO=new Object();
vDepositObject.listOfSWIAssetManagementIO.swiAssetMgmtAsset=TmpDeposit;
vDepositJson=JSON.stringify(vDepositObject);

