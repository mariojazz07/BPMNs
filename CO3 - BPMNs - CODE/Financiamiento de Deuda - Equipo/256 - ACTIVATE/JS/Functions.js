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


function getTimeCBS(vIsEffective, vEffectiveDate, vIsExpire, vInstallmentNumbers) {
    var vDate = new Date();
    if (vIsEffective) {
        if (vEffectiveDate != '') {
            vEffectiveDate = vEffectiveDate + '000000';
        }
        vDate = vEffectiveDate;
    } else if (vIsExpire) {
        var vTmpDate = new Date(getFinancialDate(vEffectiveDate + '000000'));
        var TmpMonth = parseInt(vInstallmentNumbers) + 2;
        var vTempM = vTmpDate.getMonth() + 1;
        //vTmpDate.setMonth(vTempM + TmpMonth);
        vTmpDate.setMonth(vTmpDate.getMonth() + TmpMonth);
        var vYear = vTmpDate.getFullYear();
        var vMonth = (vTmpDate.getMonth()) < 10 ? '0' + (vTmpDate.getMonth()) : (vTmpDate.getMonth());
        var vDay = (vTmpDate.getDate()) < 10 ? '0' + vTmpDate.getDate() : vTmpDate.getDate();
        var vFullDate = vYear.toString() + vMonth.toString() + vDay.toString() + '000000';
        vDate = vFullDate;
    }
    return vDate;
}

function getDateYMD(vDate) {
    var now = vDate;
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return '' + y + mm + dd;
}