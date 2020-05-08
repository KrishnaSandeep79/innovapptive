$(document).ready(function(){
    var location =function(){
        var pos;
        console.log("f");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            $.ajax({
                type: 'POST',
                url: '/login',
                data: pos,
                complete:function()
                {
                    window.location.href = '/show';
                },
                error:function()
                {
                    alert("error");
                }
              });
            //   location.reload();
              return false;
         }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        }
    };
    var myVar,myVar2;
    $('#start').on('click',function(){
         myVar = setInterval(location,5000);
         //myVar2=setInterval('location.reload()',5000);
         console.log('e');
    });
    $('#stop').on('click',function(){
        console.log("d");
        clearInterval(myVar);
        //clearInterval(myVar2);
    });
});