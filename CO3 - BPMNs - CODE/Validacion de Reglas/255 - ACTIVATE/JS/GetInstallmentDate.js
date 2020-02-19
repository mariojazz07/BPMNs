var vSubsJson = getJSON(SubscriberInfoJson);
var vIsOK = false;
var vTmpAccountType= vSubsJson.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Account;
if(vTmpAccountType instanceof Array){
var vTmpAccount = vSubsJson.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Account[0].AcctInfo.PaymentType;

if (vTmpAccount == '1') {
    var vBillingDay = vSubsJson.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Account[0].AcctInfo.BillCycleInfo.BillCycleType;
} else {
    var vBillingDay = vSubsJson.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Account[1].AcctInfo.BillCycleInfo.BillCycleType;
}
var vTmpInputDate = (typeof INITIAL_DATE != 'undefined') ? INITIAL_DATE : '';
if (vTmpInputDate != '') {
    var vInitDate = validateInputDate(vTmpInputDate, vBillingDay);
}
if (typeof vInitDate != 'undefined' && vInitDate == vTmpInputDate) {
    vIsOK = true;
}
}
else{
    var vTmpAccount = vSubsJson.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Account.AcctInfo.PaymentType;

    var vBillingDay = vSubsJson.QueryCustomerInfoResultMsg.QueryCustomerInfoResult.Account.AcctInfo.BillCycleInfo.BillCycleType;

var vTmpInputDate = (typeof INITIAL_DATE != 'undefined') ? INITIAL_DATE : '';
if (vTmpInputDate != '') {
    var vInitDate = validateInputDate(vTmpInputDate, vBillingDay);
}
if (typeof vInitDate != 'undefined' && vInitDate == vTmpInputDate) {
    vIsOK = true;
}

}