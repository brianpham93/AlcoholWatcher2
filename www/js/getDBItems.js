
// Wait for PhoneGap to load
var db = null;
var dbCreated = false;
document.addEventListener("deviceready", onDeviceReady, false);
var category = "";
// PhoneGap is ready
//
function onDeviceReady() {
	category = GET.cate;
	document.getElementById("h1").innerHTML = "<small style='font-size:22px;'>Cocktail with</small> " + category;
	db = window.openDatabase("DB6", "1.0", "DB6", 2000);
	//alert('before pop');
	db.transaction(populateDB, errorCB, successCB);
	//alert('before get');
	db.transaction(getAlcohol, errorCB);		
}

function randomstring(L){
    var s= '';
    var randomchar=function(){
    	var n= Math.floor(Math.random()*62);
    	if(n<10) return n; //1-10
    	if(n<36) return String.fromCharCode(n+55); //A-Z
    	return String.fromCharCode(n+61); //a-z
    }
    while(s.length< L) s+= randomchar();
    return s;
}


function getAlcohol(tx){
	var sql = "select distinct cName from COCKTAIL where cCategory = '"+category+"'";
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
		$('#itemList').append('<li><a href="location.html?name=' + alcohol.cName + '&category='+category+'"><p>' + alcohol.cName + '</p></li>');
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
	//alert('success');	
}

function insert() {
	alert('insert called');
	db.transaction(function(tx){		 
	var id = randomString(5);
	alert(id);
	var description = document.getElementById("shortDescription").value;
	alert(description);
	var class = document.getElementById("class").value;
	alert(class);
	var dueDate = document.getElementById("dueDate").value;
	alert(dueDate);
	var dueTime = document.getElementById("dueTime").value;
	alert(dueTime);
	var type = document.getElementById("type").value;
	alert(type);
	var additionalInfo = document.getElementById("additionalInfo").value;
	alert(type);
	tx.executeSql('INSERT INTO deadlines (id, description, class, dueDate, dueTime, type, additionalInfo) VALUES (?,?,?,?,?,?,?)',[id,description,class,dueDate, dueTime, type, additionalInfo],successCB, errorCB);
	alert(tx);
   });
}


// JavaScript Document