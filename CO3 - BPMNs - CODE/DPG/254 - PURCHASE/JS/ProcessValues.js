var vJsonDPG=JSON.parse(vJsonDPGMS);
var vClient='';
var vLocation='';
var vError=false;
var vJsonObject=new Object();
var vJsonRequest;
var vJsonRequestBilling;
var vCFacturacion='';

if(typeof vJsonDPG != 'undefined'){
for(var i=0;i<=vJsonDPG.length;i++){
    if(vJsonDPG[i].name=='CLIENTE'){
        vClient=vJsonDPG[i].value;
        vLocation=vJsonDPG[i].value;
        vJsonObject.integrationId=vClient;
vJsonObject.location=vLocation;
vJsonRequest=JSON.stringify(vJsonObject);
        
    }
    else if(vJsonDPG[i].name=='CUENTAFACTURACION'){
        vCFacturacion=vJsonDPG[i].value;
        vJsonObject=new Object();
        vJsonObject.name='1-F'+vCFacturacion;
        vJsonRequestBilling=JSON.stringify(vJsonObject);
    }
    else if(vJsonDPG[i].name==''){

    }

}

vJsonObject.integrationId=vClient;
vJsonObject.location=vLocation;
vJsonRequest=JSON.stringify(vJsonObject);

}
else{
    vError=true;
}