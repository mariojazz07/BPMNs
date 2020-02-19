var vJson = {OfferingInst :{OfferingOwner :new Object(), OfferingKey : new Object(), OfferingInstProperty :new Object()}};
var vTmpArrayAdd = new Array();
var vTmpArrayDel = new Array();
var vTmpObject = new Object();
var vProperties = ['C_INSTALL_TOTAL_CYCLE', 'C_INSTALL_AMOUNT_PER_CYCLE'];
var vSysdate=new Date();
var vRequestJson='';


vJson.OfferingInst.OfferingOwner.SubAccessCode = new Object();
vJson.OfferingInst.OfferingOwner.SubAccessCode.PrimaryIdentity = subscriberId;
vJson.OfferingInst.OfferingKey.OfferingID = vOfferingDeuda;
vJson.OfferingInst.OfferingKey.PurchaseSeq = vPsqDeuda;
vJson.OfferingInst.OfferingInstProperty.AddProperty = new Object();
vJson.OfferingInst.OfferingInstProperty.DelProperty = new Object();

//AddProperties
vTmpObject.PropCode = vProperties[0];
vTmpObject.PropType = '1';
vNewInstallTotal=parseInt(vOldInstallTotal) - parseInt(vPaidFees) - parseInt(vFeesToPay);
vTmpObject.Value = vNewInstallTotal.toString();
var vNewExpirationDeuda=getTimeCBS(false,getDateYMD(vSysdate),true,vNewInstallTotal);
vTmpObject.ExpirationTime=vNewExpirationDeuda;
vTmpArrayAdd.push(vTmpObject);
vJson.OfferingInst.OfferingInstProperty.AddProperty=vTmpArrayAdd;

vTmpObject=new Object();

// vTmpObject.PropCode = vProperties[1];
// vTmpObject.PropType = '1';
// vTmpObject.Value = parseFloat(vFeeValue);
// vTmpArray.push(vTmpObject);


//DelProperties
vTmpObject.PropCode = vProperties[0];
vTmpObject.PropType = '1';
vTmpObject.Value = vOldInstallTotal;
vTmpObject.ExpirationTime=new Object();
vTmpObject.ExpirationTime.Mode='S';
vTmpArrayDel.push(vTmpObject);
vJson.OfferingInst.OfferingInstProperty.DelProperty=vTmpArrayDel;

vRequestJson=JSON.stringify(vJson);

var vChargeAmt=parseInt(vFeesToPay)*parseFloat(vFeeValue).toFixed(2);