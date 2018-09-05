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
	vOffCbs=vCBSOffering;
	vMasterSequence=transactionId;
}



