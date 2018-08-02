

//////////GENERAL////////
var refGeneral = 'users/pepito2/General'
var refBathrooms = 'users/pepito2/Bathrooms/'
var refCookings = 'users/pepito2/Cookings/'
var refLivingRooms = 'users/pepito2/LivingRooms/'
var refRooms = 'users/pepito2/Rooms/'

var refSensorDht11 = 'users/pepito2/Sensors/dht11/'
var refSensorMQ135 = 'users/pepito2/Sensors/mq135/'
var refSensorPir = 'users/pepito2/Sensors/pir/'


const auth = firebase.auth();
const promise = auth.signInWithEmailAndPassword('userPru2@gmail.com', 'pepito1234');
promise.catch(e => console.log(e.message));


var dbGeneral = firebase.database().ref(refGeneral);

var dbLivingRooms0 = firebase.database().ref(refLivingRooms+'0');

var dbCookings0 = firebase.database().ref(refCookings+'0');

var dbRooms0 = firebase.database().ref(refRooms+'0');
var dbRooms1 = firebase.database().ref(refRooms+'1');
var dbRooms2 = firebase.database().ref(refRooms+'2');

var dbBathrooms0 = firebase.database().ref(refBathrooms+'0');

var dbSensorDht11 = firebase.database().ref(refSensorDht11);
var dbSensorMQ135 = firebase.database().ref(refSensorMQ135);
var dbSensorPir = firebase.database().ref(refSensorPir);








// General
dbGeneral.on('value', function (data) {
  $("#lightCorridor").prop('checked', data.val().lightCorridor);
  $("#frontDoor").prop('checked', data.val().frontDoor);
  $("#garageDoor").prop('checked', data.val().garageDoor);
});

// LivingRooms 0
dbLivingRooms0.on('value', function (data) {
  $("#livingRooms0Gate").prop('checked', data.val().door);
  $("#livingRooms0Light").prop('checked', data.val().light);
});

// Cookings 0
dbCookings0.on('value', function (data) {
  $("#cookings0Gate").prop('checked', data.val().door);
  $("#cookings0Light").prop('checked', data.val().light);
});


// Rooms 0
dbRooms0.on('value', function (data) {
  $("#rooms0Gate").prop('checked', data.val().door);
  $("#rooms0Light").prop('checked', data.val().light);
});

// Rooms 1
dbRooms1.on('value', function (data) {
  $("#rooms1Gate").prop('checked', data.val().door);
  $("#rooms1Light").prop('checked', data.val().light);
});

// Rooms 2
dbRooms2.on('value', function (data) {
  $("#rooms2Gate").prop('checked', data.val().door);
  $("#rooms2Light").prop('checked', data.val().light);
});

// Bathrooms 0
dbBathrooms0.on('value', function (data) {
  $("#bathrooms0Gate").prop('checked', data.val().door);
  $("#bathrooms0Light").prop('checked', data.val().light);
});


// Sensors
dbSensorDht11.on('value', function (data) {
  
  $('#dht11Temperature').html(data.val().temperature)
  $('#dht11Humidity').html(data.val().humidity)

});

dbSensorMQ135.on('value', function (data) {
  $("#mq135GAS").prop('checked', data.val().gas);
});

dbSensorPir.on('value', function (data) {
  $("#pirIsActive").prop('checked', data.val().isActive)
  $("#pirSteal").html(data.val().steal) 
});






// General 
$("#lightCorridor").click(function () {
  var estado = $(this).is(':checked');
  dbGeneral.update({
    lightCorridor: estado
  });
});

$("#frontDoor").click(function () {
  var estado = $(this).is(':checked');
  dbGeneral.update({
    frontDoor: estado
  });
});

$("#garageDoor").click(function () {
  var estado = $(this).is(':checked');
  dbGeneral.update({
    garageDoor: estado
  });
});

// LivingRooms 0
$("#livingRooms0Gate").click(function () {
  var estado = $(this).is(':checked');
  dbLivingRooms0.update({
    door: estado
  });
});

$("#livingRooms0Light").click(function () {
  var estado = $(this).is(':checked');
  dbLivingRooms0.update({
    light: estado
  });
});

// Cookings 0

$("#cookings0Gate").click(function () {
  var estado = $(this).is(':checked');
  dbCookings0.update({
    door: estado
  });
});

$("#cookings0Light").click(function () {
  var estado = $(this).is(':checked');
  dbCookings0.update({
    light: estado
  });
});


// Rooms 0
$("#rooms0Gate").click(function () {
  var estado = $(this).is(':checked');
  dbRooms0.update({
    door: estado
  });
});

$("#rooms0Light").click(function () {
  var estado = $(this).is(':checked');
  dbRooms0.update({
    light: estado
  });
});

// Rooms 1
$("#rooms1Gate").click(function () {
  var estado = $(this).is(':checked');
  dbRooms1.update({
    door: estado
  });
});

$("#rooms1Light").click(function () {
  var estado = $(this).is(':checked');
  dbRooms1.update({
    light: estado
  });
});

// Rooms 2
$("#rooms2Gate").click(function () {
  var estado = $(this).is(':checked');
  dbRooms2.update({
    door: estado
  });
});

$("#rooms2Light").click(function () {
  var estado = $(this).is(':checked');
  dbRooms2.update({
    light: estado
  });
});


// Bathrooms 0
$("#bathrooms0Gate").click(function () {
  var estado = $(this).is(':checked');
  dbBathrooms0.update({
    door: estado
  });
});

$("#bathrooms0Light").click(function () {
  var estado = $(this).is(':checked');
  dbBathrooms0.update({
    light: estado
  });
});


//sensors


$("#pirIsActive").click(function () {
  var estado = $(this).is(':checked');
  dbSensorPir.update({
    isActive: estado
  });
});
