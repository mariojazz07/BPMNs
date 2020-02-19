var vRuleID = PVS_ID;
var vIsFinancial = false;
var vIsType = false;
var vIsDate = false;
var vIsNoRule = false;
var vDPGClientType = false;
var vIsAF = false;
var vIsAFDate = false;
var vIsAFAmount = false;
switch (vRuleID) {
    //Valida Regla de numero de arreglos permitidos
    case 'PVS-RL-FD-001':
        vIsFinancial = true;
        break;
        //Final
        //Valida Regla de tipo de cliente
    case 'PVS-RL-FD-002':
        vIsType = true;
        break;
        //Regla para validar fecha de inicio financiamiento.
    case 'PVS-RL-FD-003':
        // if (typeof INITIAL_DATE != 'undefined') {
        //     vIsDate = true;
        // } else {
        //     vIsNoRule = true;
        // }
        vIsDate = true;
        break;
    case 'PVS-RL-DPG-001':
        vDPGClientType = true;
        break;
    case 'PVS-RL-AF-002':
        vIsAFAmount = true;
        vIsAF = true;
        break;
    case 'PVS-RL-AF-003':
        vIsAFDate = true;
        vIsAF = true;
        break;
    default:
        vIsNoRule = true;
        break;
}