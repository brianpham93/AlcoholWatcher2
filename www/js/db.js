// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Populate the database
//
function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS DEMO');
	alert('start populate');
    tx.executeSql('CREATE TABLE IF NOT EXISTS COCKTAILS (id unique, aName, aCategory, aImg, aLocation)');
    tx.executeSql('INSERT INTO COCKTAILS (id, aName, aCategory, aImg, aLocation) VALUES (1, "Name" , "whishkey", "name.jpg" , "bangkok")');
	alert('done populate');
    //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// Query the database
//
function queryDB(tx) {
	alert('queryDB');
    tx.executeSql('SELECT * FROM COCKTAILS', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	alert('querySuccess');
    var len = results.rows.length;
	alert(len);
    //("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        document.write("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
    }
}

// Transaction error callback
//
function errorCB(err) {
		//alert('errorCB');
		alert("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
	alert('successCB');
    var db = window.openDatabase("Database", "1.0", "Database", 200000);
    db.transaction(queryDB, errorCB);
}

// device APIs are available
//
function onDeviceReady() {
	alert('ondeviceready');
    var db = window.openDatabase("Database", "1.0", "Database", 200000);
    db.transaction(populateDB, errorCB, successCB);
}