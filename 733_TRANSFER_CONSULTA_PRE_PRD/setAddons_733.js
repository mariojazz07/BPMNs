var addons = new Object();

var addonsT2 = new Object();



if(navObject.pccJson.filled){

    if(typeof(navObject.pccJson.obj.Addons) != 'undefined'){

        if(navObject.pccJson.obj.Addons.length > 0){

            addons = unifyAddons(navObject.pccJson.obj.Addons);

            addonsT2 = setRetAddon(navObject.pccJson.obj.Addons);

        }

    }

}



function setRetAddon(addArray){

    var addonItm = new Object();

    var tmpAddon = new Object();

    

    if(typeof vAddonRetEntitlement != 'undefined' && typeof vAddonRetExpire != 'undefined'){

        tmpAddon = getAddRet(addArray, vAddonRetEntitlement);

        

        if(typeof tmpAddon != 'undefined'){

            addonItm.product_name = tmpAddon.ProductName;

            addonItm.type_name = 'Addon';

            addonItm.service_start = tmpAddon.itmServiceStart;

            addonItm.service_end = getRetEndDate(vAddonRetExpire);

        }

    }

    

    return addonItm;

}



function getRetEndDate(val){

    //04/12/2017 23:59:13 

    var strDate = val.replace(/\D/g,' ');

    var dateArray = strDate.split(' ');

    

    var day = padStr(dateArray[0], 2, '0', STR_PAD_LEFT);

    var year = dateArray[2];

    var month = padStr(dateArray[1], 2, '0', STR_PAD_LEFT);

    var hours = padStr(dateArray[3], 2, '0', STR_PAD_LEFT);

    var minutes = padStr(dateArray[4], 2, '0', STR_PAD_LEFT);

    var seconds = padStr(dateArray[5], 2, '0', STR_PAD_LEFT);

    var format = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds;



    return format;

}



function getAddRet(addArray, addName){

    var addItem;

    

    for(var i = 0; i < addArray.length; i++){

        if(addArray[i].ServiceName.indexOf(vAddonRetEntitlement) >= 0){

            addItem = addArray[i];

            

            break;

        }

    }

    

    return addItem;

}



function unifyAddons(addArray){

    var addonItm = new Object();

    var currentAmtBts = 0;

    var initialAmtBts = 0;

    var consumptionAmtBts = 0;

    var itmClass = 'Vigente';

    var itmName = '';

    var itmType = 'Addon';

    var itmMeasure = 'MB';

    var itmServiceStart = '';

    var itmServiceEnd = '';

    var itmQtaPrcntg = '';

    var itmQtaValue = '';

    var itmQtaConsumption = '';

    var itmQtaBalance = '';

    

    if(addArray.length > 0){

        itmServiceStart = addArray[addArray.length - 1].ServiceStartDate;

        itmServiceEnd = addArray[0].ServiceEndDate;

        

        for(var i = 0; i < addArray.length; i++){

            currentAmtBts += new Number(addArray[i].QuotaBalanceMb);

            initialAmtBts += new Number(addArray[i].QuotaValueMb);

            consumptionAmtBts += new Number(addArray[i].QuotaConsumptionMb);

            

            if(typeof vAddonRetEntitlement != 'undefined'){

                if(addArray[i].ServiceName.indexOf(vAddonRetEntitlement) < 0){

                    itmName += itmName == '' ? addArray[i].ProductName : ',' + addArray[i].ProductName;

                }

            } else {

                itmName += itmName == '' ? addArray[i].ProductName : ',' + addArray[i].ProductName;

            }

        }

        

        itmQtaBalance = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));

        

        addonItm.product_name = itmName;

        addonItm.type_name = itmType;

        addonItm.measure = itmMeasure;

        addonItm.service_start = itmServiceStart;

        addonItm.service_end = itmServiceEnd;

        addonItm.qta_balance = getUnit(currentAmtBts, 'MB');

        addonItm.qta_consumption = getUnit(consumptionAmtBts, 'MB');

        addonItm.qta_value = getUnit(initialAmtBts, 'MB');
        
        if (vChannelPC == channelId) {     
            addonItm.qta_percentage = String(new Number(itmQtaBalance) - 100);
            if (addonItm.qta_percentage < 0)
                addonItm.qta_percentage = String(new Number(addonItm.qta_percentage) * (-1));
        }
        else 
            addonItm.qta_percentage = itmQtaBalance;

    }

    

    return addonItm;

}