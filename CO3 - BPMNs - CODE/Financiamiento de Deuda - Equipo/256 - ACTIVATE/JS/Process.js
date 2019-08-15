var vType=TYPE;
var vAmount=AMOUNT;
var vIsPartial=false;
var vMSValues=JSON.parse(JsonMS);
var vJson={};
var vOldInstallTotal;
var vOldInstallAmount;
var vNewInstallTotal;
var vNewInstallAmount;


if(vType=='PARTIAL'){
    vIsPartial=true;
    vJson=getPartialJsonRequest();
}

