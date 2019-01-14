//actOfferId: offering de cbs
//var vQueryOffering
var vOfferingItem = '';

actOfferItem.productId = "0";
actOfferItem.offerType = "NA";
actOfferItem.offerName = "NA";
actOfferItem.productProfile = "0";
actOfferItem.productQta = "0";
actOfferItem.isPackage = false;

if (typeof vQueryOfferingObjects != 'undefined') {
    vOfferingItem = vQueryOfferingObjects[actOfferId];
    if (typeof vOfferingItem != 'undefined') {
        actOfferItem.productId = vOfferingItem.PRODUCT_ID;
        actOfferItem.offerType = vOfferingItem.TYPE;
        actOfferItem.offerName = vOfferingItem.PRODUCT_NAME;
        actOfferItem.productProfile = vOfferingItem.PROFILE;
        actOfferItem.productQta = vOfferingItem.QTA;
        actOfferItem.isPackage = vOfferingItem.PACKAGE == 'TRUE' ? true : false;
        LOGGER.info(tLinea+'actOfferItem.productId:'+actOfferItem.productId+tLinea);
    }
} 

// else {
//     actOfferItem.productId = "0";
//     actOfferItem.offerType = "NA";
//     actOfferItem.offerName = "NA";
//     actOfferItem.productProfile = "0";
//     actOfferItem.productQta = "0";
//     actOfferItem.isPackage = false;
// }


var cnfProductId = "0";
var cnfType = "NA";
var cnfProductName = "NA";
var cnfProfile = "0";
var cnfQta = "0";
var cnfPck = "FALSE";


enrichedOfferings = setEnrichment(enrichedOfferings, actOfferItem);
forCounter++;