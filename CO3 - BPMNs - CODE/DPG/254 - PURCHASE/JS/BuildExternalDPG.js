var vDepositObject = new Object();
var TmpDepositObj=new Object();
var TmpDeposit = new Array();
var TmpJson='';
var vDepositJson='';
var vParentAssetId='';
var vRootAssetId='';

if(typeof vCreateDepositResponse != 'undefined'){

TmpJson=JSON.parse(vCreateDepositResponse);
vParentAssetId=TmpJson.listOfTggetgralinforqio.assetMgmtAsset[0].assetId;
vRootAssetId=vParentAssetId;

TmpDepositObj.accountName = vAccountName;
TmpDepositObj.assetNumber = 'AUTOGEN';
TmpDepositObj.billingAccountId = vBillingAccounId;
TmpDepositObj.billingProfileId = vProfileId;
TmpDepositObj.cfgStateCode = 'User Requested Item';
TmpDepositObj.cfgType = '';
TmpDepositObj.name = 'Deposito en Garantia';
TmpDepositObj.operatingStatus = 'ACTIVO';
TmpDepositObj.ownerAccountId = vOwnerAccountId;
TmpDepositObj.parentAssetId = vParentAssetId;
TmpDepositObj.rootAssetId = vRootAssetId;
TmpDepositObj.productId = '1-68DOG9';
TmpDepositObj.quantity = '1';
TmpDepositObj.serviceAccountId = '1-FVOU-1';
TmpDepositObj.status = 'ACTIVO';
TmpDepositObj.productName = 'Deposito en Garantia';
TmpDepositObj.integrationId = 'AUTOGEN';
TmpDepositObj.tgServiceActivationPoint = 'SSG';
TmpDepositObj.tgtigoSalesRepresentative = '5897456';

TmpDeposit.push(TmpDepositObj);
vDepositObject.listOfSWIAssetManagementIO=new Object();
vDepositObject.listOfSWIAssetManagementIO.swiAssetMgmtAsset=TmpDeposit;
vDepositJson=JSON.stringify(vDepositObject);

}