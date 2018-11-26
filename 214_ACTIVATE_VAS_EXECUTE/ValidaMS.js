var vMasterSequence=''; 

if(vIsPrimary){
	vOffCbs='NA';
	vMasterSequence='NA';

}
else if (vUpdateService){
	vOffCbs=vCBSOffering;
	vMasterSequence=typeof vPurchaseSeqVAS != 'undefined'?vPurchaseSeqVAS:'NA';
}
else{
	if(typeof vCBSOffering!='undefined'){
	vOffCbs=vCBSOffering;
	vMasterSequence=transactionId;
	}
	else{
		vOffCbs='NA';
		vMasterSequence='NA';
	}
}


LOGGER.info(tLinea+'Llego a ValidaMS'+tLinea);


