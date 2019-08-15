var FechaSI = new Date();
var FechaSF = new Date();
var servicios = [];
var Products = [];
var quotas =[];
var ServiciosPCC;
var Bill
if(typeof vPaqInfo != 'undefined'){
    ServiciosPCC = JSON.parse(vPaqInfo);
    if (ServiciosPCC.getSubscriberAllInfResponse.result.resultCode == 0) {
        servicios = getObjects(ServiciosPCC.getSubscriberAllInfResponse.result.subscriber,"USRBILLCYCLEDATE",[],1 );
        //Bill = new BillCycle(servicios[0].BillCycleDate)
        BILLCYCLEDAY =  String(servicios[0].BillCycleDate) //Bill.fecha        
        servicios = getObjects(ServiciosPCC.getSubscriberAllInfResponse.result.subscribedService, "SRVNAME",  [], 1);
        for (var i in servicios) {
            Quotas = getObjects(ServiciosPCC.getSubscriberAllInfResponse.result.subscriberQuota, "SRVNAME", [servicios[i].Name], 1);
            if (Quotas != undefined) {
                for (var key in Quotas[0]) {
                    servicios[i][key] = Quotas[0][key];
                }
            }
            if (servicios[i].Type == 'ILI') {
                if ((eval(servicios[i].Name) != undefined)  && eval(servicios[i].Name).length > 0) {
                    IlimitadosJ = JSON.parse(eval(servicios[i].Name));
                } else {
                    IlimitadosJ = []
                }
            } else {
                IlimitadosJ = []
            }
            extiende(servicios[i], i); //Agrega campos
            if (servicios[i].Name != 'Base_Service_OCS') {
                NexusPCC.Services.push(servicios[i]);
            }    
        };
    }
}
paqueteY = {};
//********************************************* */
SERVICES = JSON.stringify(NexusPCC);