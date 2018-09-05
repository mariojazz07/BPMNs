
var actOfferItemPrimary=new Object();
var actOfferIdPrimary='0';
var vIsPrimaryPlan=false;


if(navObject.offeringJson.filled){
    
    
    doPlanLoop = forPlanCounter < primaryOffers.length;
    
    

    if(doPlanLoop){
        actOfferItemPrimary = primaryOffers[forPlanCounter];
        
        if(typeof(actOfferItemPrimary.OfferingKey) != 'undefined'){
            actOfferIdPrimary = actOfferItemPrimary.OfferingKey.OfferingID;
        }
    } else {
        forPlanCounter = 0;
        
        enrichedOfferings.planOfferings = getSortedItems(enrichedOfferings.planOfferings);
       
    }
}

