if(typeof(cnfProductId) != 'undefined'){
    
    //Valida Primary
     actOfferItemPrimary.productId = cnfProductId;
    actOfferItemPrimary.offerType = cnfType;
    actOfferItemPrimary.offerName = cnfProductName;
    actOfferItemPrimary.productProfile = cnfProfile;
    actOfferItemPrimary.productQta = typeof(cnfQta) != 'undefined' ? cnfQta : "0";
    actOfferItemPrimary.isPackage = typeof(cnfPck) != 'undefined' ? (cnfPck.toUpperCase() == 'TRUE') : false;
   // vIsPrimaryPlan=true;


}  else{
    
    
    actOfferItemPrimary.productId = "0";
    actOfferItemPrimary.offerType = "NA";
    actOfferItemPrimary.offerName = "NA";
    actOfferItemPrimary.productProfile = "0";
    actOfferItemPrimary.productQta = "0";
    actOfferItemPrimary.isPackage = false; 
}


var cnfProductId = "0";
var cnfType = "NA";
var cnfProductName = "NA";
var cnfProfile = "0";
var cnfQta = "0";
var cnfPck="FALSE";
enrichedOfferings = setEnrichment(enrichedOfferings, actOfferItemPrimary);
forPlanCounter++;