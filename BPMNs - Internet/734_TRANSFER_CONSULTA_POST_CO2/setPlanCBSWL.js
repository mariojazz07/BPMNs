if (typeof vHasPCCPlan == 'undefined') {


    // var plan = new Object();
    // var user = new Object();

    if (vSubscriberType != 'PRE') {
        if (!vIsPrimaryPlan) {
            if (typeof (planWallet) != 'undefined') {
                var plan = new Object();
                var user = new Object();
                activePlanSeq = vPurchaseSeqVAS;
                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
                
            }
        } else {
            if (typeof (planWallet) != 'undefined') {
                var plan = new Object();
                var user = new Object();
                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
            }

        }
    }



    if (navObject.offeringJson.filled) {
        if (typeof (planBillCycle) != 'undefined') {
            user.subscriberId = subscriberId.toString();
            user.billCycle = new Number(planBillCycle).toString();
            
            //user.billCycle = planBillCycle;
        }
    }

}

else if(!vHasPCCPlan){
        // var plan = new Object();
        // var user = new Object();

    if (vSubscriberType != 'PRE') {
        if (!vIsPrimaryPlan) {
            if (typeof (planWallet) != 'undefined') {
                var plan = new Object();
                var user = new Object();
                activePlanSeq = vPurchaseSeqVAS;
                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
            }
        } else {
            if (typeof (planWallet) != 'undefined') {
                var plan = new Object();
                var user = new Object();
                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
            }

        }
    }



    if (navObject.offeringJson.filled) {
        if (typeof (planBillCycle) != 'undefined') {
            user.subscriberId = subscriberId.toString();
            user.billCycle = new Number(planBillCycle).toString();
            //user.billCycle = planBillCycle;
            LOGGER.info(tLinea+'user.billCycle:'+user.billCycle+tLinea);
        }
    }
}