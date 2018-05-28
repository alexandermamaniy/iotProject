
function sendData( message ){
    $.ajax({
        url:'ajaxData',
        type : 'get',
        data: { 'message':message },
        success : led
    });
}

function led(data){
    console.log(data);
}


////////GENERAL//////////

$("#checkLucesInterior").click(function () {
    var estado = $(this).is(':checked');
    var arrayLuces = [
                        document.getElementById("checkLucesS"),
                        document.getElementById("checkLucesR1"),
                        document.getElementById("checkLucesR2"),
                        document.getElementById("checkLucesR3"),
                        document.getElementById("checkLucesCS"),
                        document.getElementById("checkLucesB")
                    ]

    if(estado){

        for(var i=0; i< arrayLuces.length ; i++ ){
            arrayLuces[i].checked = true;
        }
        sendData("I");
    }else{
        for(var i=0; i< arrayLuces.length ; i++ ){
            arrayLuces[i].checked = false;
        }
        sendData("J");
    }
});


$("#checkAlarma").click(function () {
    var estado = $(this).is(':checked');
    if(estado){
        sendData("K");
    }else{
        sendData("L");
    }
});

$("#checkPuertaP").click(function () {
var estado = $(this).is(':checked');
    console.log("Porton principal Calle");
});


////////// SALA ////////////

$("#checkLucesS").click(function () {
var estado = $(this).is(':checked');
    sendData("G");
});



$("#checkPuertaS").click(function () {
var estado = $(this).is(':checked');
    console.log("puerta de la sala");
});


///////// RECAMARA 1 ////////

$("#checkLucesR1").click(function () {
var estado = $(this).is(':checked');

    sendData("A");
});

$("#checkPuertaR1").click(function () {
var estado = $(this).is(':checked');
    console.log("puerta de Recamara 1");
});


////////// RECAMARA 2 //////////

$("#checkLucesR2").click(function () {
var estado = $(this).is(':checked');
    sendData("B");
});

$("#checkPuertaR2").click(function () {
var estado = $(this).is(':checked');
    console.log("puerta de Recamara 2");
});


////////// RECAMARA 3 //////////


$("#checkLucesR3").click(function () {
var estado = $(this).is(':checked');
    sendData("C");
});

$("#checkPuertaR3").click(function () {
var estado = $(this).is(':checked');
    console.log("puerta de Recamara 3");
});



///////// COCINA /////////////

$("#checkLucesCS").click(function () {
var estado = $(this).is(':checked');
    sendData("E");
});

$("#checkPuertaCS").click(function () {
var estado = $(this).is(':checked');
    console.log("puerta de Cocina");
});


/////////  BANIO  /////////////


$("#checkLucesB").click(function () {
var estado = $(this).is(':checked');
    sendData("D");
});

