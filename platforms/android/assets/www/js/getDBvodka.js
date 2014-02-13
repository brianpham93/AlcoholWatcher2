
// Wait for PhoneGap to load
var db = null;
var dbCreated = false;
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
	db = window.openDatabase("DB5", "1.0", "DB5", 2000);
	db.transaction(populateDB, errorCB, successCB);
	db.transaction(getAlcohol, errorCB);		
}

function getAlcohol(tx){
	var sql = "select distinct cName from COCKTAIL where cCategory = 'vodka'";
	tx.executeSql(sql, [] , getAlcohol_success);
}

function getAlcohol_success(tx, results){
	//alert('get alcohol success');
	var len = results.rows.length;

	//alert(len);
	//var s = "";
	for (var i=0; i<len; i++){
		var alcohol = results.rows.item(i);
		//alert('before append');
		$('#vodkaList').append('<li><a href="location.html?name=' + alcohol.cName + '&category=vodka"><p>' + alcohol.cName + '</p></li>');
		
	}
	
	//alert('before append');
}
// Populate the database 
//
function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS COCKTAIL (id integer primary key, cName varchar(50), cCategory varchar(50), cImg varchar(200), cLongtitude varchar(50), cLatitude varchar(50))');
	 dbCreated = true;
}

// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	dbCreated= true;
	
}

function insert() {

	db.transaction(function(tx){
		 
	var id = document.getElementById("id").value;
	alert(id);
	var cName = document.getElementById("cName").value;
	alert(cName);
	var cCategory = document.getElementById("cCategory").value;
	alert(cCategory);
	var cImg = document.getElementById("cImg").value;
	alert(cImg);
	var cLongtitude = document.getElementById("cLongtitude").value;
	alert(cLongtitude);
	var cLatitude = document.getElementById("cLatitude").value;
	alert(cLatitude);
	tx.executeSql('INSERT INTO COCKTAIL (id, cName, cCategory, cImg, cLongtitude, cLatitude) VALUES (?,?,?,?,?,?)',[id,cName,cCategory,cImg,cLongtitude,cLatitude],successCB, errorCB);
	alert(tx);
   });
}


