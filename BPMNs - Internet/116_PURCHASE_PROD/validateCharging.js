var hasBalance = false;



if(passBy){

    hasBalance = true;

} else {

    if(typeof AddSuplementaryOfferingTask__platformErrorCode != 'undefined'){

        hasBalance = AddSuplementaryOfferingTask__platformErrorCode == '0';

    } else {

        hasBalance = true;

    }

}