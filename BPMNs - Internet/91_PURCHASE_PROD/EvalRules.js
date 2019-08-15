var consumedPlanQuota = true;
var expiredPlanQuota = true;
var vPromo = false;
var vSKey = 'NA';
var vMtrProduct = MTR;
var walletJson = new Object();
var packageWallet = new Object();
var packageInstances = new Object();
var planInstances= new Object();
var vPaqEntitlement = '';
var planWallet = new Object();
var navInfo = new Object();
var vUnsub = false;
var vPackageBalance = 'C_Internet_Pack';
var vPlanBalance = 'C_Data_Include';
var vQueueDate;
var vWarningMinutes = parseInt(vWarning) * -1;
var vExpireDate = new Date(vSysDate.getTime());
vExpireDate.setMinutes(vSysDate.getMinutes() + vProductDuration);
var strInitialDate = parseTimeToDateGeneric(vSysDate.getTime());
var strExpireDate = parseTimeToDateGeneric(vExpireDate.getTime());
var vEffectiveTime = parseTimeToCBSDate(vSysDate.getTime());
var vExpireTime = parseTimeToCBSDate(vExpireDate.getTime());
var vComissionDate = parseTimeToComissionDate(vSysDate.getTime());
var vStartDhDate = parseTimeToDHDate(vSysDate.getTime());
var vEndDhDate = parseTimeToDHDate(vExpireDate.getTime());
var vInitialDeezerDate = parseTimeToDate(vSysDate.getTime(), false);
var vFinalDeezerDate = parseTimeToDate(vExpireDate.getTime(), false);
var vBBEndDate = parseTimeToScheduleDate(vExpireDate.getTime());
vExpireDate.setMinutes(vExpireDate.getMinutes() + vWarningMinutes);
var vScheduleDateWarning = parseTimeToScheduleDate(vExpireDate.getTime());
var vScheduleDate = parseTimeToScheduleDate(vExpireDate.getTime());
var vProcess = 'A';
var vQueued = false;
var vExpireProduct = '483';
var cmbRemark = 'cmb;trx;';
var vPrecioPromo = '';

if (typeof PROD_HIST != 'undefined') {
    vExpireProduct = PROD_HIST;
}
if (typeof vPromoPaq != 'undefined') {
    vPromo = vPromoPaq == 'TRUE';
}
if (typeof SVC_KEY != 'undefined') {
    vSKey = SVC_KEY;
}
if (typeof PRECIO_PAQUETE != 'undefined') {
    vPrecioPromo = PRECIO_PAQUETE;
}
if (typeof REMARK_ZEROBALANCE != 'undefined') {
    vMtr = transformMtr(REMARK_ZEROBALANCE, vProductId, vCalendariza, vAprovisiona, '', '', '', vSKey, vPrecioPromo);
} else {
    vMtr = transformMtr(vMtrProduct, vProductId, vCalendariza, vAprovisiona, '', '', '', vSKey, vPrecioPromo);
}

vMtrPcc = vMtr.replace(/;/gi, '|');

if (typeof vMappedProduct != 'undefined') {
    if (vMappedProduct != '0') {
        vProductId = vMappedProduct;
    }
}

if (typeof REMARK_ZEROBALANCE2 != 'undefined') {
    vRemark2 = REMARK_ZEROBALANCE2;
} else if (typeof vMappedProduct != 'undefined') {
    if (vMappedProduct != '0') {
        vRemark2 = cmbRemark.replace('trx', vExternalTransacionId);
    }
}

if (isBlackberry) {
    if (typeof vBBOffering == 'undefined') {
        if (typeof OFFERING_BB != 'undefined') {
            var vBBOffering = OFFERING_BB;
        }
    }
    vOfferingId = vBBOffering;
    vMsjExito = vMsjExitoBB;
    if (typeof vMsjExitoQueue != 'undefined') {
        vMsjExitoQueue = vMsjExitoQueueBB;
    }
}

if (typeof vPaqInfo != 'undefined') {
    navInfo = processJson(vPaqInfo);
    if (validatePlan && typeof navInfo.Plans != 'undefined') {
        //LOGGER.info(tLinea + 'navInfoQuota ' + navInfo.Plans.QuotaBalance);
        //LOGGER.info(tLinea + 'JSON ' + JSON.stringify(navInfo));
        consumedPlanQuota = navInfo.Plans.QuotaBalance <= 0;
        expiredPlanQuota = navInfo.Plans.ServiceExpired.toUpperCase() == 'TRUE';
        //LOGGER.info(tLinea + 'consumedPlanQuota  ' + consumedPlanQuota + '  expiredPlanQuota ' + expiredPlanQuota);
    }

    if (expiredPlanQuota || consumedPlanQuota) {
        //LOGGER.info(tLinea + 'ingresa  ');
        validPlan = true;
    }
}

//Valida Quota pospago CBS
if(typeof vFreeUnitWallets !='undefined'){
    walletJson = getWalletJSON(vFreeUnitWallets);
    if(validatePlan && typeof(walletJson)!= 'undefined'){
        planWallet=getWalletByType(vPlanBalance,walletJson);
        if(typeof planWallet != 'undefined'){
            planInstances=getSortedInstancesPospaid(planWallet);
            if(planInstances.length<=0){
                validPlan=true;
            }
        }
    }
}
//

//LOGGER.info(tLinea + 'validPlan  ' + validPlan + '  validatePlan ' + validatePlan);
if (typeof vFreeUnitWallets != 'undefined') {
    //walletJson = getWalletJSON(vFreeUnitWallets);
    if (typeof (walletJson) != 'undefined') {

        packageWallet = getWalletByType(vPackageBalance, walletJson);
       
        if (validPlan) {
            if (typeof (packageWallet) != 'undefined') {
                packageInstances = getSortedInstances(packageWallet);
                 //
        //vInstanciasTotal = packageInstances.length;
		//LOGGER.info('[TOTAL INSTANCIAS] TOTAL PAQUETES ENCOLADOS Mario 6: '+vInstanciasTotal);
        //
                if (packageInstances.length > 0) {
                    vQueueDate = getCbsDateStr(packageInstances[0].ExpireTime);
                    vQueueDate.setMinutes(vQueueDate.getMinutes() + vProductDuration);
                    vExpireTime = parseTimeToCBSDate(vQueueDate.getTime());
                    strExpireDate = parseTimeToDateGeneric(vQueueDate.getTime());
                    vEndDhDate = parseTimeToDHDate(vQueueDate.getTime());
                    vFinalDeezerDate = parseTimeToDate(vQueueDate.getTime(), false);
                    vBBEndDate = parseTimeToScheduleDate(vQueueDate.getTime());
                    vQueueDate.setMinutes(vQueueDate.getMinutes() + vWarningMinutes);
                    vScheduleDateWarning = parseTimeToScheduleDate(vQueueDate.getTime());
                    vScheduleDate = parseTimeToScheduleDate(vQueueDate.getTime());
                    vProcess = 'C';
                    vQueued = true;
                }
            }
        }
    }
}


if (typeof packageInstances.length != 'undefined' && packageInstances.length > 0 && vSubscriberType != 'PRE') {
    validPlan = false;
}
//LOGGER.info(tLinea + 'Llego a Validar EvalRules' + tLinea);
//LOGGER.info(tLinea + 'validPlan:' + validPlan + tLinea);