/*****************************Addons CBS************************/
var addons = new Object();
var addonsT2 = new Object();
if (vSubscriberType != 'PRE') {
    if (typeof (addonWallet) != 'undefined') {
        if (typeof vAddonRetOffering != 'undefined') {
            activeAddSeq = vAddonRetOffering;
        } else {
            activeAddSeq = '';
        }
        addInstances = getSortedItems(snatchInstances(addonWallet.FreeUnitItemDetail, bundlePackChildOffers, false, true, true));
        tmpInstances_add = splitInstancesAddons(addInstances, activeAddSeq);
        addons = setAddCBS(tmpInstances_add, planBillCycle);
        addonsT2 = setRetAddon(tmpInstances_add);
    }
}
/**************************************************************/