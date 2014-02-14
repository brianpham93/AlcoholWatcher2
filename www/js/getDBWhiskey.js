
// Wait for PhoneGap to load
var db = null;
var dbCreated = false;
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
	db = window.openDatabase("DB6", "1.0", "DB6", 2000);
	//alert('before pop');
	db.transaction(populateDB, errorCB, successCB);
	//alert('before get');
	db.transaction(getAlcohol, errorCB);		
}


function getAlcohol(tx){
	alert('before getAl');
	var sql = "select distinct cName from COCKTAIL where cCategory = 'whiskey'";
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
		$('#whiskeyList').append('<li><a href="location.html?name=' + alcohol.cName + '&category=whiskey"><p>' + alcohol.cName + '</p></li>');
	}
	
	//alert('before append');
}
// Populate the database 
//
function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS COCKTAIL (id varchar(10) primary key, cName varchar(50), cCategory varchar(50), cImg varchar(200), cLongtitude varchar(50), cLatitude varchar(50))');
	 dbCreated = true;
}

// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	alert('success');	
}

function insert() {
	alert('insert called');
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


