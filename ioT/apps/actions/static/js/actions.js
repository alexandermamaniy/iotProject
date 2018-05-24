// último estado

/////SALA///////////
var dbs = firebase.database().ref('Sala');
dbs.on('value', function (data) {
$("#checkLucesS").prop('checked', data.val().LucesS);

$("#checkVentS").prop('checked', data.val().VentS);

$("#checkWinS").prop('checked', data.val().WinS);

});
///////////////

//////////GENERAL////////
var dbg = firebase.database().ref('General');

dbg.on('value', function (data) {
$("#checkLucesFront").prop('checked', data.val().LucesFront);

$("#checkPuertaP").prop('checked', data.val().PuertaP);
$("#checkPuertaT").prop('checked', data.val().PuertaT);
});
////////////////////

/////////////COCINA/////////

var dbc = firebase.database().ref('Cocina');
dbc.on('value', function (data) {
$("#checkLucesCS").prop('checked', data.val().LucesCS);

$("#checkVentC").prop('checked', data.val().VentC);

});

///////////////////////

/////////////RECAMARA 1/////////

var dbr1 = firebase.database().ref('Recamara 1');
dbr1.on('value', function (data) {
$("#checkLucesR1").prop('checked', data.val().LucesR1);

$("#checkVentR1").prop('checked', data.val().VentR1);


$("#checkWinR1").prop('checked', data.val().WinR1);

});

///////////////////////

/////////////RECAMARA 2/////////

var dbr2 = firebase.database().ref('Recamara 2');
dbr2.on('value', function (data) {
$("#checkLucesR2").prop('checked', data.val().LucesR2);

$("#checkVentR2").prop('checked', data.val().VentR2);


$("#checkWinR2").prop('checked', data.val().WinR2);
});

///////////////////////


/////////////CUARTO DE SERVICIO/////////

var dbcs = firebase.database().ref('Cuarto de Servicio');
dbcs.on('value', function (data) {
$("#checkLucesServ").prop('checked', data.val().LucesServ);
});

///////////////////////

/////////////BAÑO/////////

var dbb = firebase.database().ref('Bano');
dbb.on('value', function (data) {
$("#checkLucesB").prop('checked', data.val().LucesB);



});

///////////////////////





////////LUCES//////////
$("#checkLucesR1").click(function () {
var estado = $(this).is(':checked');
dbr1.update({
  LucesR1: estado
});
});

$("#checkLucesR2").click(function () {
var estado = $(this).is(':checked');
dbr2.update({
  LucesR2: estado
});
});

$("#checkLucesB").click(function () {
var estado = $(this).is(':checked');
dbb.update({
  LucesB: estado
});
});

$("#checkLucesServ").click(function () {
var estado = $(this).is(':checked');
dbcs.update({
  LucesServ: estado
});
});

$("#checkLucesFront").click(function () {
console.log("se preciona las luces");
var estado = $(this).is(':checked');
dbg.update({
  LucesFront: estado
});
});


$("#checkLucesCS").click(function () {
var estado = $(this).is(':checked');
dbc.update({
  LucesCS: estado
});
});


$("#checkLucesS").click(function () {
var estado = $(this).is(':checked');
dbs.update({
  LucesS: estado
});
});
//////////////

////VENTILADORES////
$("#checkVentR1").click(function () {
var estado = $(this).is(':checked');
dbr1.update({
  VentR1: estado
});
});

$("#checkVentR2").click(function () {
var estado = $(this).is(':checked');
dbr2.update({
  VentR2: estado
});
});

$("#checkVentC").click(function () {
var estado = $(this).is(':checked');
dbc.update({
  VentC: estado
});
});



$("#checkVentS").click(function () {
var estado = $(this).is(':checked');
dbs.update({
  VentS: estado
});
});
///////////////

/////VENTANAS/////

$("#checkWinR1").click(function () {
var estado = $(this).is(':checked');
dbr1.update({
  WinR1: estado
});
});

$("#checkWinR2").click(function () {
var estado = $(this).is(':checked');
dbr2.update({
  WinR2: estado
});
});




$("#checkWinS").click(function () {
var estado = $(this).is(':checked');
dbs.update({
  WinS: estado
});
});

////////////

//////////Puertas////

$("#checkPuertaP").click(function () {
var estado = $(this).is(':checked');
dbg.update({
  PuertaP: estado
});
});


$("#checkPuertaT").click(function () {
var estado = $(this).is(':checked');
dbg.update({
  PuertaT: estado
});
});

//////////////