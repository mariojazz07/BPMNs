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
        var TmpDate = new Date(getFinancialDate(vEffectiveDate));
        var TmpMonth = parseInt(vInstallmentNumbers) + 1;
        TmpDate.setMonth(TmpDate.getMonth() + TmpMonth);
        var vYear = vTmpDate.getFullYear();
        var vMonth = (vTmpDate.getMonth()) < 10 ? '0' + (vTmpDate.getMonth()) : (vTmpDate.getMonth());
        var vDay = (vTmpDate.getDate()) < 10 ? '0' + vTmpDate.getDate() : vTmpDate.getDate();
        var vFullDate = vYear + vMonth + vDay + '000000';
        vDate = vFullDate;
    }

    return vDate;
}

function getDesc4Value(vIsDeuda, vIsEquipo, vDeuda) {
    var vDesc = '';

    if (vIsDeuda) {
        vDesc = 'FINANCIAMIENTO DEUDA;MONTO:' + vDeuda + ';';
    } else if (vIsEquipo) {
        vDesc = 'FINANCIAMIENTO EQUIPO;MONTO:' + vDeuda + ';';
    }
}

var tSaltoL = '\n';

var tLinea = tSaltoL + '************************************************************************' + tSaltoL;