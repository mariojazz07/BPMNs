var vIsError = false;
var vMSError=true;
if (typeof GetAttributesValuesTask__responseCode != 'undefined') {
    if (GetAttributesValuesTask__responseCode != '0') {
        vIsError = true;
    }
} 

if (typeof GetAttributesValuesTask__errorCode != 'undefined') {
    if (GetAttributesValuesTask__errorCode == '202') {
        vIsError = true;
    }
}


// if(typeof vErrorCode != 'undefined'){
//     if(vErrorCode =='202'){
//         vIsError=true;
//     }
    
// }
// else{

// }





//if (!vIsError) {
  if(typeof JsonMS != 'undefined'){
          var MSFinancial = JsonMS;
          var vMSError=false;
    var vDeudaInitDate = getMSAttributes('FECHA_INICIO_EQUIPO', MSFinancial);
    var vEquipoInitDate = getMSAttributes('FECHA_INICIO_EQUIPO', MSFinancial);
    var vDeudaEndDate = getMSAttributes('FECHA_FIN_DEUDA', MSFinancial);
    var vEquipoEndDate = getMSAttributes('FECHA_FIN_EQUIPO', MSFinancial);
    var vSysdate = new Date();
    var vDeudaVigente = false;
    var vEquipoVigente = false;
    //var vJson={Installments:[]};
    var vJson = {};

    if (typeof vDeudaInitDate != 'undefined') {
        vDeudaInitDate = getFinancialDate(vDeudaInitDate);

    }

    if (typeof vDeudaEndDate != 'undefined') {

        vDeudaEndDate = getFinancialDate(vDeudaEndDate);


        if (vDeudaEndDate >= vSysdate) {
            vDeudaVigente = true;
        }
    }

    if (typeof vEquipoInitDate != 'undefined') {
        vEquipoInitDate = getFinancialDate(vEquipoInitDate);

    }

    if (typeof vEquipoEndDate != 'undefined') {
        vEquipoEndDate = getFinancialDate(vEquipoEndDate);
        if (vEquipoEndDate >= vSysdate) {
            vEquipoVigente = true;
        }
    }


    var vIsOK = false;


    if (!vDeudaVigente && !vEquipoVigente) {
        vIsOK = true;
        //vNoInstallment=true;
    } else if (!vDeudaVigente && vEquipoVigente) {
        vIsOK = true;
        // vEquipInstallment=true;
    } else if (vDeudaVigente && !vEquipoVigente) {
        vIsOK = true;
        //vDebtInstallment=true;
    }

} else {
    //var vIsOK = false;
    var vNoDataMS=true;
}