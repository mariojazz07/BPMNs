var bundlePackOffers = new Array();
var bundlePlanOffers=new Array();
var bundleAppOffers = new Array();
var bundlePackChildOffers = new Array();
var bundlePlanChildOffers=new Array();
var bundleAppChildOffers = new Array();
var bundles = new Array();
var bundle;
var bndlIdntfr = 'cmb';
var bndlPropName = 'C_REMARKS2';
var cmbOffers;

if(enrichedOfferings.cmbOfferings.length > 0 && !vSkipBundle){
    cmbOffers = enrichedOfferings.cmbOfferings;
    for(var i = 0; i < cmbOffers.length; i++){
        bundle = setItem(cmbOffers[i].OfferingKey.OfferingID, cmbOffers[i].productId, cmbOffers[i].OfferingKey.PurchaseSeq, 
                cmbOffers[i].offerName, cmbOffers[i].offerType, 'Cmb', '-', 
                '-', '-', '-', '-', '-', 'Vigente');
        bundlePackOffers = findChildren(cmbOffers[i].OfferingKey.PurchaseSeq, bndlIdntfr, enrichedOfferings.packOfferings);
        bundlePackOffers = bundlePackOffers.concat(findChildren(cmbOffers[i].OfferingKey.PurchaseSeq, bndlIdntfr, enrichedOfferings.undefOfferings));
        bundleAppOffers = findChildren(cmbOffers[i].OfferingKey.PurchaseSeq, bndlIdntfr, enrichedOfferings.appOfferings);
        //LOGGER.info('paquetes:' + bundlePackOffers.join());
        if(cmbOffers[i].isPackage){
            bundlePackOffers.push(cmbOffers[i].OfferingKey.PurchaseSeq);  
        }

        bundlePackChildOffers = bundlePackChildOffers.concat(bundlePackOffers);
        bundleAppChildOffers = bundleAppChildOffers.concat(bundleAppOffers);

        if(typeof(packageWallet) != 'undefined' && bundlePackOffers.length > 0){
            packInstances = getSortedItems(snatchInstances(packageWallet.FreeUnitItemDetail, bundlePackOffers, true, true, true));
            tmpInstances = splitInstances(packInstances, activePackSeq);
            bundle.packages = setPackage(tmpInstances);
        } else {
            bundle.packages = new Object();
        }

        if(enrichedOfferings.appOfferings.length > 0 && bundleAppOffers.length > 0){
            activeAppsSeq = getActiveApps(splitApps(enrichedOfferings.appOfferings));
            packInstances = snatchInstances(enrichedOfferings.appOfferings, bundleAppOffers, true, false, true);
            bundle.applications = setApplications(splitOffers(splitApps(packInstances), activeAppsSeq));
        } else{
            bundle.applications = new Object();
        }
        //if(bundlePackOffers.length > 0 || bundleAppOffers.length > 0){
            //bundles.push(bundle);
        //}
        var  vPushBundle = false;
        if (typeof bundle.packages.active != 'undefined' && typeof bundle.packages.active.offering != 'undefined') {
            vPushBundle = true;
        }
        if (typeof bundle.packages.queued != 'undefined') {
            if (bundle.packages.queued instanceof Array && typeof bundle.packages.queued[0] != 'undefined'){
                vPushBundle = true;
            }
            else {
                if (typeof bundle.packages.queued.offering != 'undefined') {
                    vPushBundle = true;
                }
            }
        } 
        if (typeof bundle.applications.active != 'undefined') {
            if (bundle.applications.active instanceof Array && typeof bundle.applications.active[0] != 'undefined'){
                vPushBundle = true;
            }
            else {
                if (typeof bundle.applications.active.offering != 'undefined') {
                    vPushBundle = true;
                }
            }
        }
        if (typeof bundle.applications.queued != 'undefined') {
            if (bundle.applications.queued instanceof Array && typeof bundle.applications.queued[0] != 'undefined'){
                vPushBundle = true;
            }
            else {
                if (typeof bundle.applications.queued.offering != 'undefined') {
                    vPushBundle = true;
                }
            }
        }        
        if (vPushBundle) {
            bundles.push(bundle);
        }
    }
}


function findChildren(parentOffer, idntfr, offerItem){
    var children = new Array();
    var remarkProp;
    LOGGER.info('JSON: ' + JSON.stringify(offerItem));
    for(var i = 0; i < offerItem.length; i++){
        if(typeof(offerItem[i].OInstProperty) != 'undefined' && typeof(offerItem[i].OfferingKey) != 'undefined'){
            remarkProp = getProperty(offerItem[i].OInstProperty, bndlPropName);
            LOGGER.info('remarkProp: ' + JSON.stringify(remarkProp));
            if(typeof(remarkProp) != 'undefined'){
                LOGGER.info('parentOffer: ' + parentOffer);
                if(isParent(parentOffer, idntfr, remarkProp)){
                    children.push(offerItem[i].OfferingKey.PurchaseSeq)
                }
            }
        }
    }
    return children;
}


function isParent(parentId, transIdntfr, childRemark){
    var remarkArray = childRemark.Value.split(';');
    var identifier = remarkArray[0];
    var flag = false;
    if(identifier.toLowerCase() == transIdntfr && remarkArray.length > 1){
        flag = parentId == remarkArray[1];
    }
    return flag;
}


function getProperty(propArray, propName){
    var propItem;
    if(propArray instanceof Array){
        for(var i = 0; i < propArray.length; i++){
            if(propArray[i].PropCode == propName){
                propItem = propArray[i];
                break;
            }
        }
    } else {
        if(propArray.PropCode == propName){
            propItem = propArray;
        }
    }
    return propItem;
}