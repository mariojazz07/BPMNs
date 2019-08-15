var vPackageBalance = 'C_Internet_Pack';
var walletJson;
var packageWallet;
var vServiceName = '';
var vQuotaInitVal = '';
var vQuotaConsumption = '';
var vQuotaBalance = '';
var vQuotaLevel = '';
var vNextResetTime = '00:00:00';
var vQuotaName = '';
var vServiceStrtTime = '';
var vServiceEndTime = '';
var packageInstance;
var foundHist = false;
var consumptionPcntg = 100;

if(typeof vFreeUnitWallets != 'undefined'){
    walletJson = getWalletJSON(vFreeUnitWallets);
    if(typeof(walletJson) != 'undefined'){
        packageWallet = getWalletByType(vPackageBalance, walletJson);
        packageInstance = getInstanceByOfferingPchsSeq(offeringId, purchaseSeq, packageWallet.FreeUnitItemDetail);
        if(typeof packageInstance != 'undefined'){
            foundHist = true;
            vServiceName = packageInstance.FreeUnitOrigin.OfferingKey.OfferingID;
            vQuotaInitVal = packageInstance.InitialAmount;
            vQuotaBalance = packageInstance.CurrentAmount;
            vQuotaConsumption = Math.abs(new Number(vQuotaInitVal) - new Number(vQuotaBalance)).toFixed(0);
            vQuotaName = 'N/A';//vPackageBalance + ' - ' + packageInstance.FreeUnitInstanceID;
            vServiceStrtTime = getCbsDateStr(packageInstance.EffectiveTime);
            vServiceEndTime = getCbsDateStr(packageInstance.ExpireTime);
            consumptionPcntg = (vQuotaConsumption / new Number(vQuotaInitVal)) * 100;
            if(consumptionPcntg >= 80 && consumptionPcntg < 100){
                vQuotaLevel = '1';
            } else if(consumptionPcntg >= 100){
                vQuotaLevel = '5';
            } else {
                vQuotaLevel = '0';
            }
        }
    }
}

function getInstanceByOfferingPchsSeq(offering, pchsSeq, walletObj){
    var instanceObj;
    var tmpOffering;
    var tmpPchsSeq;
    if(typeof(walletObj) != 'undefined'){
        if(walletObj instanceof Array) {
            for(var i = 0; i < walletObj.length; i++){    
               if (typeof(walletObj[i].FreeUnitOrigin) != 'undefined') {
                    tmpOffering = walletObj[i].FreeUnitOrigin.OfferingKey.OfferingID;
                    tmpPchsSeq = walletObj[i].FreeUnitOrigin.OfferingKey.PurchaseSeq;
                    if(offering == tmpOffering && pchsSeq == tmpPchsSeq){
                        instanceObj = walletObj[i];
                        break;
                    }
                }
            }
        } else {
            if (typeof(walletObj.FreeUnitOrigin) != 'undefined') {
                tmpOffering = walletObj.FreeUnitOrigin.OfferingKey.OfferingID;
                tmpPchsSeq = walletObj.FreeUnitOrigin.OfferingKey.PurchaseSeq;
                if(offering == tmpOffering && pchsSeq == tmpPchsSeq){
                    instanceObj = walletObj;
                }
            }
        }
    }
    return instanceObj;
}
function getCbsDateStr(cbsDate){
//20161012000000
    var vYear = cbsDate.substring(0, 4);
    var vMonth = cbsDate.substring(4, 6);
    var vDay = cbsDate.substring(6, 8);
    var vHours = cbsDate.substring(8, 10);
    var vMinutes = cbsDate.substring(10, 12);
    var vSeconds = cbsDate.substring(12, 14);
    return  padStr(vMonth, 2, '0', STR_PAD_LEFT) + '-' + padStr(vDay, 2, '0', STR_PAD_LEFT) + '-' + padStr(vYear, 2, '0', STR_PAD_LEFT) + ' ' + padStr(vHours, 2, '0', STR_PAD_LEFT) + ':' + padStr(vMinutes, 2, '0', STR_PAD_LEFT) + ':' + padStr(vSeconds, 2, '0', STR_PAD_LEFT);
}