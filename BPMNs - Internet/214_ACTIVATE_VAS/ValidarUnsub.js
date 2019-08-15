var vRemoveUnlimited=false;
var vRemoveOffering=false;

// if(typeof vPCCService != 'undefined' && vPCCService!='NA'){
// 	vRemoveUnlimited=true;
// }

if(typeof vActualOffering != 'undefined' && vActualOffering!= 'NA'){
	// if(INCLUDE!='undefined' && INCLUDE!='TRUE'){
	// 	vRemoveOffering=true;
	// }
	vRemoveOffering=true;

}




/*************************Validacion de Apps*****************************/
//var vUnsubPCCApp = new Array();
var vCounter = 0;
var doLoopUnsub=false;
var vPCCRemoveApp = '';
var vUnsubAppSrv=new Array();

if(typeof vActualPCCApp != 'undefined'){
	vRemoveUnlimited=true;
	vUnsubAppSrv=vActualPCCApp.split(','); 
	vPCCRemoveApp = vUnsubAppSrv[vCounter];
}

// if (vRemoveUnlimited) {
// 	//vUnsubPCCApp = vPCCService.split(',');
// 	vPCCRemoveApp = vUnsubPCCApp[vCounter];

// }

