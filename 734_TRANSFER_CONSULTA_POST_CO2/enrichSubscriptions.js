if(typeof(vSusActiveOffer) != 'undefined' && typeof(vSusActivePurchaseSeq) != 'undefined'){    
    if(vSusActiveOffer == actOfferItem.OfferingKey.OfferingID && vSusActivePurchaseSeq == actOfferItem.OfferingKey.PurchaseSeq){
        if(typeof(susActive) != 'undefined'){
            actOfferItem.susActive = susActive == '1';
        } else {
            actOfferItem.susActive = false;
        }

        subscriptionItems.push(setSubscription(actOfferItem));
    }
}