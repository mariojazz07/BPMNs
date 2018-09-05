var vCreatePcc = false;
var allowError = true;
var doPCC=false;
var doCBS=false;
var vCounter2=0;
var doLoop=false;
var vPCCArray=new Array();

if(typeof PCCGetSubscriberAllInfTask__platformErrorCode != 'undefined'){
	if(PCCGetSubscriberAllInfTask__platformErrorCode == '12302' || PCCGetSubscriberAllInfTask__platformErrorCode == '' || PCCGetSubscriberAllInfTask__platformErrorCode == ' ' || PCCGetSubscriberAllInfTask__platformErrorCode == null || PCCGetSubscriberAllInfTask__platformErrorCode == 'null'){
				vCreatePcc = true;
	} else {
		allowError = false;
	}
}

if (vPCCService!= 'undefined' && vPCCService != 'NA')
{
	doPCC=true;
	vPCCArray=vPCCService.split(',');
	vSrvPcc=vPCCArray[vCounter2];
}

if(vCBSOffering != 'undefined' && !vPlanInclude){
	doCBS=true;
	vOffCbs=vCBSOffering;
}