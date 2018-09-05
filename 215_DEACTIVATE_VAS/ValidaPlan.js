var vValidOffering = false;
var vDoDelete = true;

if (typeof vPlanVasPurchaseSeq != 'undefined' && typeof vUnsubOffering != 'undefined') {
	if (typeof vCBSOffering != 'undefined') {
		if (vCBSOffering == vUnsubOffering) {
			vValidOffering = true;
		}
	}
}

if (vPrimaryOffer||vDelOrigin=='CDCPE') {
	vDoDelete = false;
}