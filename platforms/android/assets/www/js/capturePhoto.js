var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}
function getImgURL(){
	var src = document.getElementById("photo").getAttribute("src");
	return src;
	//document.getElementById("photoURL").innerHTML = src;
}

function onPhotoURISuccess(imageURI) {
  var largeImage = document.getElementById('photo');

  largeImage.style.display = 'compact';
  largeImage.src = imageURI;
}

function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100,destinationType: destinationType.FILE_URI });
}

function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

function onFail(message) {
  alert('Failed because: ' + message);
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function saveToDB(){
	var id = getRandomInt(1,1000000);
	//alert(id);
	var name = GET.aName;
	//alert(name);
	var category = GET.category;
	//alert(category);
	var imgUrl = getImgURL();
	//alert(imgUrl);
	var plongtt = document.getElementById("longtt").innerHTML;
	//alert(plongtt);
	var platt = document.getElementById("latt").innerHTML;
	//alert(platt);
	insertIntoDB(id,name,category,imgUrl,plongtt,platt);
}
function insertIntoDB(id,cName,cCategory,cImg,cLongtitude,cLatitude){
	//alert('open db');
	db = window.openDatabase("DB4", "1.0", "DB4", 2000);
	//alert('start insert');
	db.transaction(function(tx){
	tx.executeSql('INSERT INTO COCKTAIL (id, cName, cCategory, cImg, cLongtitude, cLatitude) VALUES (?,?,?,?,?,?)',[id,cName,cCategory,cImg,cLongtitude,cLatitude],successCB, errorCB);
//alert(tx);
});
}
function successCB(){
	alert('done');
}
function errorCB(err){
	alert(err);
}
window.onload = function () {
    if(! window.device)
        onDeviceReady()
    }