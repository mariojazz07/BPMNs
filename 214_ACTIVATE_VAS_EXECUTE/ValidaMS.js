var vMasterSequence=''; 

if(vIsPrimary){
	vOffCbs='NA';
	vMasterSequence='NA';

}
else if (vUpdateService){
	vOffCbs=vCBSOffering;
	vMasterSequence=vPurchaseSeqVAS;
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



