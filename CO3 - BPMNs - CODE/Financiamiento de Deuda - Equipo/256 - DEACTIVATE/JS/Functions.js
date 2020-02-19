function getAttributes(vJson, vType, vParameter) {
    var ParseJson = JSON.parse(vJson);
    var vInstallments = ParseJson.Installments;
    var vResult = '';
    for (var i = 0; i < vInstallments.length; i++) {
        var TmpObj = vInstallments[i];
        if (TmpObj.Type == vType) {
            vResult = TmpObj[vParameter];
            break;
        }
    }
    return vResult;
}


var tSaltoL = '\n';

var tLinea = tSaltoL + '************************************************************************' + tSaltoL ;