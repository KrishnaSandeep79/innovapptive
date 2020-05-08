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
    setTimeout(location,10000);
    $('#stop').on('click',function(){
        clearTimeout();
        window.location.href = '/';
    });
});