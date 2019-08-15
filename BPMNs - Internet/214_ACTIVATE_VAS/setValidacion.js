var navInfo = new Object();
var vPlanEntitlement = "";
var vDefaultEntitlement = "Default_Service_Local";
var vUnsub = false;
var vUnSubDef = false;
var vUnSubCbs = false;
var vPlanVasPurchaseSeq = '';
var vUnsubOffering = '';
var vUnSubDef = false;
var vScheduleProv = false;
var vScheduleProvCBS = false;
var actualEndDate = new Date();
var vScheduleDateWarning = "";
var vRecurrent = "FALSE";
var setExpireDate = vUpdateService;
var vCounter3 = 0;
var vUnsubPCCApp = new Array();
var vPCCAppDel = '';
var vTmpEndDate = new Date();
var vPrimaryPlanInstance = '';


if (typeof vPaqInfo != "undefined") {
  navInfo = processJson(vPaqInfo);

  if (typeof navInfo.Plans != "undefined") {

    for (var i = 0; i < navInfo.Plans.length; i++) {

      vUnsubPCCApp.push(navInfo.Plans[i].ServiceName);

      //vPlanEntitlement = navInfo.Plans.ServiceName;
      //vSrvPcc=vPlanEntitlement;
      if (typeof navInfo.Plans[i].ServiceEndDate != "undefined" && vUpdateService) {
        if (navInfo.Plans[i].ServiceEndDate != "-1") {
          actualEndDate = getCbsDate(String(navInfo.Plans[i].ServiceEndDate));
          if (SysDate >= actualEndDate) {
            vUnsub = true;
            vUpdateService = false;
          } else {
            vScheduleProv = true; //CO2 el AS400 deberia de controlar las fechas de envio del trigger programado
            vScheduleDateWarning = parseTimeToScheduleDate(actualEndDate.getTime());
          }
        } else {
          vUnsub = true;
        }
      } else {
        vUnsub = true;
      }

    }


    vPCCAppDel = vUnsubPCCApp[vCounter3];

  } else {
    vUpdateService = false;
  }


  if (typeof navInfo.DefaultService != "undefined") {
    vDefaultEntitlement = navInfo.DefaultService.ServiceName;
    vUnSubDef = true;
  }
}


/****************************** Validacion CBS***********************/
// if (typeof supplementaryOffers != 'undefined') {
//   vUnSubCbs = true;
//   vUnsubOffering = supplementaryOffers.OfferingID;
//   vPlanVasPurchaseSeq = supplementaryOffers.PurchaseSeq;
//   vOffCbs = vUnsubOffering;
// }

if (typeof supplementaryOffers != 'undefined') {
  if (supplementaryOffers instanceof Array) {
    for (var j = 0; j < supplementaryOffers.length; j++) {
      if (vOfferingPlanVAS == supplementaryOffers[j].OfferingKey.OfferingID) {
        vUnSubCbs = true;
        vUnsubOffering = supplementaryOffers[j].OfferingKey.OfferingID;
        //vOffCbs = 'NA';
        vPlanVasPurchaseSeq = supplementaryOffers[j].OfferingKey.PurchaseSeq;
        //Validando Expiration Time para SRVENDATE
        if (vUpdateService) {

          vTmpEndDate = getCbsDate(String(supplementaryOffers[j].ExpirationTime));

          if (SysDate >= vTmpEndDate) {
            vUpdateService = false;
          } else {
            vScheduleProvCBS = true;
            vScheduleDateWarning = parseTimeToScheduleDate(vTmpEndDate.getTime());
          }
        }
        break;
      }
    }

  } else {
    if (vOfferingPlanVAS == supplementaryOffers.OfferingKey.OfferingID) {
      vUnSubCbs = true;
      vUnsubOffering = supplementaryOffers.OfferingKey.OfferingID;
      //vOffCbs = 'NA';
      vPlanVasPurchaseSeq = supplementaryOffers.OfferingKey.PurchaseSeq;
      //Validando Expiration Time para SRVENDATE
      if (vUpdateService) {
        vTmpEndDate = getCbsDate(String(supplementaryOffers.ExpirationTime));
        if (SysDate >= vTmpEndDate) {
          vUpdateService = false;
        } else {
          vScheduleProvCBS = true;
          vScheduleDateWarning = parseTimeToScheduleDate(vTmpEndDate.getTime());
        }
      }
    }



    //
  }
}

if (typeof primaryOffers != 'undefined') {
  if (primaryOffers instanceof Array) {
    for (var l = 0; l < primaryOffers.length; l++) {
      if (vCBSOfferingPrimary == primaryOffers[l].OfferingKey.OfferingID) {
        //vUnSubCbs = true;
        //vUnsubOffering = primaryOffers[j].OfferingKey.OfferingID;
        //vOffCbs = 'NA';
        //vPlanVasPurchaseSeq = primaryOffers[j].OfferingKey.PurchaseSeq;

        vPrimaryPlanInstance = primaryOffers[l];
        if (vUpdateService) {

          vTmpEndDate = getCbsDate(String(vPrimaryPlanInstance.ExpirationTime));

          if (SysDate >= vTmpEndDate) {
            vUpdateService = false;
          } else {
            vScheduleProvCBS = true;
            vScheduleDateWarning = parseTimeToScheduleDate(vTmpEndDate.getTime());
          }
        }
        break;
      }
    }


  } else {
    if (vCBSOfferingPrimary == primaryOffers.OfferingKey.OfferingID) {
      //vUnSubCbs = true;
      //vUnsubOffering = supplementaryOffers.OfferingKey.OfferingID;
      //vOffCbs = 'NA';
      //vPlanVasPurchaseSeq = supplementaryOffers.OfferingKey.PurchaseSeq;
      vPrimaryPlanInstance = primaryOffers;
      if (vUpdateService) {
        vTmpEndDate = getCbsDate(String(vPrimaryPlanInstance.ExpirationTime));
        if (SysDate >= vTmpEndDate) {
          vUpdateService = false;
        } else {
          vScheduleProvCBS = true;
          vScheduleDateWarning = parseTimeToScheduleDate(vTmpEndDate.getTime());
        }
      }
    }


  }
}