var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;


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

function getJSON(strJson) {
    var vExpr = '([b,c,s]+|[t*,n,s,(0-9)*]+|[v,(0-9)*]+):';
    var vNumExpr = '("[a-z]+":)([0-9]+)(\s*,|}|$)';
    var regEx;
    var numRegExp;
    var tmpJson = '';
    if (typeof REG_EXP != 'undefined') {
        vExpr = REG_EXP;
    }
    regEx = new RegExp(vExpr, 'gi');
    numRegExp = new RegExp(vNumExpr, 'gmi');
    tmpJson = strJson.replace(regEx, '');
    tmpJson = tmpJson.replace(numRegExp, '$1"$2"$3');
    return JSON.parse(tmpJson);
}


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


  function validateInputDate(vInputDate, vBillDay) {
    var date = getFinancialDate(vInputDate);
    date.setDate(vBillDay);
    var day = padStr(String(date.getDate()), 2, "0", STR_PAD_LEFT);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = padStr(String(month), 2, "0", STR_PAD_LEFT);
    var hours = padStr(String(date.getHours()), 2, "0", STR_PAD_LEFT);
    var minutes = padStr(String(date.getMinutes()), 2, "0", STR_PAD_LEFT);
    var seconds = padStr(String(date.getSeconds()), 2, "0", STR_PAD_LEFT);
    var format =
        //year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
        year + "" + month + "" + day;
    return format;
}

var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;