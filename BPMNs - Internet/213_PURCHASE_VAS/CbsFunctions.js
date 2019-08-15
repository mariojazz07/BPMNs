if(typeof vSkey!='undefined'){
  vCRemarkCbs=transformMtr(MTR,productId,vSkey);
}
else{
  vCRemarkCbs=transformMtr(MTR,productId,'NA');
}



//Transforma el mtr que se pasa a COMVERSE
//function transformMtr(mtr,vProducto,vCalendario,vAprovisiona,vPrestamo,vCosto,vComision) {
function transformMtr(mtr,vProducto,vSrvKey) {  
  var vMtrTransform = mtr;
  //var fechaActual = new Date();

//CPE;PRODUCT_ID;TRANSACTION_ID;SVKEY;
  //var strFecha = parseDateToStringAS(fechaActual);
  vMtrTransform = vMtrTransform.replace("PRODUCT_ID", vProducto);
  vMtrTransform = vMtrTransform.replace("TRANSACTION_ID", transactionId);
  //vMtrTransform = vMtrTransform.replace("CALENDARIO", vCalendario);
  //vMtrTransform = vMtrTransform.replace("APROVISIONA", vAprovisiona);
  //vMtrTransform = vMtrTransform.replace("FECHA", strFecha);
  //vMtrTransform = vMtrTransform.replace("PRESTAMO", vPrestamo);
  //vMtrTransform = vMtrTransform.replace("COSTO_PRESTAMO", vCosto);
  //vMtrTransform = vMtrTransform.replace("COMISION", vComision);
    vMtrTransform = vMtrTransform.replace("SVKEY", vSrvKey);


  return vMtrTransform;
}

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

function getSupplementaryOfferings(validOfferings, jsonObj) {
  var offeringObj;

  var supplementaryOfferings;

  var vItem;

  var vOfferingItem;

  var vOfferings = new Array();

  if (typeof jsonObj.QueryCustomerInfoResultMsg != "undefined") {
    supplementaryOfferings =
      jsonObj.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Subscriber.SupplementaryOffering;
  }

  if (typeof supplementaryOfferings != "undefined") {
    if (supplementaryOfferings instanceof Array) {
      for (var i = 0; i < supplementaryOfferings.length; i++) {
        vItem = supplementaryOfferings[i];

        vOfferingItem = vItem.OfferingKey;

        if (typeof vOfferingItem != "undefined") {
          if (isValidOffering(validOfferings, vOfferingItem.OfferingID) ||validOfferings == "") {
            vOfferings.push(vItem);
          }
        }
      }
    } else {
      vOfferingItem = supplementaryOfferings.OfferingKey;

      if (typeof vOfferingItem != "undefined") {
        if (
          isValidOffering(validOfferings, vOfferingItem.OfferingID) ||
          validOfferings == ""
        ) {
          vOfferings.push(supplementaryOfferings);
        }
      }
    }
  }

  return vOfferings;
}

function getWalletByType(strWalletName, walletJson) {
  var walletObj;

  var freeUnits;

  var vItem;

  if (typeof walletJson.QueryFreeUnitResultMsg != "undefined") {
    freeUnits =
      walletJson.QueryFreeUnitResultMsg.QueryFreeUnitResult.FreeUnitItem;
  }

  if (typeof freeUnits != "undefined") {
    if (freeUnits instanceof Array) {
      for (var i = 0; i < freeUnits.length; i++) {
        vItem = freeUnits[i];

        if (vItem.FreeUnitType == strWalletName) {
          walletObj = vItem;

          break;
        }
      }
    } else {
      if (freeUnits.FreeUnitType == strWalletName) {
        walletObj = freeUnits;
      }
    }
  }

  return walletObj;
}

function isValidOffering(validOfferings, offering) {
  var flag = false;

  var tmpArray = validOfferings.split(",");

  for (var i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i] == offering) {
      flag = true;

      break;
    }
  }

  return flag;
}

function trimExhaustedInstances(instances) {
  var tmpInstances = new Array();

  var flag = false;

  if (instances instanceof Array) {
    for (var i = 0; i < instances.length; i++) {
      if (typeof instances[i].CurrentAmount != "undefined") {
        flag = true;

        if (new Number(instances[i].CurrentAmount) > 0) {
          tmpInstances.push(instances[i]);
        }
      }
    }
  } else {
    if (typeof instances.CurrentAmount != "undefined") {
      flag = true;

      if (new Number(instances.CurrentAmount) > 0) {
        tmpInstances.push(instances);
      }
    }
  }

  tmpInstances = flag ? tmpInstances : instances;

  return tmpInstances;
}

function getSortedItems(itemArray) {
  var sortedInstances = new Array();

  var tmpInstances = trimExhaustedInstances(itemArray);

  if (tmpInstances instanceof Array) {
    if (tmpInstances.length > 0) {
      sortedInstances = quickSort(tmpInstances, 0, tmpInstances.length - 1);
    }
  } else {
    sortedInstances.push(tmpInstances);
  }

  return sortedInstances;
}

function swap(items, firstIdx, secondIdx) {
  var tmp = items[firstIdx];

  items[firstIdx] = items[secondIdx];

  items[secondIdx] = tmp;

  return items;
}

function partition(items, pivot, left, right) {
  var partitionIdx = left;

  var pivotValue = new Number(pivot.EffectiveTime);

  var itemI = 0;

  for (var i = left; i < right; i++) {
    itemI = new Number(items[i].EffectiveTime);

    if (itemI < pivotValue) {
      swap(items, i, partitionIdx);

      partitionIdx++;
    }
  }

  swap(items, right, partitionIdx);

  return partitionIdx;
}

function quickSort(items, left, right) {
  var len = items.length;

  var pivot;

  var partitionIdx;

  if (len > 1) {
    if (left < right) {
      pivot = items[right];

      partitionIdx = partition(items, pivot, left, right);

      //sort left and right

      quickSort(items, left, partitionIdx - 1);

      quickSort(items, partitionIdx + 1, right);
    }
  }

  return items;
}


LOGGER.info(tLinea+'Llego hasta el final de CbsFunctions'+tLinea);