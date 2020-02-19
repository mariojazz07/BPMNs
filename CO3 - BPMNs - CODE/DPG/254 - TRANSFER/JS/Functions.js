function getMSAttributes(vName, MSJson) {
    var vList = JSON.parse(MSJson);
    //var vAttributeList=vList.atributeList;
    var vValue = '';
    for (var i = 0; i < vList.length; i++) {
        if (vList[i].name == vName) {
            vValue = vList[i].value;
            break;
        }
    }
    return vValue;
}


function getMSAttributesV2(vAccount,vName, MSJson,vIsDPG) {
    var vTmpObject=new Object();
    var vList = JSON.parse(MSJson);
        for(var i=0;i<=vList.length;i++){
      if(vList[i].name=='JSON_DEPOSIT'){
         var vJsonObject = vList[i].value;
         break;
      }
    }
    if(vIsDPG){
        vTmpObject=vJsonObject.DEPOSIT_INFO
    }


    return vValue;
}

function getDepositBalance(vAccount, vJson, vIsDPG, vIsDPA) {
    var vObject = '';
    var vDepositAmount = '';
    
    if (vJson.resultHeader.resultCode == 0) {
        vObject = vJson.queryBalanceResult.acctList;
        for (var i = 0; i <= vObject.length; i++) {
            if (vObject[i].acctKey == vAccount) {
                vObject = vObject[i];
                break;
            }
        }

        if (vIsDPG) {
            for (var j = 0; j <= vObject.balanceResult.length; j++) {
                if (vObject.balanceResult[j].balanceType == 'C_DEPOSITO_PAGO_EN_GARANTIA') {
                    vObject = vObject.balanceResult[j];
                    vDepositAmount = (parseFloat(vObject.totalAmount))/1000000;
                    break;
                }
            }
        } else if (vIsDPA) {
            for (var k = 0; k <= vObject.balanceResult.length; k++) {
                if (vObject.balanceResult[k].balanceType == 'C_MAIN_BILLING_ACCOUNT') {
                    vObject = vObject.balanceResult[k];
                    vDepositAmount = (parseFloat(vObject.totalAmount))/1000000;
                    break;
                }
            }
        }
    }

    return vDepositAmount;
}

var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;