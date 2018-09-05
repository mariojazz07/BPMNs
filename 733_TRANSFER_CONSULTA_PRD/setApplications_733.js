var applications = {active: [], queued: []};

var appOffers;

var tmpApp = {active: [], queued: []};

var tmpItem;



if(enrichedOfferings.appOfferings.length > 0){

    if(vUnifyApps){

        if(navObject.pccJson.filled){

            if(typeof(navObject.pccJson.obj.Applications) != 'undefined'){

                for(var i = 0; i < navObject.pccJson.obj.Applications.length; i++){

                    tmpItem = new Object();

                    tmpItem.EffectiveTime = String(navObject.pccJson.obj.Applications[i].ServiceStartDate);

                    tmpItem.ExpirationTime = String(navObject.pccJson.obj.Applications[i].ServiceEndDate);

                    tmpItem.offerName = navObject.pccJson.obj.Applications[i].ProductName;

                    

                    tmpApp.active.push(tmpItem);

                }

                

                applications = setApplications(tmpApp);

            }

        }

    } else {

        activeAppsSeq = getActiveApps(splitApps(enrichedOfferings.appOfferings));

        LOGGER.info('active apps: ' + activeAppsSeq.join());

        appOffers = snatchInstances(enrichedOfferings.appOfferings, bundleAppChildOffers, false, false, true);

        LOGGER.info('appOffers: ' + JSON.stringify(appOffers));

        applications = setApplications(splitOffers(splitApps(appOffers), activeAppsSeq));

    }

}

