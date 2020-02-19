var vInstanciasTotal = 0;
var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;
var BPMN_RESPONSE_CODE = '100';
var BPMN_RESPONSE_MESSAGE = 'Error durante el proceso.';
var BPMN_RESPONSE_NOTIFY_ADAPTER = '-1';
var MESSAGE = MENSAJE_ERROR;
var sendSms = true;
var vTransactionId = transactionId;
var vProductIdBB = '129';
var vExternalTransacionId = '0';
var vSysDate = new Date();
var vMtrProduct = MTR;
var vRemark2 = 'NA;';
var vProductIdDelegate = '273';
var vTask = '9';
var vComment = 'Subscriber delegation';
var vRecurrent = 'FALSE';
var vQuantity = '1';
var vDescription = 'Master Status Delegate';
var vScheduleDT = new Date(vSysDate.getTime());
var vScheduleDateDelegate = parseTimeToScheduleDate(vScheduleDT.getTime());
var vDelegateSell = 'TRUE';
var vDelegateNotify = 'TRUE';
var vSellWL = '250,251,246,247,248,252';
var vRemoveAcl = false;
var vAclId = '0';
var vAclAction = 'REMOVE';
var vImsi = '-1';
var vImei = '-1';
var vMake = 'NA';
var vModel = 'NA';
var vMtrPcc = 'NA';
vScheduleDT.setSeconds(vSysDate.getSeconds() + 6);
vDelegateSell = vSellWL.indexOf(productId) < 0 ? 'TRUE' : 'FALSE';
vDelegateNotify = vDelegateSell;
if (typeof WL_REMOVE != 'undefined') {
    vRemoveAcl = WL_REMOVE.toUpperCase() == 'TRUE';
}
if (typeof ACL_FREE_PAQ_ID != 'undefined') {
    vAclId = ACL_FREE_PAQ_ID;
}
if (typeof ACL_ACTION_ADD != 'undefined') {
    vAclAction = ACL_ACTION_ADD;
}
if (typeof externalTransacionId != 'undefined') {
    if (externalTransacionId != '' && externalTransacionId != ' ' && externalTransacionId != '0' && externalTransacionId != null && externalTransacionId != 'null') {
        vExternalTransacionId = externalTransacionId;
        vTransactionId = externalTransacionId;
    }
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
//Transforma el mtr que se pasa a COMVERSE
function transformMtr(mtr, vProducto, vCalendario, vAprovisiona, vPrestamo, vCosto, vComision, vSvcKey, vPrecio) {
    var vMtrTransform = mtr;
    var fechaActual = new Date();
    var strFecha = parseDateToStringAS(fechaActual);
    vMtrTransform = vMtrTransform.replace('PRODUCT_ID', vProducto);
    vMtrTransform = vMtrTransform.replace('CANAL_ACTIVACION', channelId);
    vMtrTransform = vMtrTransform.replace('TRANSACTION_ID', vTransactionId);
    vMtrTransform = vMtrTransform.replace('CALENDARIO', vCalendario);
    vMtrTransform = vMtrTransform.replace('APROVISIONA', vAprovisiona);
    vMtrTransform = vMtrTransform.replace('FECHA', strFecha);
    vMtrTransform = vMtrTransform.replace('PRESTAMO', vPrestamo);
    vMtrTransform = vMtrTransform.replace('COSTO_PRESTAMO', vCosto);
    vMtrTransform = vMtrTransform.replace('COMISION', vComision);
    vMtrTransform = vMtrTransform.replace('SVC_KEY', vSvcKey);
    vMtrTransform = vMtrTransform.replace('PRECIO', vPrecio);
    return vMtrTransform;
}
//Convierte un valor texto a al formato yyyyMMdd
function parseDateToStringAS(Fecha) {
    var strDate = ' ';
    var year = Fecha.getFullYear();
    var month = Fecha.getMonth() + 1;
    var day = Fecha.getDate();
    strDate = String(year) + padStr(String(month), 2, '0', STR_PAD_LEFT) + padStr(String(day), 2, '0', STR_PAD_LEFT);
    return strDate;
}

function parseTimeToComissionDate(gTime) {
    var date = new Date();
    date.setTime(gTime);
    var strDate = parseDateToStringComission(date);
    return strDate;
}

function parseTimeToCBSDate(gTime) {
    var date = new Date();
    date.setTime(gTime);
    var strDate = parseDateToStringCBS(date);
    return strDate;
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
//Convierte un Time a un string de Date en formato yyyyMMddhhmiss
function parseTimeToDHDate(gTime) {
    var date = new Date();
    date.setTime(gTime);
    var strDate = parseDateToStringDH(date);
    return strDate;
}
//Convierte un valor texto a al formato ddMMyyyy HH:mm:ss
function parseDateToStringComission(date) {
    var day = padStr(String(date.getDate()), 2, '0', STR_PAD_LEFT);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = padStr(String(month), 2, '0', STR_PAD_LEFT);
    var hours = padStr(String(date.getHours()), 2, '0', STR_PAD_LEFT);
    var minutes = padStr(String(date.getMinutes()), 2, '0', STR_PAD_LEFT);
    var seconds = padStr(String(date.getSeconds()), 2, '0', STR_PAD_LEFT);
    var format = day + '' + month + '' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return format;
}
//Convierte un valor texto a al formato yyyyMMddhhmiss
function parseDateToStringDH(date) {
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
function parseTimeToDate(gTime, timeZone) {
    var date = new Date();
    date.setTime(gTime);
    var strDate = parseDateToString(date);
    strDate = timeZone ? strDate.replace(' ', 'T') + '.000-06:00' : strDate.replace(' ', 'T');
    return strDate;
}
//Convierte un Time a un string de Date en formato yyyy-MM-dd hh:mm:ss
function parseTimeToDateGeneric(gTime) {
    var date = new Date();
    date.setTime(gTime);
    var strDate = parseDateToString(date);
    return strDate;
}
//Convierte un Time a un string de Date en formato dd/MM/yyyy hh:mm:ss
function parseTimeToScheduleDate(gTime) {
    var date = new Date();
    date.setTime(gTime);
    var strDate = parseDateToStringSchedule(date);
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
//Convierte un valor texto a al formato dd/MM/yyyy hh:mm:ss
function parseDateToStringSchedule(date) {
    var day = padStr(String(date.getDate()), 2, '0', STR_PAD_LEFT);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = padStr(String(month), 2, '0', STR_PAD_LEFT);
    var hours = padStr(String(date.getHours()), 2, '0', STR_PAD_LEFT);
    var minutes = padStr(String(date.getMinutes()), 2, '0', STR_PAD_LEFT);
    var seconds = padStr(String(date.getSeconds()), 2, '0', STR_PAD_LEFT);
    var format = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return format;
}
TRXID = transactionId;
var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;


function getJSON(strJson) {
    var vExpr = "([b,c,s]+|[t*,n,s,(0-9)*]+|[v,(0-9)*]+):";
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