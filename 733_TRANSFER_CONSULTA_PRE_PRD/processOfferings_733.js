var actOfferItem = new Object();
var actOfferId = '0';
if(navObject.offeringJson.filled){
    doLoop = forCounter < supplementaryOffers.length;
    //LOGGER.info('offerings: ' +supplementaryOffers.length);
    //LOGGER.info('loop: ' +forCounter);
    if(doLoop){
        actOfferItem = supplementaryOffers[forCounter];
        if(typeof(actOfferItem.OfferingKey) != 'undefined'){
            actOfferId = actOfferItem.OfferingKey.OfferingID;
        }
    } else {
        forCounter = 0;
        enrichedOfferings.appOfferings = getSortedItems(enrichedOfferings.appOfferings);
        enrichedOfferings.susOfferings = getSortedItems(enrichedOfferings.susOfferings);
        enrichedOfferings.cmbOfferings = getSortedItems(enrichedOfferings.cmbOfferings);
    }
}