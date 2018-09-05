/*****************************Addons CBS************************/
if (typeof vHasAddons == 'undefined') {
    var addons = new Object();
} 
if (typeof vHasAddonsT2 =='undefined') {
    var addonsT2 = new Object();
}

if (vSubscriberType != 'PRE') {
    if (typeof (addonWallet) != 'undefined') {
        if (typeof vAddonRetOffering != 'undefined') {
            activeAddSeq = vAddonRetOffering;
        } else {
            activeAddSeq = '';
        }
        addInstances = getSortedItems(snatchInstances(addonWallet.FreeUnitItemDetail, bundlePackChildOffers, false, true, true));
        tmpInstances_add = splitInstancesAddons(addInstances, activeAddSeq);

        if (typeof vHasAddons =='undefined'){
            addons = setAddCBS(tmpInstances_add, planBillCycle);
        }else if(!vHasAddons){
            addons = setAddCBS(tmpInstances_add, planBillCycle);
        }
        
        if (typeof vHasAddonsT2 == 'undefined') {
            addonsT2 = setRetAddon(tmpInstances_add);
        }else if(!vHasAddonsT2){
            addonsT2 = setRetAddon(tmpInstances_add);
        }
    }
}
/**************************************************************/
