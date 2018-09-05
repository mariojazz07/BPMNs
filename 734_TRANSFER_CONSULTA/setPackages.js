
var packages = new Object();

if(typeof(packageWallet) != 'undefined'){
    packInstances = getSortedItems(snatchInstances(packageWallet.FreeUnitItemDetail, bundlePackChildOffers, false, true, true));
    tmpInstances = splitInstances(packInstances, activePackSeq);
    packages = setPackage(tmpInstances);
} else {
    packages.active = new Object();
    packages.queued = new Array();
}