if(typeof(cnfProductId) != 'undefined'){
    actOfferItem.productId = cnfProductId;
    actOfferItem.offerType = cnfType;
    actOfferItem.offerName = cnfProductName;
    actOfferItem.productProfile = cnfProfile;
    actOfferItem.productQta = typeof(cnfQta) != 'undefined' ? cnfQta : "0";
    actOfferItem.isPackage = typeof(cnfPck) != 'undefined' ? (cnfPck.toUpperCase() == 'TRUE') : false;
}  else{
    actOfferItem.productId = "0";
    actOfferItem.offerType = "NA";
    actOfferItem.offerName = "NA";
    actOfferItem.productProfile = "0";
    actOfferItem.productQta = "0";
    actOfferItem.isPackage = false;
}
var cnfProductId = "0";
var cnfType = "NA";
var cnfProductName = "NA";
var cnfProfile = "0";
var cnfQta = "0";
var cnfPck="FALSE";

enrichedOfferings = setEnrichment(enrichedOfferings, actOfferItem);
forCounter++;