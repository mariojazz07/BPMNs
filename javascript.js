var counter=2;
var vFor=0;
for(var i=0;i<counter;i++){
    vFor=i;
    sleep(5000);
    LOGGER.info("Valor del Counter:"+vFor);
}

 function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }