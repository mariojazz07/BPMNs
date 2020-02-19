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


function getActiveDPG(strJson) {
    var vActives = new Array();
    for (var i = 0; i <= strJson.length; i++) {
        if (strJson[i].DEPOSIT_TYPE == 'DPG') {
            if (strJson[i].STATUS == 'DISPONIBLE' || strJson[i].STATUS == 'AFECTADO') {
                vActives.push(strJson[i]);
            }
        }
    }
    return vActives;
}

function getActiveDPA(strJson) {
    var vActives = new Array();
    for (var i = 0; i <= strJson.length; i++) {
        if (strJson[i].DEPOSIT_TYPE == 'DPA') {
            if (strJson[i].STATUS == 'DISPONIBLE' || strJson[i].STATUS == 'AFECTADO') {
                vActives.push(strJson[i]);
            }
        }
    }
    return vActives;
}

var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;