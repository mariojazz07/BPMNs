var vMasterSequence=''; 

if(vPlanInclude || vUnsubReq||resetSubs||vUnsub){
	vOffCbs='NA';
	vMasterSequence='NA';

}
else if (vUpdateService){
	vOffCbs=vUnsubOffering;
	vMasterSequence=vPlanVasPurchaseSeq;
}
else{
	vOffCbs=vCBSOffering;
	vMasterSequence=transactionId;
}


