// JavaScript Document
// Wait for PhoneGap to load
var db = null;
var dbCreated = false;
var itemName = GET.name;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	db = window.openDatabase("DB4", "1.0", "DB4", 2000);
	db.transaction(getLocation, errorCB);		
}

function getLocation(tx){
	var sql = "select * from COCKTAIL where cName = '" + itemName + "'";
	tx.executeSql(sql, [] , getLocation_success);
}

function getLocation_success(tx, results){
	//alert('get location success');
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		var record = results.rows.item(i);
		alert('before function');
		getDetails(record.cLatitude,record.cLongtitude,record.cName);
		//$('#locationList').append('<li><a href="detail.html?name=' + record.cName + '&longtitude='+ record.cLongtitude +'"><p>' + record.cLongtitude + " " + record.cLatitude +'</p></li>');
	}
}
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB() {
	//dbCreated= true;
}

function getDetails(xlatitude, xlongitude,xname) {
//alert('get detail loaded');
alert('start get detail');
var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + xlatitude + "," + xlongitude + "&sensor=true";
alert('before getson');
$.getJSON(url, function (data) {
	//alert('before get add');
	var formatted_address = data['results'][0]['formatted_address'];
	alert(formatted_address);
	$('#locationList').append('<li><a href="detail.html?name=' + xname + '&longtitude='+ xlongitude +'"><p>' + formatted_address +'</p></li>');
});
}


window.onload = function () {
    if(! window.device)
        onDeviceReady()
}
// JavaScript Document