function findMyLocation() {
    //Check the network connection
    //alert('findMyLocation loaded');
	document.getElementById("loading").innerHTML = 'Loading';
    var networkConnection = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection'
    // alert('Connection type: ' + states[networkConnection]);
    if (networkConnection != null) {
        //Find your location
        // alert('start get pos');
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            timeout: 300000,
            enableHighAccuracy: false,
            maximumAge: 90000
        });
        // alert('after get possition');
    } else {
        alert('Please check your network connection and try again.');
    }
}

function onSuccess(position) {
    //alert('succ');
	document.getElementById("loading").innerHTML = "Location loaded successfully";
    var latitude = position.coords.latitude;
    //alert(latitude);
    var longitude = position.coords.longitude;
    //alert(longitude);
    getDetails(latitude, longitude);
}

function onError(error) {
    document.getElementById("loading").innerHTML = "Request time out. Signal is too weak";
}

function getDetails(latitude, longitude) {
    //alert('get detail loaded');
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true";
    //alert(url);
    $.getJSON(url, function (data) {
        var formatted_address = data['results'][0]['formatted_address'];

		document.getElementById("longtt").innerHTML = longitude;
		document.getElementById("latt").innerHTML = latitude;

       /* //alert(formatted_address);
        htmlData = 'Latitude : ' + latitude + '';
        htmlData += 'Longitude : ' + longitude + '';
        htmlData += 'Location : ' + formatted_address;
        
        //alert(longitude);
        
        //alert(latitude);
        //alert('draw map');*/
        var centerLocation = new google.maps.LatLng(latitude, longitude);

        var myOptions = {
            center: centerLocation,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map_element = document.getElementById("map_canvas");
        map = new google.maps.Map(map_element, myOptions);

        var marker = new google.maps.Marker({
            position: centerLocation,
            title: "My Current Location!"
        });
        marker.setMap(map);

        var mapwidth = $(window).width();
        var mapheight = $(window).height();
        $("#map_canvas").height('300px');
        $("#map_canvas").width('600px');
        google.maps.event.trigger(map, 'resize');
    });
}