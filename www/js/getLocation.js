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
	alert('get location success');
	var len = results.rows.length;
	alert(len);
	for (var i=0; i<len; i++){
		var record = results.rows.item(i);
		//alert('before append');
		$('#locationList').append('<li><a href="detail.html?name=' + record.cName + '&location='+ record.cLongtitude +'"><p>' + record.cLongtitude + " " + record.cLatitude +'</p></li>');
	}
}
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB() {
	//dbCreated= true;
	alert("success!");
}

window.onload = function () {
    if(! window.device)
        onDeviceReady()
}