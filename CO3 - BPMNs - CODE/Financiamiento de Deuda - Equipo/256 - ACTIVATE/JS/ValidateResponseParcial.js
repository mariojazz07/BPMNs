var vIsOK = true;

var vList = {};
var MSJson = '';
var vListArray = new Array();
var vTmpObject = new Object();


if (vIsDeuda) {

    var vNameDeuda = ['OFFERING_DEUDA', 'SEQUENCE_DEUDA', 'MONTO_DEUDA', 'CUOTAS_DEUDA', 'FECHA_FIN_DEUDA', 'STATUS_DEUDA'];
    var vValueDeuda = [vOfferingDeuda, vPsqDeuda, vFeeValue, vNewInstallTotal, vNewExpirationDeuda, 'VIGENTE'];
    for (var i = 0; i < vNameDeuda.length; i++) {
        vTmpObject = new Object();
        vTmpObject.name = vNameDeuda[i];
        vTmpObject.value = vValueDeuda[i];
        vListArray.push(vTmpObject);
    }

    vList.atributeList = vListArray;

} else {

    var vNameEquipo = ['OFFERING_EQUIPO', 'SEQUENCE_EQUIPO', 'MONTO_EQUIPO', 'CUOTAS_EQUIPO', 'FECHA_FIN_EQUIPO', 'STATUS_EQUIPO'];
    var vValueEquipo = [vOfferingEquipo, vPsqEquipo, vFeeValue, vNewInstallTotal, vNewExpirationEquipo, 'VIGENTE'];
    //vTmpObject.name = 'NAME_EQUIPO';
    //vTmpObject.value = ACCOUNT;
    //vListArray.push(vTmpObject);
    for (var i = 0; i < vNameEquipo.length; i++) {
        vTmpObject = new Object();
        vTmpObject.name = vNameEquipo[i];
        vTmpObject.value = vValueEquipo[i];
        vListArray.push(vTmpObject);
    }
    vList.atributeList = vListArray;

}


MSJson = JSON.stringify(vList);