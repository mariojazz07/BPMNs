var vQueryJson = JSON.parse(vJson);
var vIsOK = false;
var vType = TYPE;
var vWaivePenalty = '';
var vOffering = '';
var vPsequence = '';
var vAmount = AMOUNT;
var vFeeValue = FEE_VALUE;
var vPaidFees = PAID_FEES;
var vType = TYPE;
var vInstallments = INSTALLMENTS;
var vIsDeuda = false;
var vTmpObject = new Object();

if (typeof vQueryJson != 'undefined') {

    if (vType = 'DEUDA') {
        vIsOK = true;
        vIsDeuda = true;
        vTmpObject = vQueryJson.Installments;
        for (var i = 0; i < vTmpObject.length; i++) {
            if (vTmpObject[i].Type == 'Deuda') {
                var vTmpDeudaObject = new Object();
                vTmpDeudaObject = vTmpObject[i];
                break;
            }
        }
        vOffering = vTmpDeudaObject.Offering;
        vPsequence = vTmpDeudaObject.Sequence;
        vWaivePenalty = 'Yes';

    } else if (vType = 'EQUIPO') {
        vIsOK = true;

        vTmpObject = vQueryJson.Installments;
        for (var j = 0; j < vTmpObject.length; j++) {
            if (vTmpObject[j].Type == 'Equipo') {
                var vTmpEquipoObject = new Object();
                vTmpEquipoObject = vTmpObject[j];
                break;
            }
        }
        vOffering = vTmpEquipoObject.Offering;
        vPsequence = vTmpEquipoObject.Sequence;
        vWaivePenalty = 'No';

    }
}