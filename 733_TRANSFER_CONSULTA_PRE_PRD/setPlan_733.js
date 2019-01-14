var plan = new Object();

var user = new Object();



if(navObject.pccJson.filled){

    if(typeof(navObject.pccJson.obj.Plans) != 'undefined'){

        plan = setPlan(navObject.pccJson.obj.Plans);

    }

    

    if(typeof(navObject.pccJson.obj.User) != 'undefined'){

        user.subscriberId = subscriberId.toString();

        user.billCycle = navObject.pccJson.obj.User.SubscriberBillCycle.toString();

    }

}



function setPlan(pItem){

    var plItem = new Object();

    var tmpQuotaItem = new Object();

    var tmpQuotasArray = new Array();

    var currentAmtBts = 0;

    var initialAmtBts = 0;

    var consumptionAmtBts = 0;

    var itmClass = 'Vigente';

    var itmName = '';

    var itmType = 'Plan';

    var itmMeasure = 'MB';

    var itmServiceStart = '';

    var itmServiceEnd = '';

    var itmQtaPrcntg = '';

    var itmQtaValue = '';

    var itmQtaConsumption = '';

    var itmQtaBalance = '';

    var billCycle = typeof(navObject.pccJson.obj.User.SubscriberBillCycle) != 'undefined' ? navObject.pccJson.obj.User.SubscriberBillCycle : "-";

    

    itmServiceStart = pItem.ServiceStartDate;

    itmServiceEnd = pItem.ServiceEndDate;

    itmName = pItem.ProductName;

    

    plItem.product_name = itmName;

    plItem.type_name = itmType;

    plItem.service_start = billCycle != "-" ? getCycleDate(new Number(billCycle)) : billCycle;

    plItem.service_end = "-";

    

    if(typeof pItem.Quotas == 'undefined'){

        currentAmtBts = new Number(pItem.QuotaBalanceMb);

        initialAmtBts = new Number(pItem.QuotaValueMb);

        consumptionAmtBts = new Number(pItem.QuotaConsumptionMb);

        itmQtaBalance = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));

        

        plItem.measure = itmMeasure;

        plItem.qta_balance = getUnit(currentAmtBts, 'MB');

        plItem.qta_consumption = getUnit(consumptionAmtBts, 'MB');

        plItem.qta_value = getUnit(initialAmtBts, 'MB');

        plItem.qta_percentage = itmQtaBalance;

    } else {

        for(var i = 0; i < pItem.Quotas.length; i++){

            currentAmtBts = new Number(pItem.Quotas[i].QuotaBalanceMb);

            initialAmtBts = new Number(pItem.Quotas[i].QuotaValueMb);

            consumptionAmtBts = new Number(pItem.Quotas[i].QuotaConsumptionMb);

            

            itmQtaBalance = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));

            

            tmpQuotaItem.measure = itmMeasure;



            tmpQuotaItem.qta_balance = getUnit(currentAmtBts, 'MB');

            tmpQuotaItem.qta_consumption = getUnit(consumptionAmtBts, 'MB');

            tmpQuotaItem.qta_value = getUnit(initialAmtBts, 'MB');

            tmpQuotaItem.qta_percentage = itmQtaBalance;

            

            tmpQuotasArray.push(tmpQuotaItem);

            tmpQuotaItem = new Object();

        }

        

        plItem.quotas = tmpQuotasArray;

    }

        

    return plItem;

}



function getCycleDate(billingDay){

    var vNow = new Date(vSysDate.getTime());

    var addMonth = true;

    var vMonth = '0';

    var vAdd = billingDay > 1 ? 2 : 1;

    

    if(vNow.getDate() > billingDay){

        vNow.setMonth(vNow.getMonth() + vAdd);

        addMonth = false;

    }

    

    vMonth = addMonth ? String((vNow.getMonth() + 1)) : String(vNow.getMonth());

    

    vNow.setDate(billingDay - 1);

    

    return padStr(vNow.getFullYear(), 4, '0', STR_PAD_LEFT) + '' + padStr(vMonth, 2, '0', STR_PAD_LEFT) + '' + padStr(String(vNow.getDate()), 2, '0', STR_PAD_LEFT) + '' + padStr(String(23), 2, '0', STR_PAD_LEFT) + '' + padStr(String(59), 2, '0', STR_PAD_LEFT) + '' + padStr(String(59), 2, '0', STR_PAD_LEFT);

}