// JavaScript Document
// Wait for PhoneGap to load
var db = null;
var dbCreated = false;
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
	db = window.openDatabase("DB4", "1.0", "DB4", 2000);
	db.transaction(populateDB, errorCB, successCB);
	db.transaction(getAlcohol, errorCB);		
}

function getAlcohol(tx){
	var sql = "select distinct cName from COCKTAIl where cCategory = 'champagne'";
	tx.executeSql(sql, [] , getAlcohol_success);
}

function getAlcohol_success(tx, results){

	var len = results.rows.length;
	//alert(len);
	for (var i=0; i<len; i++){
		var alcohol = results.rows.item(i);
		//alert('before append');
		$('#champagneList').append('<li><a href="location.html?name=' + alcohol.cName + '">' +
				'<p>' + alcohol.cName + '</p></li>');
		
		//s += "<li><p>" + alcohol.cName + "</li>";
	}
	
	//alert('before append');
}
// Populate the database 
//
function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS COCKTAIL (id primary key, cName varchar(50), cCategory varchar(50), cImg varchar(50), cLongtitude varchar(50), cLatitude varchar(50))');
	 
	 dbCreated = true;
}

// Transaction error callback
//
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
	//dbCreated= true;
	//alert("success!");
}

function insert() {
	 // tx.executeSql('DROP TABLE IF EXISTS DEMO');
	
	 // tx.executeSql('CREATE TABLE IF NOT EXISTS air (id unique, data)');
	db.transaction(function(tx){
		 
	var id = document.getElementById("id").value;

	var cName = document.getElementById("cName").value;

	var cCategory = document.getElementById("cCategory").value;

	var cImg = document.getElementById("cImg").value;

	var cLongtitude = document.getElementById("cLongtitude").value;

	var cLatitude = document.getElementById("cLatitude").value;

	tx.executeSql('INSERT INTO COCKTAIL (id, cName, cCategory, cImg, cLongtitude, cLatitude) VALUES (?,?,?,?,?,?)',[id,cName,cCategory,cImg,cLongtitude,cLatitude],successCB, errorCB);

   });
}


// JavaScript Document