function getMSAttributes(vName, MSJson) {
    var vList = JSON.parse(MSJson);
    //var vAttributeList=vList.atributeList;
    var vValue='';
    for (var i = 0; i < vList.length; i++) {
        if (vList[i].name == vName) {
            vValue = vList[i].value;
            break;
        }
    }
    return vValue;
}

function getFinancialDate(InstallDate) {
    var vYear = InstallDate.substring(0, 4);
    var vMonth = new Number(InstallDate.substring(4, 6)) - 1;
    var vDay = InstallDate.substring(6, 8);
    var vHours = InstallDate.substring(8, 10);
    var vMinutes = InstallDate.substring(10, 12);
    var vSeconds = InstallDate.substring(12, 14);
    return new Date(vYear, vMonth, vDay, vHours, vMinutes, vSeconds);
}