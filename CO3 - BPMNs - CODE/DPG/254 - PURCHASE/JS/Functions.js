var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

function getJSON(strJson) {
    var vExpr = "([a,r,s]+|[t*,n,s,(0-9)*]+|[v,(0-9)*]+|[a,r,c]+|[c,b,s]+):";
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


function getActiveDPG(strJson) {
    var vActives = new Array();
    for (var i = 0; i <= strJson.length; i++) {
        if (strJson[i].DEPOSIT_TYPE == 'DPG') {
            if (strJson[i].STATUS == 'DISPONIBLE' || strJson[i].STATUS == 'AFECTADO') {
                vActives.push(strJson[i]);
            }
        }
    }
    return vActives;
}

function getActiveDPA(strJson) {
    var vActives = new Array();
    for (var i = 0; i <= strJson.length; i++) {
        if (strJson[i].DEPOSIT_TYPE == 'DPA') {
            if (strJson[i].STATUS == 'DISPONIBLE' || strJson[i].STATUS == 'AFECTADO') {
                vActives.push(strJson[i]);
            }
        }
    }
    return vActives;
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
  ///

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
var tSaltoL = '\n';
var tLinea = tSaltoL + '************************************************************************' + tSaltoL;