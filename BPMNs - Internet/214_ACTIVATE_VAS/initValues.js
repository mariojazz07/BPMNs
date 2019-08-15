var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;
var BPMN_RESPONSE_CODE = "100";
var BPMN_RESPONSE_MESSAGE = "Error de procesamiento";
var vAllowedTypes="POS,HIB,HIC,HIB20,CIN";
var SysDate = new Date();
var vGnricType = false;
var vEntitlement = "";
var vBillingDay = "";
var vTier = "1";
var vMissingParam = false;
var strMissingParam = "Faltan los siguientes parametros: {0}";
var vParams = "";
var vConcat = "";
var resetSubs = false;
var vSubType = "";
var typeSubscriber = "PRE,HIC,CIN,HIB,HIB20,POS";
var vServiceEndDate = "";
var vServiceStartDate = "";
var vEndDateAs400 = "";
var vUpdateService = false;
var vUnsubReq = false;
var vEffectiveTime="";
var vCRemarkCbs="";
//var vSkey=SVKEY;
var vOldPlan='';
var vNewPlan='';
var vSrvPcc='NA';
var vOffCbs='NA';
var pipe='|';

/* if (typeof TYPE != "undefined") {
  vGnricType = TYPE.toUpperCase() == "GNR";
} */

vGnricType=true;

if (vGnricType) {
  if (typeof ENTITLEMENT != "undefined") {
    vEntitlement = ENTITLEMENT.replace('"', "").split(/[",",";"]/)[0];
    
    resetSubs = vEntitlement.toLowerCase() == "prepaid" || vEntitlement.toLowerCase() == "postpaid";
  } else {
    vMissingParam = true;
    vParams += "ENTITLEMENT";
  }
  if (typeof BILLDAY != "undefined") {
    vBillingDay = BILLDAY == "0" || BILLDAY == "00" ? "1" : BILLDAY;
    vBillingDay = new Number(String(vBillingDay));
  } else {
    vMissingParam = true;
    vConcat = vParams == "" ? "" : ",";
    vParams += vConcat + "BILLINGDAY";
  }
  if (typeof subscriberType != "undefined") {
    vTier = subscriberType.toUpperCase() == "PRE" ? "0" : "1";
    vSubType = typeSubscriber.indexOf(subscriberType.toUpperCase()) >= 0 ? subscriberType : "POS";
  } else {
    vMissingParam = true;
    vConcat = vParams == "" ? "" : ",";
    vParams += vConcat + "TIER";
  }
  //if (typeof TYPE1 != "undefined") {
  if (typeof TYPE != "undefined" && TYPE=='B') {
    vUnsubReq = true;
  } 
  // else if (typeof SERVICE_END_DATE != "undefined") {
  //   vEndDateAs400 = SERVICE_END_DATE;
    else if (typeof SRVENDDATE != "undefined" && SRVENDDATE != '0') {
    vEndDateAs400 = SRVENDDATE;
    vUpdateService = true;
    vServiceEndDate = parseDateToStringCBS(parseStringToDate(vEndDateAs400));
    vServiceStartDate = parseDateToStringCBS(SysDate);
  	vEffectiveTime=parseDateToStringCBS(SysDate);
  }else{
    vServiceStartDate = parseDateToStringCBS(SysDate);
	  vEffectiveTime=parseDateToStringCBS(SysDate);
    vServiceEndDate=parseDateToStringCBS2(SysDate,vBillingDay);
  }

  //vCRemarkCbs=transformMtr(C_REMARKS,productId,vSkey);
}
//Funcion a la cual se le manda un valor y le hace lpad o rpad con el caracter indicado y la longitud indicada
function padStr(str, len, pad, dir) {
  if (typeof len == "undefined") {
    var len = 0;
  }
  if (typeof pad == "undefined") {
    var pad = " ";
  }
  if (typeof dir == "undefined") {
    var dir = STR_PAD_RIGHT;
  }
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
function transformMtr(
  mtr,
  vProducto,
  vCalendario,
  vAprovisiona,
  vPrestamo,
  vCosto,
  vComision
) {
  var vMtrTransform = mtr;
  var fechaActual = new Date();
  var strFecha = parseDateToStringAS(fechaActual);
  vMtrTransform = vMtrTransform.replace("PRODUCT_ID", vProducto);
  vMtrTransform = vMtrTransform.replace("TRANSACTION_ID", vTransactionId);
  vMtrTransform = vMtrTransform.replace("CALENDARIO", vCalendario);
  vMtrTransform = vMtrTransform.replace("APROVISIONA", vAprovisiona);
  vMtrTransform = vMtrTransform.replace("FECHA", strFecha);
  vMtrTransform = vMtrTransform.replace("PRESTAMO", vPrestamo);
  vMtrTransform = vMtrTransform.replace("COSTO_PRESTAMO", vCosto);
  vMtrTransform = vMtrTransform.replace("COMISION", vComision);
  return vMtrTransform;
}
function parseTimeToCBSDate(gTime) {
  var date = new Date();
  date.setTime(gTime);
  var strDate = parseDateToStringCBS(date);
  return strDate;
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
//Convierte un valor texto a al formato yyyyMMddhhmiss
function parseDateToStringCBS(date) {
  var day = padStr(String(date.getDate()), 2, "0", STR_PAD_LEFT);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = padStr(String(month), 2, "0", STR_PAD_LEFT);
  var hours = padStr(String(date.getHours()), 2, "0", STR_PAD_LEFT);
  var minutes = padStr(String(date.getMinutes()), 2, "0", STR_PAD_LEFT);
  var seconds = padStr(String(date.getSeconds()), 2, "0", STR_PAD_LEFT);
  var format =
    year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
  return format;
}

////Convierte un valor texto a al formato yyyyMMddhhmiss anio 2036
function parseDateToStringCBS2(date,billday) {
  //var day = padStr(String(date.getDate()), 2, "0", STR_PAD_LEFT);
  date.setDate(billday);
  var day = padStr(String(date.getDate()), 2, "0", STR_PAD_LEFT);
  var year = date.getFullYear()+18;
  var month = date.getMonth() + 1;
  month = padStr(String(month), 2, "0", STR_PAD_LEFT);
  var hours = padStr(String(date.getHours()), 2, "0", STR_PAD_LEFT);
  var minutes = padStr(String(date.getMinutes()), 2, "0", STR_PAD_LEFT);
  var seconds = padStr(String(date.getSeconds()), 2, "0", STR_PAD_LEFT);
  var format =
    year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
  return format;
}


//Convierte un valor texto a al formato yyyyMMdd
function parseDateToStringAS(Fecha) {
  var strDate = " ";
  var year = Fecha.getFullYear();
  var month = Fecha.getMonth() + 1;
  var day = Fecha.getDate();
  strDate =
    String(year) +
    padStr(String(month), 2, "0", STR_PAD_LEFT) +
    padStr(String(day), 2, "0", STR_PAD_LEFT);
  return strDate;
}

//Fecha con anio 2036
function parseDateToStringAS2(Fecha) {
  var strDate = " ";
  var year = Fecha.getFullYear()+18;
  var month = Fecha.getMonth() + 1;
  var day = Fecha.getDate();
  strDate =
    String(year) +
    padStr(String(month), 2, "0", STR_PAD_LEFT) +
    padStr(String(day), 2, "0", STR_PAD_LEFT);
  return strDate;
}
//Convierte un Time a un string de Date en formato yyyyMMddhhmiss
function parseTimeToDHDate(gTime) {
  var date = new Date();
  date.setTime(gTime);
  var strDate = parseDateToStringDH(date);
  return strDate;
}
//Convierte un valor texto a al formato yyyyMMddhhmiss
function parseDateToStringDH(date) {
  var day = padStr(String(date.getDate()), 2, "0", STR_PAD_LEFT);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = padStr(String(month), 2, "0", STR_PAD_LEFT);
  var hours = padStr(String(date.getHours()), 2, "0", STR_PAD_LEFT);
  var minutes = padStr(String(date.getMinutes()), 2, "0", STR_PAD_LEFT);
  var seconds = padStr(String(date.getSeconds()), 2, "0", STR_PAD_LEFT);
  var format =
    year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
  return format;
}
//Convierte un Time a un string de Date en formato yyyy-MM-ddThh:mm:ss.000-06:00
function parseTimeToDate(gTime, timeZone) {
  var date = new Date();
  date.setTime(gTime);
  var strDate = parseDateToString(date);
  strDate = timeZone
    ? strDate.replace(" ", "T") + ".000-06:00"
    : strDate.replace(" ", "T");
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
  strDate = strDate.replace(/\D/g, " ");
  var dateArray = strDate.split(" ");
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
  var day = padStr(String(date.getDate()), 2, "0", STR_PAD_LEFT);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = padStr(String(month), 2, "0", STR_PAD_LEFT);
  var hours = padStr(String(date.getHours()), 2, "0", STR_PAD_LEFT);
  var minutes = padStr(String(date.getMinutes()), 2, "0", STR_PAD_LEFT);
  var seconds = padStr(String(date.getSeconds()), 2, "0", STR_PAD_LEFT);
  var format =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return format;
}
//Convierte un valor texto a al formato dd/MM/yyyy hh:mm:ss
function parseDateToStringSchedule(date) {
  var day = padStr(String(date.getDate()), 2, "0", STR_PAD_LEFT);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = padStr(String(month), 2, "0", STR_PAD_LEFT);
  var hours = padStr(String(date.getHours()), 2, "0", STR_PAD_LEFT);
  var minutes = padStr(String(date.getMinutes()), 2, "0", STR_PAD_LEFT);
  var seconds = padStr(String(date.getSeconds()), 2, "0", STR_PAD_LEFT);
  var format =
    day +
    "/" +
    month +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return format;
}
var tSaltoL = "\n";
var tLinea =tSaltoL + "************************************************************************" + tSaltoL;