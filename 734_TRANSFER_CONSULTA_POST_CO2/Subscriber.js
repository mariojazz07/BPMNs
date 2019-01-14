var typeSubscriber = 'PRE,HIC,CIN,HIB,HIB20,POS';
var vSubscriberFound = false;

if(typeof vSubscriberType != 'undefined'){
    if(typeSubscriber.indexOf(vSubscriberType) < 0){
        vSubscriberType = 'POS';
    }
    if(vSubscriberType == 'CIN'){
        vSubscriberType = 'HIC';
    }
    vSubscriberFound = true;
}


