var vUnlimited = false;
var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;
var BPMN_RESPONSE_CODE = '100';
var BPMN_RESPONSE_MESSAGE = 'Error durante el proceso.';
var BPMN_RESPONSE_NOTIFY_ADAPTER = '-1';
var vSysDate = new Date();
var vMissingParam = false;
var strMissingParam = 'Faltan los siguientes parametros: ';
var vParams = '';
var vConcat = '';
var vServiceName = '';
var vQuotaInitVal = '';
var vQuotaConsumption = '';
var vQuotaBalance = '';
var vQuotaLevel = '';
var vNextResetTime = '00:00:00';
var vQuotaName = '';
var vServiceStrtTime = '';
var vServiceEndTime = '';
var vSrvEndDate;
var vNotifyFlow = false;
var vSendNotify = false;
var vSendTrigger = false;
var badInfo = false;
var vSecondsDelay = 30;
var vNotifySMS = '';
var vQuotaLevelEighty = '1';
var vQuotaLevelHundred = '5';
//PCC 2.0
var vSubscription = false;
var vOfferingId = '0';
var vNotificationType = 'Low balance 0';
var vSubscriberPrimaryId = subscriberId;
var vSmartSubscription = false;
var vPurchaseSeq = '';
var vValidateSmartSubs = false;
var vPaqInternet = false;
var vServiceEndTimeMS = '';
var vServiceStrtTimeMS = '';
//CO2
var vPlanInternet=false;
var vAddonInternet=false;
var vFreeUnitPlanInternet='C_Data_Include';
var vFreeUnitAddInternet='C_Data_Add';


if(typeof NOTIFY_FLOW != 'undefined'){
    vNotifyFlow = NOTIFY_FLOW.toUpperCase() == 'TRUE';
}

if(typeof SEND_NOTIFY_PCC != 'undefined'){
    vSendNotify = SEND_NOTIFY_PCC.toUpperCase() == 'TRUE';
}

if(typeof SMART_SUBSCRIPTION != 'undefined'){
    vValidateSmartSubs = SMART_SUBSCRIPTION.toUpperCase() == 'TRUE';
}

if(typeof MENSAJE_EXITO != 'undefined'){
    vNotifySMS = MENSAJE_EXITO;
}

if(typeof QUOTA_LEVEL_EIGHTY != 'undefined'){
    vQuotaLevelEighty = QUOTA_LEVEL_EIGHTY;
}

if(typeof QUOTA_LEVEL_HUNDRED != 'undefined'){
    vQuotaLevelHundred = QUOTA_LEVEL_HUNDRED;
}

if(typeof SERVICE_NAME != 'undefined'){
    vServiceName = SERVICE_NAME;
    if(typeof UNLIMITED_SERVICES != 'undefined'){
        var tIlimitados = UNLIMITED_SERVICES.split(',');
        vUnlimited = tIlimitados.indexOf(SERVICE_NAME) >= 0;
    }
} else {
    vMissingParam = true;
    vParams += 'SERVICE_NAME';
}

if(typeof QUOTA_INITIAL_VALUE != 'undefined'){
    vQuotaInitVal = QUOTA_INITIAL_VALUE;
} else {
    vMissingParam = true;
    vConcat = vParams == '' ? '' : ',';
    vParams += vConcat + 'QUOTA_INITIAL_VALUE';
}

if(typeof QUOTA_CONSUMPTION != 'undefined'){
    vQuotaConsumption = QUOTA_CONSUMPTION;
} else {
    vMissingParam = true;
    vConcat = vParams == '' ? '' : ',';
    vParams += vConcat + 'QUOTA_CONSUMPTION';
}

if(typeof QUOTA_BALANCE != 'undefined'){
    vQuotaBalance = QUOTA_BALANCE;
} else {
    vMissingParam = true;
    vConcat = vParams == '' ? '' : ',';
    vParams += vConcat + 'QUOTA_BALANCE';
}

if(typeof QUOTA_LEVEL != 'undefined'){
    vQuotaLevel = QUOTA_LEVEL;
} else {
    vMissingParam = true;
    vConcat = vParams == '' ? '' : ',';
    vParams += vConcat + 'QUOTA_LEVEL';
}

if(typeof QUOTA_NAME != 'undefined'){
    vQuotaName = QUOTA_NAME;
} else {
    vMissingParam = true;
    vConcat = vParams == '' ? '' : ',';
    vParams += vConcat + 'QUOTA_NAME';
}

if(typeof SERVICE_START_TIME != 'undefined'){
    vServiceStrtTime = SERVICE_START_TIME;
    vServiceStrtTimeMS = vServiceStrtTime;
} else {
    vMissingParam = true;
    vConcat = vParams == '' ? '' : ',';
    vParams += vConcat + 'SERVICE_START_TIME';
}

if(typeof SERVICE_END_TIME != 'undefined'){
    vServiceEndTime = SERVICE_END_TIME;
    vSrvEndDate = vServiceEndTime.indexOf("-") >= 0 ? parseStringToDatePCC(vServiceEndTime): getCbsDateStr(vServiceEndTime);
    vSrvEndDate.setSeconds(vSrvEndDate.getSeconds() - vSecondsDelay);
    vServiceEndTimeMS = vServiceEndTime;
} else {
    vMissingParam = true;
    vConcat = vParams == '' ? '' : ',';
    vParams += vConcat + 'SERVICE_END_TIME';
}

if(typeof NEXT_RESET_TIME != 'undefined'){
    vNextResetTime = NEXT_RESET_TIME;
}

//Validar parámetros de Trigger de LowBalance de FreeUnit PCC 2.0
if(typeof FREERESOURCE_CODE != 'undefined'){
    var vFreeResourceCode = FREERESOURCE_CODE;
    vQuotaName = 'N/A';
    vQuotaBalance = '0';
    vQuotaLevel  = '5';
    vParams = '';
    vMissingParam = false;

    if (vFreeResourceCode == FREEUNITTYPE_SUSCRIPCION) {
        vSubscription = true;
        vSendNotify = false;
    } else if (vFreeResourceCode == FREEUNITTYPE_PAQ_INTERNET) {
        vPaqInternet = true;
    }else if(vFreeResourceCode==vFreeUnitPlanInternet){
		vPlanInternet=true;
	}else if (vFreeResourceCode==vFreeUnitAddInternet){
		vAddonInternet=true;
	}

    if(typeof FREERESOURCE_INITIALVALUE != 'undefined'){
        vQuotaInitVal = FREERESOURCE_INITIALVALUE;
        vQuotaConsumption = FREERESOURCE_INITIALVALUE;
    } else {
        vMissingParam = true;
        vParams += 'FREERESOURCE_INITIALVALUE';
    }

    if(typeof EFFECTIVETIME != 'undefined'){
        vServiceStrtTime = EFFECTIVETIME;
        vServiceStrtTimeMS = getCbsDateStrFormat(vServiceStrtTime);
    } else {
        vMissingParam = true;
        vConcat = vParams == '' ? '' : ',';
        vParams += vConcat + 'EFFECTIVETIME';
    }

    if(typeof EXPIRATIONTIME != 'undefined'){
        vServiceEndTime = EXPIRATIONTIME;
        vSrvEndDate = vServiceEndTime.indexOf("-") >= 0 ? parseStringToDatePCC(vServiceEndTime): getCbsDateStr(vServiceEndTime);
        vSrvEndDate.setSeconds(vSrvEndDate.getSeconds() - vSecondsDelay);
        vServiceEndTimeMS = getCbsDateStrFormat(vServiceEndTime);
    } else {
        vMissingParam = true;
        vConcat = vParams == '' ? '' : ',';
        vParams += vConcat + 'EXPIRATIONTIME';
    }

    if(typeof OFFERINGID != 'undefined'){
        vServiceName = OFFERINGID;
        vOfferingId = OFFERINGID;
    }

    if(typeof NOTIFICATION_TYPE != 'undefined'){
        vNotificationType = NOTIFICATION_TYPE;
        if (vNotificationType.toUpperCase() == ('Low balance 0').toUpperCase()) {
            vQuotaLevel  = '5';
        }
        else {
            vQuotaLevel  = '1';
        }
    } else {
        vMissingParam = true;
        vParams += 'NOTIFICATION_TYPE';
    }

    if(typeof SUBSCRIBERPRIMARYID != 'undefined'){
        vSubscriberPrimaryId = SUBSCRIBERPRIMARYID;
    } else {
        vMissingParam = true;
        vParams += 'SUBSCRIBERPRIMARYID';
    }
    
    if(typeof PURCHASESEQ != 'undefined'){
        vPurchaseSeq = PURCHASESEQ;
    } else {
        if (vPaqInternet) {
            vMissingParam = true;
            vParams += 'PURCHASESEQ';
        }
    }
}
//Fin Validar parámetros de Trigger de LowBalance de FreeUnit PCC 2.0

if(!vMissingParam){
    if(vNotifyFlow){
        if((vSysDate < vSrvEndDate) && (vQuotaLevel == vQuotaLevelEighty)){
            vSendTrigger = true;
            badInfo = true;
            vQuotaConsumption = vQuotaInitVal;
            vQuotaBalance = '0';  
        } else if(((vSysDate < vSrvEndDate) && (vQuotaLevel == vQuotaLevelHundred))){
            vSendTrigger = true;
        }
    }
}

//Transforma un string con formato de fecha a un objeto Date
function parseStringToDatePCC(strDate) {
//05-13-2017 10:13:05
    strDate = strDate.replace(/\D/g,' ');
    var dateArray = strDate.split(' ');
    var year = dateArray[2];
    var month = new Number(dateArray[0]) - 1;
    var day = dateArray[1];
    var hours = dateArray[3];
    var minutes = dateArray[4];
    var seconds = dateArray[5];
    return new Date(year,month,day,hours,minutes,seconds);
}

function getCbsDateStr(cbsDate){
//20161012000000
    var vYear = cbsDate.substring(0, 4);
    var vMonth = cbsDate.substring(4, 6);
    var vDay = cbsDate.substring(6, 8);
    var vHours = cbsDate.substring(8, 10);
    var vMinutes = cbsDate.substring(10, 12);
    var vSeconds = cbsDate.substring(12, 14);
    return new Date(vYear,vMonth,vDay,vHours,vMinutes,vSeconds);
}

//Funcion a la cual se le manda un valor y le hace lpad o rpad con el caracter indicado y la longitud indicada
function padStr(str, len, pad, dir) {
    if (typeof(len) == 'undefined') { var len = 0; };
    if (typeof(pad) == 'undefined') { var pad = ' '; };
    if (typeof(dir) == 'undefined') { var dir = STR_PAD_RIGHT; };
    if (len + 1 >= str.length) {
        switch (dir){
            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
            break;
            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
            break;
            default:
                str = str + Array(len + 1 - str.length).join(pad);
            break;
        } // switch
    }
    return str;
}

//Transforma el mtr que se pasa a COMVERSE
function transformMtr(mtr, vProducto, vCalendario, vAprovisiona, vPrestamo, vCosto, vComision, vSvcKey){
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
    return vMtrTransform;
}

//Convierte un valor texto a al formato yyyyMMdd
function parseDateToStringAS (Fecha) {
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
function parseDateToStringCBS(date){
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
function parseDateToStringComission(date){
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
function parseDateToStringDH(date){
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
    strDate = timeZone ? strDate.replace(' ','T') + '.000-06:00' : strDate.replace(' ','T');    
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
function parseStringToDate (strDate) {
    strDate = strDate.replace(/\D/g,' ');
    var dateArray = strDate.split(' ');
    var year = dateArray[0];
    var month = dateArray[1] - 1;
    var day = dateArray[2];
    var hours = dateArray[3];
    var minutes = dateArray[4];
    var seconds = dateArray[5];
    return new Date(year,month,day,hours,minutes,seconds);
}

//Convierte un valor texto a al formato yyyy-MM-dd hh:mm:ss
function parseDateToString(date){
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

//Convierte un valor texto a al formato yyyy-MM-dd hh:mm:ss
function parseDateToStringMS(date){
    var day = padStr(String(date.getDate()), 2, '0', STR_PAD_LEFT);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = padStr(String(month), 2, '0', STR_PAD_LEFT);
    var hours = padStr(String(date.getHours()), 2, '0', STR_PAD_LEFT);
    var minutes = padStr(String(date.getMinutes()), 2, '0', STR_PAD_LEFT);
    var seconds = padStr(String(date.getSeconds()), 2, '0', STR_PAD_LEFT);
    var format = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return format;
}

//Convierte un valor texto a al formato dd/MM/yyyy hh:mm:ss
function parseDateToStringSchedule(date){
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

//Función que permite convertir un string a JSON sin namespace
function getWalletJSON(strJson){
    var vExpr = '([b,c,s]+|[t*,n,s,(0-9)*]+|[v,(0-9)*]+):';
    var vNumExpr = '("[a-z]+":)([0-9]+)(\s*,|}|$)';
    var regEx;
    var numRegExp;
    var tmpJson = '';

    if(typeof REG_EXP != 'undefined'){
        vExpr = REG_EXP;
    }
    
    regEx = new RegExp(vExpr, 'gi');
    numRegExp = new RegExp(vNumExpr, 'gmi');
    tmpJson = strJson.replace(regEx, '');
    tmpJson = tmpJson.replace(numRegExp, '$1"$2"$3');
    
    return JSON.parse(tmpJson);
}

//Función que obtener un objeto de FreeUnit
function getWalletByType(strWalletName, walletJson){
    var walletObj;
    var freeUnits = walletJson.QueryFreeUnitResultMsg.QueryFreeUnitResult.FreeUnitItem;
    var vItem;
    
    if(typeof(freeUnits) != 'undefined'){
        if(freeUnits instanceof Array){
            for(var i = 0; i < freeUnits.length; i++){
                vItem = freeUnits[i];
                if(vItem.FreeUnitType == strWalletName){
                    walletObj = vItem;
                    
                    break;
                }
            }
        } else {
            if(freeUnits.FreeUnitType == strWalletName){
                walletObj = freeUnits;
            }
        }
    }
    
    return walletObj;
}

function getCbsDateStrFormat(cbsDate){
        //20161012000000
        var vYear = cbsDate.substring(0, 4);
        var vMonth = cbsDate.substring(4, 6);
        var vDay = cbsDate.substring(6, 8);
        var vHours = cbsDate.substring(8, 10);
        var vMinutes = cbsDate.substring(10, 12);
        var vSeconds = cbsDate.substring(12, 14);

        return  padStr(vMonth, 2, '0', STR_PAD_LEFT) + '-' + padStr(vDay, 2, '0', STR_PAD_LEFT) + '-' + padStr(vYear, 2, '0', STR_PAD_LEFT) + ' ' + padStr(vHours, 2, '0', STR_PAD_LEFT) + ':' + padStr(vMinutes, 2, '0', STR_PAD_LEFT) + ':' + padStr(vSeconds, 2, '0', STR_PAD_LEFT);
}