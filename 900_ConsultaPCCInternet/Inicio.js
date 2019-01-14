var BPMN_RESPONSE_CODE = '0';
var vInternet = false;
var bExiste = false;
var vHoy = new Date();
var NexusPCC = {Services:[]};
var paqueteY = {};
var FechaPI = new Date();    
var FechaPF = new Date();
var IDs = [];
var productsID = [];
var IlimitadosJ = [];
var APP_FACEBOOK = '';
var APP_CLASH_OF_CLANS ='';
var APP_CLASH_ROYALE = '';
var APP_INSTAGRAM = '';
var APP_POKEMON_GO = '';
var APP_WHATSAPP = '';
var APP_YOUTUBE = '';
BILLCYCLEDAY = '7';
var Jproductos = [{
        "ProductID": 353,
        "Name":"ILI-353",
        "PName": "Promo Whatsapp Gratis",
        "SRV" : "APP_WHATSAPP",
        "QInitial" : 2147483645.00,
        "ServiceID": 3,
        "QNAME" : "APP_WHATSAPP Quota"
    },{
        "ProductID": 1103,
        "Name":"ILI-1103",
        "PName": "Promo Whatsapp Gratis",
        "SRV" : "APP_WHATSAPP",
        "QInitial" : 2147483645.00,
        "ServiceID": 3,
        "QNAME" : "APP_WHATSAPP Quota"
    },
    {
        "ProductID": 355,
        "Name":"ILI-355",
        "PName": "Promo Facebook Gratis",
        "SRV" : "APP_FACEBOOK",
        "ServiceID": 1,
        "QInitial" : 2147483645.00,
        "QNAME" : "APP_FACEBOOK Quota"
    },
    {
        "ProductID": 1105,
        "Name":"ILI-1105",
        "PName": "Promo Facebook Gratis",
        "SRV" : "APP_FACEBOOK",
        "ServiceID": 1,
        "QInitial" : 2147483645.00,
        "QNAME" : "APP_FACEBOOK Quota"
    },
    {
        "ProductID": 403,
        "Name":"ILI-403",
        "PName": "Paquete Pokemon Go L.12",
        "SRV" : "APP_POKEMON_GO",
        "QInitial" : 2147483645.00,
        "ServiceID": 7,
        "QNAME" : "APP_POKEMON_GO Quota"
    },
    {
        "ProductID": 1113,
        "Name":"ILI-1113",
        "PName": "Paquete Pokemon Go L.12",
        "SRV" : "APP_POKEMON_GO",
        "QInitial" : 2147483645.00,
        "ServiceID": 7,
        "QNAME" : "APP_POKEMON_GO Quota"
    },
    {
        "ProductID": 416,
        "Name":"ILI-416",
        "PName": "Paquete Facebook WelcomePack",
        "SRV" : "APP_FACEBOOK",
        "ServiceID": 1,
        "QInitial" : 2147483645.00,
        "QNAME" : "APP_FACEBOOK Quota"
    },
    {
        "ProductID": 1115,
        "Name":"ILI-1115",
        "PName": "Paquete Facebook WelcomePack",
        "SRV" : "APP_FACEBOOK",
        "ServiceID": 1,
        "QInitial" : 2147483645.00,
        "QNAME" : "APP_FACEBOOK Quota"
    },
    {
        "ProductID": 720,
        "Name":"ILI-720",
        "PName": "Instagram Ilimitado (L 22 / 1 dia)",
        "SRV" : "APP_INSTAGRAM",
        "QInitial" : 2147483645.00,
        "ServiceID": 2,
        "QNAME" : "APP_INSTAGRAM Quota"
    },
    {
        "ProductID": 1078,
        "Name":"ILI-1078",
        "PName": "Instagram Ilimitado (L 22 / 1 dia)",
        "SRV" : "APP_INSTAGRAM",
        "QInitial" : 2147483645.00,
        "ServiceID": 2,
        "QNAME" : "APP_INSTAGRAM Quota"
    },
    {
        "ProductID": 721,
        "Name":"ILI-721",
        "PName": "Facebook Ilimitado (L 15 / 1 dia)",
        "SRV" : "APP_FACEBOOK",
        "ServiceID": 1,
        "QInitial" : 2147483645.00,
        "QNAME" : "APP_FACEBOOK Quota"
    },
    {
        "ProductID": 1079,
        "Name":"ILI-1079",
        "PName": "Facebook Ilimitado (L 15 / 1 dia)",
        "SRV" : "APP_FACEBOOK",
        "ServiceID": 1,
        "QInitial" : 2147483645.00,
        "QNAME" : "APP_FACEBOOK Quota"
    },
    {
        "ProductID": 526,
        "Name":"ILI-526",
        "PName": "Youtube Ilimitado (L 28/1 dia)",
        "SRV" : "APP_YOUTUBE",
        "QInitial" : 2147483645.00,
        "ServiceID": 4,
        "QNAME" : "APP_YOUTUBE Quota"
    },
    {
        "ProductID": 527,
        "Name":"ILI-527",
        "PName": "Clash of Clan Ilimitado (L 12/1 dia)",
        "SRV" : "APP_CLASH_OF_CLANS",
        "QInitial" : 2147483645.00,
        "ServiceID": 5,
        "QNAME" : "APP_CLASH_OF_CLANS Quota"
    },
    {
        "ProductID": 528,
        "Name":"ILI-528",
        "PName": "Clash Royale Ilimitado (L 17/1 dia)",
        "SRV" : "APP_CLASH_ROYALE",
        "QInitial" : 2147483645.00,
        "ServiceID": 6,
        "QNAME" : "APP_CLASH_ROYALE Quota"
    }
]
var PaqueteM = //Modelo
    {
        SRVNAME: "Name",
        P:"ProductID",
        I:"Start",
        V:"Vigencia",
        Initial : "QInitial",
        SRV: "QNAME",
        Name: "PName",
        ServiceID: "ServiceID",
        ProductID: "ProductID",
        QTANAME: "QNAME",
        QTAVALUE_MB: "QInitial",
        QTACONSUMPTION_MB: "QConsumption",
        //QTABALANCE:"QBalance",
        QTABALANCE_MB: "QBalance",
        QTAPERCENTAGE: "QBalanceP",
        SRVSTARTDATETIME: "Start",
        SRVENDDATETIME: "End",
        SRVISEXPIRED:"Expired",
        SRVPRODUCTTYPE:"Type",
        USRBILLCYCLEDATE: "BillCycleDate"
        //Expirado:"Expired",
        //Clase: "Class"
    };
if(typeof TYPE == 'undefined'){
    var TYPE = 'INTERNET';
}
if (TYPE == "INTERNET") {
    vInternet = true;
}
function parseCBSDate2(Texto) {
    var FechaD = new Date();
    var tAnio = Texto.substr(6, 4);
    //var tMes = Number(Texto.substr(4,2))-1 ;
    var tMes = Number(Texto.substring(0, 2)) - 1;
    var tDia = Texto.substr(3, 2);
    var tHora = Texto.substr(11, 2);
    var tMinutos = Texto.substr(14, 2);
    var tSegundos = Texto.substr(17, 2);
    FechaD.setFullYear(tAnio,tMes, tDia);
    //FechaD.setMonth(tMes, tDia);
    //FechaD.setDate( tDia);
    FechaD.setHours(tHora, tMinutos,tSegundos,0);
    //FechaD.setMinutes(tMinutos);
    //FechaD.setSeconds(tSegundos);
    return FechaD;
};
function parseCBSDate(Texto) {
    var FechaD = new Date();
    var tAnio = Texto.substr(0, 4);
    //var tMes = Number(Texto.substr(4,2))-1 ;
    var tMes = Number(Texto.substring(4, 6)) - 1;
    var tDia = Texto.substr(6, 2);
    var tHora = Texto.substr(8, 2);
    var tMinutos = Texto.substr(10, 2);
    var tSegundos = Texto.substr(12, 2);
    FechaD.setFullYear(tAnio,tMes, tDia);
    //FechaD.setMonth(tMes, tDia);
    //FechaD.setDate( tDia);
    FechaD.setHours(tHora, tMinutos,tSegundos,0);
    //FechaD.setMinutes(tMinutos);
    //FechaD.setSeconds(tSegundos);
    return FechaD;
};
function parseTimeCBS  (gTime) {
    var tTiempo = new Date();
    tTiempo.setTime(gTime);
    var Texto = parseDate2CBS(tTiempo);
    return Texto;
};
function parseDate2CBS (Fecha) {
    var Texto = ' ';
    var tAnio = Fecha.getFullYear();
    var tMes = Fecha.getMonth() + 1;
    var tDia = Fecha.getDate();
    var tHora = Fecha.getHours();
    var tMinutos = Fecha.getMinutes();
    var tSegundos = Fecha.getSeconds();
    Texto = String(tAnio);
    if (tMes < 10) Texto = Texto + '0';
    Texto = Texto +  String(tMes);
    if (tDia < 10) Texto = Texto + '0';
    Texto = Texto +  String(tDia);
    if (tHora < 10) Texto = Texto + '0';
    Texto = Texto +  String(tHora);
    if (tMinutos < 10) Texto = Texto + '0';
    Texto = Texto +  String(tMinutos);    
    if (tSegundos < 10) Texto = Texto + '0';
    Texto = Texto +  String(tSegundos);
    return Texto;
};
function getObjects(obj, key, val, level) {
    var levelX = level;
    var indexY = 0;
    var objects = [];
    for (var i in obj) {
        if (typeof obj[i] == 'object') {
            if (obj[i].key != undefined) {
                if (PaqueteM[obj[i].key] != undefined) {
                    paqueteY[PaqueteM[obj[i].key]] = obj[i].value;
                };
            }
            objects = objects.concat(getObjects(obj[i], key, val, levelX + 1)); //Busca en Hijos
            if (level == 1) {
                if (paqueteY[PaqueteM[key]] != undefined) {
                    if (val.length > 0) { //Se sale sí ya encontró
                        paqueteY.index = val.indexOf(paqueteY[PaqueteM[key]])
                    };
                    if (paqueteY.index >= 0  || val.length  == 0 ) {
                        objects.push(paqueteY); //Inserta en arreglo a devolver
                    }
                }
                paqueteY = {}; //Limpia Paquete Formado
            };
         } else {
               if (PaqueteM.hasOwnProperty(i) ) {
                    paqueteY[PaqueteM[i]] = obj[i];
                };
        }
    }
    return objects;
};
function calPorcentaje(fechaI, fechaF) {
    var dif_H = 0;
    var dif_F = 0;
    var porcentaje = 0;
    if ( vHoy > fechaI) {
        if (vHoy > fechaF) {
            dif_H = fechaF.getTime() - fechaI.getTime();
        } else {
            dif_H = vHoy.getTime() - fechaI.getTime();
        }
    } else {
        dif_H = 0;
    };
    if ( fechaF > fechaI) {
        dif_F = fechaF.getTime() - fechaI.getTime();
    } else {
        dif_F = 0;
    }
    if ( dif_F > 0) {
        porcentaje  = Number(100 - (dif_H / dif_F * 100) ).toFixed(2);
    } else {
        porcentaje = 100.0;    
    }        
    return Number(porcentaje).toFixed(2);
}
function valorMB(ValorT) {
    var VarloN = Number(ValorT);
    ValorN = VarloN > 1024  ? Number((VarloN / 1024).toFixed(2)) : Number((VarloN).toFixed(2));
    return ValorN
}
function extiende(obj, index) {
    var dif_H = 0;
    var dif_F = 0;
    obj.Expired = obj.Expired.toUpperCase() == 'TRUE';
    // obj.QInitial = Number(obj.QInitial).toFixed(2);
    // obj.QBalance = Number(obj.QBalance).toFixed(2);
    // obj.QConsumption = Number(obj.QConsumption).toFixed(2);
    // obj.QBalanceP = Number(obj.QBalanceP).toFixed(2);


    obj.QInitial = typeof obj.QInitial !='undefined'? Number(obj.QInitial).toFixed(2):'-';
    obj.QBalance = typeof obj.QBalance!='undefined'? Number(obj.QBalance).toFixed(2):'-';
    obj.QConsumption = typeof obj.QConsumption!='undefined'? Number(obj.QConsumption).toFixed(2):'-';
    obj.QBalanceP = typeof obj.QBalanceP != 'undefined'? Number(obj.QBalanceP).toFixed(2):'-';

    
    if (obj.Type == 'PL' ) {
        obj.Start = new BillCycle(BILLCYCLEDAY);
        obj.Start = parseDate2CBS(obj.Start.fecha);
        //obj.Start = '20170707000000'
    };
    if (obj.Type == 'ILI' ) {
        bExiste = true;
        FechaSI = parseCBSDate(String(obj.Start));
        FechaSF = parseCBSDate(String(obj.End));
        //if (FechaSF > vHoy) {
        //    obj.Class = "Vigente"
        //} else {
        //    obj.Class = "Vencido"
        //}
        obj.Class = "Vencido"
        obj.QBalanceP = calPorcentaje(FechaSI, FechaSF);
        addChildren(obj);
        //Eliminar campos que no deben ir
        delete obj.Type;
        delete obj.index;
    };
}
function addChildren (servicioX) {
    //Productos que tienen SRVNAME
    Products = getObjects(Jproductos, "SRV", [servicioX.Name], 1);
    IDs = [];
    productsID = [];
    for (var PID in Products) {
        //Concatenar Productos del mismo servicio
        IDs.push(Products[PID].ProductID);
        productsID.push(Products[PID]);
    }
    if (IDs.length > 0) {
        Hijos = getObjects(IlimitadosJ, "P", IDs, 1);
        Child = false;
        for (var H in Hijos) {
            if (H == 0) {
                servicioX.Child = [];
            }
            //TODO: Vigilar que Hijo esté entre las fechas de Servicio
            FechaPI = parseCBSDate(String(Hijos[H].Start))
            FechaPF.setTime(FechaPI.getTime()+(Hijos[H].Vigencia * 60 * 1000));
            if (FechaPF >= FechaSI) {
                Child = true;
                //Agregar Campos del Child, similar al Padre, Se debe usar Servicio?
                Hijos[H].Name = productsID[Hijos[H].index].PName
                if (FechaPF > vHoy) {
                    Hijos[H].Expired = false;
                    if (FechaPI > vHoy) {
                        Hijos[H].Class = "Pendiente"
                    } else {
                        Hijos[H].Class = "Vigente"
                    }
                } else {
                    Hijos[H].Class = "Vencido"
                    Hijos[H].Expired = true;
                }       
                Hijos[H].QNAME = servicioX.QNAME
                Hijos[H].QBalanceP = calPorcentaje(FechaPI, FechaPF);
                Hijos[H].QBalance = servicioX.QBalance;
                Hijos[H].QInitial = servicioX.QInitial;
                Hijos[H].Start = parseTimeCBS(FechaPI.getTime());
                Hijos[H].End = parseTimeCBS(FechaPF.getTime());
                Hijos[H].QConsumption = servicioX.QConsumption;
                //eliminar Campos que no se usan
                delete Hijos[H].ProductID;
                delete Hijos[H].Vigencia;
                delete Hijos[H].index;
                servicioX.Child.push(Hijos[H]);
            }
        }
        if (!Child) { // No tiene hijos
            delete servicioX.Child;
        }
    }
}
function extiendeH(obj) {
    obj.Expired = true;
    //obj.QInitial = Number(obj.QInitial).toFixed(2);
    //obj.QBalance = Number(obj.QBalance).toFixed(2);
    //obj.QConsumption = Number(obj.QConsumption).toFixed(2);
    obj.QInitial = valorMB(obj.QInitial);//Number(obj.QInitial).toFixed(2);
    obj.QBalance = valorMB(obj.QBalance);//Number(obj.QBalance).toFixed(2);
    obj.QConsumption = valorMB(obj.QConsumption);//Number(obj.QConsumption).toFixed(2);
    obj.QBalanceP = (obj.QBalance / obj.QInitial * 100).toFixed(2);
}
function sortByValue(jsObj){
      var sortedArray = [];
      for(var i in jsObj)
      {
        sortedArray.push([jsObj[i].Id, jsObj[i]]);
    }
    return sortedArray.sort();
}
function parseMSDate(Texto) {
    var FechaD = new Date();
    var tAnio = Texto.substr(6, 4);
    //var tMes = Number(Texto.substr(4,2))-1 ;
    var tMes = Number(Texto.substring(0, 2)) - 1;
    var tDia = Texto.substr(3, 2);
    var tHora = Texto.substr(11, 2);
    var tMinutos = Texto.substr(14, 2);
    var tSegundos = Texto.substr(17, 2);
    FechaD.setFullYear(tAnio);
    FechaD.setMonth(tMes);
    FechaD.setDate(tDia);
    FechaD.setHours(tHora);
    FechaD.setMinutes(tMinutos);
    FechaD.setSeconds(tSegundos);
    return FechaD;
};
function BillCycle(Day) {
    if (!isNaN(Day)) {
        this.day = Day
        if ((this.day > 31) || (this.day < 1)) {
            this.day = 1;
        }
        this.fecha = addMonth(vHoy.getTime() ,this.day);
    }
}
function lastDay (tiempoX) {
  var fechaT = new Date()
  fechaT.setTime(tiempoX)
  fechaT.setDate(1) //Set al dia 1 del mes
  fechaT.setMonth(fechaT.getMonth() + 1) 
  fechaT.setDate(0) //Pone el ultimo dia del mes anterior
  return Number(fechaT.getDate())
}
function addMonth (tiempoX, diaX) {
  var fechaX = new Date()
  var fechaT = new Date()
  var lastT = 0
  fechaX.setTime(tiempoX)
  fechaT.setTime(fechaX.getTime())
  lastT = lastDay(fechaT.getTime())
  if (lastT >= diaX) {
    fechaT.setDate(diaX) //Elevar al dia del corte
    if (fechaT <= fechaX) {
        fechaT.setDate(lastT) //Elevar al ultimo dia del mes
        fechaT.setDate(fechaT.getDate() + 1) //Sumar 1 dia para pasar al sigiuente Mes
        if (diaX > 1 ) {
          fechaT = addMonth(fechaT.getTime(), diaX) //Sumar 1 mes
        }
    //} else {
    //  fechaT.setUTCDate(lastT) // Dejarla en el ultimo de este mes
    }
  }
  return fechaT
}