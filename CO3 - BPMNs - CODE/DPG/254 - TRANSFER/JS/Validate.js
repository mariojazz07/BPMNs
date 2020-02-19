var vIsDPG=false;
var vIsDPA=false;
var vIsError=false;
var vType=TYPE;
var vJsonObject='';
if(typeof vJsonBalanceResponse != 'undefined'){
    vJsonObject=JSON.parse(vJsonBalanceResponse);
    
}



if(typeof vType != 'undefined'){
    if(vType=='DPG'){
        var vDPGAmount=getDepositBalance(subscriberId,vJsonObject,true,false);
        
        if(typeof vDPGAmount!= 'undefined'){
            vIsDPG=true;
            LOGGER.info(tLinea+'vDPGAmount:'+vDPGAmount+tLinea);

        }
    }
    else if(vType =='DPA'){
        var vMainBillingAccount=getDepositBalance(subscriberId,vJsonObject,false,true);
        if(typeof vMainBillingAccount!= 'undefined'){
            vIsDPA=true;
            LOGGER.info(tLinea+'vMainBillingAccount:'+vMainBillingAccount+tLinea);
        }
    }

}

if(!vIsDPG && !vIsDPA){
    vIsError=true;
}


