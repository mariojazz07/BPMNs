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

var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;