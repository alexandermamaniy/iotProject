#include <DHT11.h>

#include <SoftwareSerial.h>



SoftwareSerial BT1(0,1);



// variables sensor Dht11

int temperatura=26;

int errDth11;

float hum, temp ;

String dataDth11 = "";

DHT11 dht11(temperatura);

//////////////

//sensor de luz

int LDR=A15;

int lecLDR;

///////////

//PIR

int PIR = 7 ;









//variable que envia los datos

String data = "";



// pines de Led

int dorm1Led=27;

int dorm2Led=29;

int banioLed=31;

int cocinaLed= 33;

int entradaPLed=35;

int salaLed=37;

int dorm3Led=39;

int alarmaLed=41;

int patioPLed=43;

//pin buzzer

int buzeer= 8 ;









int luz=A15;





void setup() {

  BT1.begin(9600);

  Serial.begin(9600);

  pinMode(LDR, INPUT);

  

}

void loop() {

 lecLDR = analogRead(LDR);

 

 if( errDth11 = dht11.read(hum, temp) == 0 ){ // devuelve 0 si leyo bien el sensor

    dataDth11 = (String) temp + "_" + (String) hum;

 }else{

    dataDth11 = "0_0";

 }

if (digitalRead( PIR )){

  digitalWrite( alarmaLed , HIGH);

  Serial.println("alarma"); 

}else{

  digitalWrite( alarmaLed , LOW);

  Serial.println("no alarma"); 

}

 data = dataDth11+"_"+(String)lecLDR;

 Serial.println(data);

 BT1.println("Bluetoom"); 

 delay(1000);

}
