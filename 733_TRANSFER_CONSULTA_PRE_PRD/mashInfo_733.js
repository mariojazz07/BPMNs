var BPMN_RESPONSE_CODE = '0';

var BPMN_RESPONSE_MESSAGE = 'Operation Successful';

var servicesObj = {services: new Object()};

var JSON_RESPONSE = '';



servicesObj.services.bundles = bundles;

servicesObj.services.packages = packages;

servicesObj.services.subscriptions = subscriptionItems;

servicesObj.services.applications = applications ;

servicesObj.services.addons = addons;

servicesObj.services.addons_t2 = addonsT2;

servicesObj.services.plan = plan;

servicesObj.services.user = user;



JSON_RESPONSE = JSON.stringify(servicesObj);