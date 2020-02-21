var vAttrJson;
var vAttrObject=new Object();
var vAttrArray=['Estado','Fecha de pago','Medio de pago','Monto Disponible','Monto Inicial','Numero de Recibo'];
var vAttrArrayValues=['Disponible',parseDateToStringAS(new Date()),'Efectivo',vDPGAmount,vDPGAmount,''];
var vAttrJsonArray=new Array();
var vTmpObject=new Object();
var TmpJson='';
var vAssetId='';



TmpJson=JSON.parse(vCreateDpgResponse);
vAssetId=TmpJson.listOfTggetgralinforqio.assetMgmtAsset[0].assetId;
 


for(var i=0;i<=vAttrArray.length;i++){
    vTmpObject=new Object();
    vTmpObject.dataType='Texto';
    vTmpObject.name=vAttrArray[i];
    vTmpObject.displayName=vAttrArray[i];
    vTmpObject.objectId=vAssetId;
    vTmpObject.textValue=vAttrArrayValues[i];
    vAttrJsonArray.push(vTmpObject);
}

vAttrObject.listOfTgAssetMgmtXa=new Object();
vAttrObject.listOfTgAssetMgmtXa.assetMgmtAssetXa=vAttrJsonArray;
vAttrJson=JSON.stringify(vAttrObject);





