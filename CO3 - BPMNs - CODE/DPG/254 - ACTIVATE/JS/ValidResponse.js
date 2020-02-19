var vRefundResp='';
var vResultCode='';
var vResultDesc='';
var vIsOK=false;

if(typeof vRefundResponse != undefined){
    vRefundResp=getJSON(vRefundResponse);
    vResultCode=vRefundResp.RefundResultMsg.ResultHeader.ResultCode;
    vResultDesc=vRefundResp.RefundResultMsg.ResultHeader.ResultDesc;
}

if(vResultCode=='0'){
    vIsOK=true;
}

