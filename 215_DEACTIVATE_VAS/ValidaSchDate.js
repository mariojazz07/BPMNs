var DoRemove = false;
var vSchDay = '';
var vSchMonth = '';
var vSchYear = '';
var vSchHour='';
var vSchMin='';
var vSchSec='';
var vSchTaskState = '';
var vSchTasksToRemove = new Array();
var vSchTask = '';
var vSchCounter = 0;
var vSchID = '';

if (typeof vSchJSON != 'undefined') {
	vSchTask = JSON.parse(vSchJSON);
	for (var i = 0; i < vSchTask.listSchedule.length; i++) {

		vSchTaskState = vSchTask.listSchedule[i].state;
		if (vSchTaskState == 'P') {
			vSchDay = vSchTask.listSchedule[i].creationDate.day;
			vSchMonth = vSchTask.listSchedule[i].creationDate.month;
			vSchYear = vSchTask.listSchedule[i].creationDate.year;
			vSchHour=vSchTask.listSchedule[i].creationDate.hour;
			vSchMin=vSchTask.listSchedule[i].creationDate.minute;
			vSchSec=vSchTask.listSchedule[i].creationDate.second;
			if (!CompareSchDates(vSchYear,vSchMonth,vSchDay,vSchHour,vSchMin,vSchSec)) {
				vSchTasksToRemove.push(vSchTask.listSchedule[i].scheduleId);

			}

		}
	}
}


if (typeof vSchTasksToRemove != 'undefined'){
	if(vSchTasksToRemove.length != 0) {
	vSchID = vSchTasksToRemove[vSchCounter];
	DoRemove=true;
}
}



function CompareSchDates(vYear,vMonth,vDay,vHour,vMin,vSec) {
	var vSchSysdate=new Date();
	//var vSchSysdate = parseDateToStringVAS(new Date());
	var FIVE_MIN=5*60*1000;
	var vEquals = true;
	var vSchActualDate = new Date(Number(vYear),Number(vMonth)-1,Number(vDay),Number(vHour),Number(vMin),Number(vSec));
	var vSubstraction=vSchSysdate-vSchActualDate;
	if (vSubstraction>FIVE_MIN) {
		vEquals = false;
	}

	return vEquals;
}

// function parseDateToStringVAS(date) {
// 	var day = padStr(String(date.getDate()), 2, '0', STR_PAD_LEFT);
// 	var year = date.getFullYear();
// 	var month = date.getMonth() + 1;
// 	month = padStr(String(month), 2, '0', STR_PAD_LEFT);
// 	var format = year + month + day;
// 	return format;
// }