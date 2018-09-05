var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;
var BPMN_RESPONSE_CODE = '100';
var BPMN_RESPONSE_MESSAGE = 'Error durante el proceso.';
var vSysDate = new Date();
var strPackBalance = 'C_Internet_Pack';
var strPlanBalance = 'C_Data_Include';
var strSusBalance = 'C_Internet_Suscripcion';
var strAddonBalance = 'C_Data_Add';
var forCounter = 0;
var doLoop = false;
var vAddonProfile = '110';
var plMultiQuota = false;
var multiQuotasLst = 'NXS';
var quotaBL = 'TEST_FUP_APP_FACEBOOK Quota';
var vSkipBundle = false;
var vSkipChannels = '30';
var vUnifyAppsChannels = '30';
var vUnifyApps = false;
var vChannelPC = '30';
var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;

if (typeof (CHANNELS) != 'undefined') {
    vSkipChannels = CHANNELS;
}
if (typeof (CHANNEL_PC) != 'undefined') {
    vChannelPC = CHANNEL_PC;
}
if (typeof (CHANNELS_APP) != 'undefined') {
    vUnifyAppsChannels = CHANNELS_APP;
}
if (typeof (QUOTA_BL) != 'undefined') {
    quotaBL = QUOTA_BL;
}
if (typeof (MULTI_LST) != 'undefined') {
    multiQuotasLst = MULTI_LST;
}
if (typeof (ORIGEN) != 'undefined') {
    plMultiQuota = multiQuotasLst.toUpperCase().indexOf(ORIGEN.toUpperCase()) >= 0;
}
vSkipBundle = checkChannels(vSkipChannels);
vUnifyApps = checkChannels(vUnifyAppsChannels);

function checkChannels(channelLst) {
    var chnnlArray = channelLst.split(',');
    var flag = false;
    for (var i = 0; i < chnnlArray.length; i++) {
        if (chnnlArray[i] == channelId) {
            flag = true;
            break;
        }
    }
    return flag;
}
//Funcion a la cual se le manda un valor y le hace lpad o rpad con el caracter indicado y la longitud indicada
function padStr(str, len, pad, dir) {
    if (typeof (len) == 'undefined') {
        var len = 0;
    };
    if (typeof (pad) == 'undefined') {
        var pad = ' ';
    };
    if (typeof (dir) == 'undefined') {
        var dir = STR_PAD_RIGHT;
    };
    if (len + 1 >= str.length) {
        switch (dir) {
            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
                break;
            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                break;
            default:
                str = str + Array(len + 1 - str.length).join(pad);
                break;
        } // switch
    }
    return str;
}
//Convierte un valor texto a al formato yyyyMMddhhmiss
function parseDateToStringCBS(date) {
    var day = padStr(String(date.getDate()), 2, '0', STR_PAD_LEFT);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = padStr(String(month), 2, '0', STR_PAD_LEFT);
    var hours = padStr(String(date.getHours()), 2, '0', STR_PAD_LEFT);
    var minutes = padStr(String(date.getMinutes()), 2, '0', STR_PAD_LEFT);
    var seconds = padStr(String(date.getSeconds()), 2, '0', STR_PAD_LEFT);
    var format = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds;
    return format;
}
//Convierte un Time a un string de Date en formato yyyy-MM-ddThh:mm:ss.000-06:00
function parseTimeToDate(date, timeZone) {
    var strDate = parseDateToString(date);
    strDate = timeZone ? strDate.replace(' ', 'T') + '.000-06:00' : strDate.replace(' ', 'T');
    return strDate;
}
//Transforma un string con formato de fecha a un objeto Date
function parseStringToDate(strDate) {
    strDate = strDate.replace(/\D/g, ' ');
    var dateArray = strDate.split(' ');
    var year = dateArray[0];
    var month = dateArray[1] - 1;
    var day = dateArray[2];
    var hours = dateArray[3];
    var minutes = dateArray[4];
    var seconds = dateArray[5];
    return new Date(year, month, day, hours, minutes, seconds);
}
//Convierte un valor texto a al formato yyyy-MM-dd hh:mm:ss
function parseDateToString(date) {
    var day = padStr(String(date.getDate()), 2, '0', STR_PAD_LEFT);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = padStr(String(month), 2, '0', STR_PAD_LEFT);
    var hours = padStr(String(date.getHours()), 2, '0', STR_PAD_LEFT);
    var minutes = padStr(String(date.getMinutes()), 2, '0', STR_PAD_LEFT);
    var seconds = padStr(String(date.getSeconds()), 2, '0', STR_PAD_LEFT);
    var format = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return format;
}

function getCbsDate(cbsDate) {
    var vYear = cbsDate.substring(0, 4);
    var vMonth = new Number(cbsDate.substring(4, 6)) - 1;
    var vDay = cbsDate.substring(6, 8);
    var vHours = cbsDate.substring(8, 10);
    var vMinutes = cbsDate.substring(10, 12);
    var vSeconds = cbsDate.substring(12, 14);
    return new Date(vYear, vMonth, vDay, vHours, vMinutes, vSeconds);
}