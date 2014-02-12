var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
	alert('device ready');
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}
function getImgURL(){
	alert('getURL');
	var src = document.getElementById("photo").getAttribute("src");
	alert('getPhoto done');
	document.getElementById("photoURL").innerHTML = src;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64-encoded image data
  // console.log(imageData);
  // Get image handle
  //
  alert('onPhotoDataSuccess');
  var capturedPhoto = document.getElementById('photo');

  // Unhide image elements
  alert('get element done');
  capturedPhoto.style.display = 'inherit';
  alert('set style done');

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  capturedPhoto.src = "data:image/jpeg;base64," + imageData;
  alert('set src done');
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'inherit';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  alert('capturePhoto() loaded');
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100,destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}// JavaScript Document

window.onload = function () {
    if(! window.device)
        onDeviceReady()
    }