	var id = "";
    var longitude = "";
    var latitude = "";

    function getImage() {
        id = GET.id;
        longitude = GET.longitude;
        latitude = GET.latitude;
        db = window.openDatabase("DB6", "1.0", "DB6", 2000);
        db.transaction(getAlcohol, errorCB);
    }

    function getAlcohol(tx) {
        var sql = "select distinct cImg from COCKTAIL where id = '" + id + "'";
        tx.executeSql(sql, [], getAlcohol_success);
    }

    function getAlcohol_success(tx, results) {
        var len = results.rows.length;
        var img;
        for (var i = 0; i < len; i++) {
            var alcohol = results.rows.item(i);
            img = alcohol.cImg;
        }
        var path = /file:\/\/.*?(\/.*)/.exec(img)[1];
        $('#img').attr('src', path);
        getDetails(latitude, longitude);
    }

    function errorCB(err) {
        alert("Error : " + err);
    }

     function getDetails(xlatitude, xlongitude) {
        //alert('get location detail loaded');
        var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + xlatitude + "," + xlongitude + "&sensor=true";
        //alert(url);
        $.getJSON(url, function (data) {
            var formatted_address = data['results'][0]['formatted_address'];
            //alert(formatted_address);
            $("#location").html('<a href="#" class="btn" onclick="drawMap('+xlatitude+', '+xlongitude+');">Show map</a>');
        });
    }

    function drawMap(latitude, longitude) {
        //alert('draw map loaded');
        var centerLocation = new google.maps.LatLng(latitude, longitude);
        //alert(centerLocation);

        var myOptions = {
            center: centerLocation,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map_element = document.getElementById("map_canvas");
        map = new google.maps.Map(map_element, myOptions);
        //alert('ok');
        var marker = new google.maps.Marker({
            position: centerLocation,
            title: "My Current Location!"
        });
        //alert('before set map');
        marker.setMap(map);
        
        var mapwidth = $(window).width();
        var mapheight = $(window).height();
        $("#map_canvas").height('400px');
        $("#map_canvas").width('400px');
        google.maps.event.trigger(map, 'resize');
    }

    window.onload = function () {
        if (!window.device)
            getImage();
    }// JavaScript Document