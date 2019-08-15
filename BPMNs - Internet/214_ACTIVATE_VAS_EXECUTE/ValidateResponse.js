

var vDeactivated=false;
var vResponse1=false;
var vErrorDeactivateMessage='0';

if (typeof vBpmnResponseCode != 'undefined')  {

    vResponse1 = true;
if (vBpmnResponseCode == '0')   {

        vDeactivated = true;

    }
    else{
        vErrorDeactivateMessage=productId+";"+vBpmnResponseCode ;
    }

}

