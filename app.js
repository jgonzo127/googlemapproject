$(document).ready(function(){

 
  var address = $('#search').val();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions;
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        
  //load map on refresh
   var initialize = function() {
          var latlng = new google.maps.LatLng(31.889262, -6.469089);
          var geocoder = new google.maps.Geocoder();
          var mapOptions = {
            zoom: 2,
            center: latlng
          }
          var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          
        };

        google.maps.event.addDomListener(window, 'load', initialize);
  
 // main function
 

          function poiRequest() {
            var address = $('#search').val();
            var map;
            var infowindow;
            var geocoder = new google.maps.Geocoder();

              map = new google.maps.Map(document.getElementById('map-canvas'), {
                center: new google.maps.LatLng(37.7749295,-122.41941550000001),
                zoom: 12
              });
//takes input string and converts it to coords
            geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
             var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
            });
    
             var geo = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
//data request              
              
             
              var request = {
                location: geo,
                radius: 10000,
                types: ['bar','park','landmark','zoo', 'stadium','aquarium', 'restaurant', 'university', 'airport', 
                'library', 'shopping_mall', 'casino', 'amusement_park', 'food', 'church']
              };
              

           
//makes markers for searches
               function callback(results, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  createMarker(results[i]);
                }
              }
            }

              infowindow = new google.maps.InfoWindow();
              var service = new google.maps.places.PlacesService(map);
              service.nearbySearch(request, callback);

            function createMarker(place) {
              var placeLoc = place.geometry.location;
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });
       //append retrieved images to page         
                 //console.log('%cPlace', 'background: #222; color: #bada55');
            
                  if(place.photos) {
                    //console.log(place);
                    var photoUrlThumb = place.photos[0].getUrl({maxWidth: 1000, minWidth:600});
                    var photoUrl = place.photos[0].getUrl({maxWidth: 2000, minWidth:1600});
                    $('.imgs').append("<a id='img' href='" + photoUrlThumb + "'><img class='pic' src='"+photoUrlThumb+"'/></a>").css({'width': '400px'});

                  }

                   		 //show pictures fullscreen on click
                      $('.imgs #img').each( function() {
                        $(this).fancybox();
                      });
               
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
              });
            }
          }
        });
      }
 
 //runs a search on the map
  $('form').on('submit', function(e) {
    if ($('#search').val() === "") {
    return; 
  } else {
    e.preventDefault();
    
    poiRequest();

    $('.fullscreen > .pic').remove();
    $('.scroll , #left, #right').show();
    $('.pic').remove();
    //$("html, body").animate({ scrollTop: $("#scroll").offset().top }, 500);
     }
 });

});

        




  



 