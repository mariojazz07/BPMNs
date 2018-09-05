if (typeof vHasPCCPlan == 'undefined') {


    var plan = new Object();
    var user = new Object();

    if (vSubscriberType != 'PRE') {
        if (!vIsPrimaryPlan) {
            if (typeof (planWallet) != 'undefined') {
                activePlanSeq = vPurchaseSeqVAS;
                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
            }
        } else {
            if (typeof (planWallet) != 'undefined') {

                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
            }

        }
    }



    if (navObject.offeringJson.filled) {
        if (typeof (planBillCycle) != 'undefined') {
            user.subscriberId = subscriberId.toString();
            user.billCycle = parseInt(planBillCycle).toString();
            //user.billCycle = planBillCycle;
        }
    }

}

else if(!vHasPCCPlan){
        var plan = new Object();
    var user = new Object();

    if (vSubscriberType != 'PRE') {
        if (!vIsPrimaryPlan) {
            if (typeof (planWallet) != 'undefined') {
                activePlanSeq = vPurchaseSeqVAS;
                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
            }
        } else {
            if (typeof (planWallet) != 'undefined') {

                planInstances = getSortedItemsPospaid(snatchInstances(planWallet.FreeUnitItemDetail, bundlePlanChildOffers, false, true, false));
                tmpInstances_plan = splitInstancesPlan(planInstances, activePlanSeq);
                plan = setPlanCBS(tmpInstances_plan, planBillCycle);
            }

        }
    }



    if (navObject.offeringJson.filled) {
        if (typeof (planBillCycle) != 'undefined') {
            user.subscriberId = subscriberId.toString();
            user.billCycle = parseInt(planBillCycle).toString();
            //user.billCycle = planBillCycle;
        }
    }
}