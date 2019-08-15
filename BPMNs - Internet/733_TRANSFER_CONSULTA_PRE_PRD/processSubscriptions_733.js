var actOfferItem = new Object();
var actProfileId = '0';
var subscriptions = new Array();

if(enrichedOfferings.susOfferings.length > 0){
    doLoop = forCounter < enrichedOfferings.susOfferings.length;

    if(doLoop){
        actOfferItem = enrichedOfferings.susOfferings[forCounter];

        if(typeof(actOfferItem.productProfile) != 'undefined'){
            actProfileId = actOfferItem.productProfile;
        }

        forCounter++;
    } else {
        forCounter = 0;
    }
}

function setSubscription(pSubsItem){
    var subsItem = new Object();
    var susWallet = new Object();
    var flag = false;

    if(pSubsItem.offerType == 'SUS'){
        susWallet = getWalletObj(strSusBalance, navObject.walletJson);
        flag = typeof(susWallet) != 'undefined';
        if (flag) 
            subsItem = setSubsItems(pSubsItem, susWallet.FreeUnitItemDetail, false, flag, pSubsItem.offerType);
        else 
            subsItem = setSubsItems(pSubsItem, null, false, flag, pSubsItem.offerType);

    } else {
        subsItem = setSubsItems(pSubsItem, null, false, false, pSubsItem.offerType);
    }

    return subsItem;
}

function setSubsItems(susOffer, instances, queue, hasWallet, offerType){
    var packItem;
    var tmpItem;
    var currentAmtBts = 0;
    var initialAmtBts = 0;
    var consumptionAmtBts = 0;
    var reservedAmount = 0;
    var itmClass = !queue ? 'Vigente' : 'Encolado';
    var itmOffer = '';
    var itmProduct = '';
    var itmPurchaseSeq = '';
    var itmName = '';
    var itmType = 'Suscripcion';
    var itmMeasure = 'MB';
    var itmServiceStart = '';
    var itmServiceEnd = '';
    var itmQtaPrcntg = '';
    var itmQtaValue = '';
    var itmQtaConsumption = '';
    var itmQtaBalance = '';
    var itmActive = false;
    
    packItem = new Object();
    itmOffer = susOffer.OfferingKey.OfferingID;
    itmProduct = susOffer.productId;
    itmPurchaseSeq = susOffer.OfferingKey.PurchaseSeq;
    itmName = susOffer.offerName;
    itmServiceStart = susOffer.EffectiveTime;
    itmServiceEnd = susOffer.ExpirationTime;
    itmActive = susOffer.susActive;
    
    var tproductQta = new Number(susOffer.productQta);
    
    if(offerType == 'SUS'){
        if (hasWallet && tproductQta > 0) {
            if(typeof(instances.CurrentAmount) != 'undefined'){
                currentAmtBts = new Number(instances.CurrentAmount);
                initialAmtBts = new Number(susOffer.productQta);
                reservedAmount = new Number(instances.ReservationAmount);
                
                if(initialAmtBts > reservedAmount && currentAmtBts > reservedAmount){
                    currentAmtBts = (currentAmtBts > initialAmtBts) ? initialAmtBts : currentAmtBts - reservedAmount;
                }

            }

            consumptionAmtBts = initialAmtBts - currentAmtBts;
            if (currentAmtBts > 0 & initialAmtBts > 0)
                itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
            else 
                itmQtaPrcntg = '0.00';
            
            itmQtaValue = getUnit(initialAmtBts, 'KB');
            itmQtaConsumption = getUnit(consumptionAmtBts, 'KB');
            itmQtaBalance = getUnit(currentAmtBts, 'KB');
            itmMeasure = 'MB';
        } else {
            itmQtaPrcntg = '100.00';
            itmQtaValue = getUnit(0, 'KB');
            itmQtaConsumption = getUnit(0, 'KB');
            itmQtaBalance = getUnit(0, 'KB');
            itmMeasure = 'MB';
        }

        packItem = setItemSubs(itmOffer, itmProduct, itmPurchaseSeq, itmName, itmType, itmMeasure, itmServiceStart, 
        itmServiceEnd, itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, false, true, itmActive);
    } else {   
        currentAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, true);
        initialAmtBts = getHoursDiff(itmServiceStart, itmServiceEnd, false);
        consumptionAmtBts = initialAmtBts - currentAmtBts;
        itmQtaPrcntg = String(new Number((currentAmtBts / initialAmtBts) * 100).toFixed(2));
        itmQtaValue = getUnit(initialAmtBts, 'HRS');
        itmQtaConsumption = getUnit(consumptionAmtBts, 'HRS');
        itmQtaBalance = getUnit(currentAmtBts, 'HRS');
        itmMeasure = 'Hrs';
        
        packItem = setItemSubs(itmOffer, itmProduct, itmPurchaseSeq, itmName, itmType, itmMeasure, itmServiceStart, 
        itmServiceEnd, itmQtaPrcntg, itmQtaValue, itmQtaConsumption, itmQtaBalance, itmClass, true, true, itmActive);
    }
    
    return packItem;
}