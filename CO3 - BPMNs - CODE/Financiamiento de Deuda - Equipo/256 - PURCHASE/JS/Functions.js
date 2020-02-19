var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

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
        var TmpMonth = parseInt(vInstallmentNumbers) + 1;
        var vTempM = vTmpDate.getMonth() + 1;
        vTmpDate.setMonth(vTempM + TmpMonth);
        var vYear = vTmpDate.getFullYear();
        var vMonth = (vTmpDate.getMonth()) < 10 ? '0' + (vTmpDate.getMonth()) : (vTmpDate.getMonth());
        var NumberOfDays = getDaysInMonth(vMonth, vYear);
        //var vDay = (vTmpDate.getDate()) < 10 ? '0' + vTmpDate.getDate() : vTmpDate.getDate();
        var vDay = NumberOfDays;
        var vFullDate = vYear.toString() + vMonth.toString() + vDay.toString() + '000000';
        vDate = vFullDate;
    }
    return vDate;
}

function getDaysInMonth(month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
}

function getDesc4Value(vIsDeuda, vIsEquipo, vDeuda) {
    var vDesc = '';
    if (vIsDeuda) {
        vDesc = 'FINANCIAMIENTO DEUDA;MONTO:' + vDeuda + ';';
    } else if (vIsEquipo) {
        vDesc = 'FINANCIAMIENTO EQUIPO;MONTO:' + vDeuda + ';';
    }
    return vDesc;
}

function getExtAppPlanValue(vIsDeuda, vIsEquipo, vDeuda) {
    var vExt = '';
    if (vIsDeuda) {
        vExt = 'FINANCIAMIENTO DEUDA;MONTO:' + vDeuda + ';';
    } else if (vIsEquipo) {
        vExt = 'FINANCIAMIENTO EQUIPO;MONTO:' + vDeuda + ';';
    }
    return vExt;
}

function fillDecimals(number, length) {
    var str = number + "";
    var dot = str.lastIndexOf('.');
    var isDecimal = dot != -1;
    var integer = isDecimal ? str.substr(0, dot) : str;
    var decimals = isDecimal ? str.substr(dot + 1) : "";
    decimals = pad(decimals, length, 0);
    return integer + decimals;
}

function pad(input, length, padding) {
    var str = input + "";
    return (length <= str.length) ? str : pad(str + padding, length, padding);
}

var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;