
var vHasUnlimited=false;

if(typeof vPCCService != 'undefined'){
	if(vPCCService!= 'NA'){
		vHasUnlimited=true;
	}
	
}


var vSetOffering=false;

if(typeof vIsPrimaryPlan!= 'undefined'){
	if(!vIsPrimaryPlan){
		vSetOffering=true;
	}
}


LOGGER.info(tLinea+'vHasUnlimited:'+vHasUnlimited+tLinea);

LOGGER.info(tLinea+'vSetOffering:'+vSetOffering+tLinea);