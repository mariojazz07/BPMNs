function getTotalAmount(vBalanceInfo) {
    var vTmpObject = '';
    var vTmpOutstanding = '';
    var vTotalAmount = 0;
  
    if (typeof vBalanceInfo != 'undefined') {
      vTmpObject = vBalanceInfo.queryBalanceResult.acctList;
      for (var i = 0; i < vTmpObject.length; i++) {
        vTmpOutstanding = vTmpObject[i].outStandingList;
        if(typeof vTmpOutstanding != 'undefined'){
        for (j = 0; j < vTmpOutstanding.length; j++) {
          vTotalAmount += parseFloat(vTmpOutstanding[j].outStandingDetail[0].outStandingAmount);
        }
        }
      }
    }
  
    return vTotalAmount/1000000;
  }

function getJSON(strJson) {
    var vExpr = "([a,r,s]+|[t*,n,s,(0-9)*]+|[v,(0-9)*]+|[a,r,c]+|[c,b,s]+):";
    var vNumExpr = '("[a-z]+":)([0-9]+)(s*,|}|$)';
    var regEx;
    var numRegExp;
    var tmpJson = "";
    if (typeof REG_EXP != "undefined") {
        vExpr = REG_EXP;
    }
    regEx = new RegExp(vExpr, "gi");
    numRegExp = new RegExp(vNumExpr, "gmi");
    tmpJson = strJson.replace(regEx, "");
    tmpJson = tmpJson.replace(numRegExp, '$1"$2"$3');
    return JSON.parse(tmpJson);
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