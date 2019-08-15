var vSubscriberFound = false;
var vPrepaid = false;
var vPostpaid = false;
var vHybrid = false;
var vPaymentType = '0';
var vPreType = 'PRE';
//var vPosType = 'POS,NRM,EMP,';
var vHibType = 'HIB,HIC,CIN';




if (typeof vAS400SubType != 'undefined') {

	vSubscriberFound = true;



	if (vPreType.indexOf(vAS400SubType) != -1) {

		vPrepaid = true;
		vPaymentType = '0';

	}
	else if (vHibType.indexOf(vAS400SubType) != -1) {

		vHybrid = true;
		vPaymentType = '2';
	}
	else{
		
		vPostpaid = true;
		vPaymentType = '1';

	}
	}









