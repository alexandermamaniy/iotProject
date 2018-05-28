//#include <DHT11.h>

#include "DHT.h"

#include <SoftwareSerial.h>

#include <Servo.h>



//SoftwareSerial BT1(0,1);

////////////////// variables sensor Dht11 y ventilador

int temperatura = 26;
//int errDth11;


int hum , temp ;

String dataDth11 = "";

//DHT11 dht11(temperatura);
DHT dht11(temperatura, DHT11);

int ventilador = 36;


//////////////////sensor de luz

int LDR = A15;

int lecLDR;

/////////////////PIR

int PIR = 7 ;

/////////////////variable que envia los datos

String data = "";
String sep = "_";

//////////////////pines de Led

int dorm1Led = 27 , dorm2Led = 29 , banioLed = 31 , cocinaLed = 33;

int salaLed = 37 , dorm3Led = 39;


///////////////////pin buzzer

int alarmaLed = 41;

int buzeer    = 8 ;

///////////////////pines del patio

int entradaPLed = 35;

int patioPLed   = 43;

///////////////////Puertas 

Servo puerta1;  

Servo puerta2;

int pos1 = 0, pos2 = 0;

///////////////////////////////////////////////////

//////////////////Sensor de Gas

int MQ135 = A14;

int lecMQ135;

int AIRE = 38, CO2 = 40, GAS = 42;



struct Led
{
    char key;     // key asociado al Led
    int pin;        // numero de pin asociado al Led
    boolean status; // estado del Led
};


Led luces[] = {
            'A', dorm1Led, false,
            'B', dorm2Led, false,
            'C', dorm3Led, false,
            'D', banioLed, false,
            'E', cocinaLed, false,            
            'G', salaLed, false,
            
        };

int tamLuces = sizeof(luces)/sizeof(Led); // tamanio array de luces

boolean alarma = false;  // estado si la alarma esta encendida o no 

void setup() {

  //BT1.begin(9600);

    Serial.begin(9600);
    
    
    
    pinMode(LDR,         INPUT);
    pinMode(PIR,         INPUT);
    pinMode(MQ135,         INPUT);
    //  leds
    pinMode(dorm1Led,    OUTPUT);
    pinMode(dorm2Led,    OUTPUT);
    pinMode(dorm3Led,    OUTPUT);
    pinMode(banioLed,    OUTPUT);
    pinMode(cocinaLed,   OUTPUT);
    pinMode(entradaPLed, OUTPUT);
    pinMode(salaLed,     OUTPUT);
    pinMode(patioPLed,   OUTPUT);
    pinMode(alarmaLed,   OUTPUT);

    pinMode(buzeer,      OUTPUT);
    pinMode(ventilador,  OUTPUT);
    pinMode(AIRE,        OUTPUT);
    pinMode(CO2,         OUTPUT);
    pinMode(GAS,         OUTPUT);

    puerta1.attach(28);    
    puerta2.attach(30);    

}

void loop() {
    
    lecLDR = analogRead(LDR);
    lecMQ135= analogRead(MQ135);
    hum = dht11.readHumidity();
    temp = dht11.readTemperature();
    
    if ( Serial.available() >  0 ){
        char dato = Serial.read();
        if( dato == 'A' || dato == 'B' || dato == 'C' || dato == 'D' || dato == 'E'  || dato == 'G' ){
            prenderLed(dato);
        }else if(dato == 'I'){ //prendemos todo el interior de la casa
            generalInteriorLed(true);
        }else if(dato == 'J'){
            generalInteriorLed(false);
        }else if(dato == 'K'){  // habilitamos la alarma
            alarma = true;
        }else if(dato == 'L'){
            alarma = false;
        }
    } 
  
    if(lecLDR>500){
        generalPatio(true);
    }else{
        generalPatio(false);
    }
    if(temp >= 22){
        //prender Ventilador
        ventilar(true);
    }else{
        //apagar Ventilador
        ventilar(false);
    }

    /*
    if( errDth11 = dht11.read(hum, temp) == 0 ){ // devuelve 0 si leyo bien el sensor

        dataDth11 = (String) temp + "_" + (String) hum;

    }else{

        dataDth11 = "0_0";

    }
    */

    if (isnan(hum) || isnan(temp)) {

        dataDth11 = "0"+sep+"0";  

    }else{

        dataDth11 = (String)temp+sep+(String)hum;
    }
    if(alarma){
        if (digitalRead( PIR )){
            alarmaActivada(true);           
        }
    }else{
        alarmaActivada(false);        
    }


    data = dataDth11+sep+(String)lecLDR;

    Serial.println(data);

    //BT1.println("Bluetoom"); 

    delay(50);

}

 

void generalInteriorLed(boolean estado){
    int i;
    for(i=0; i< tamLuces ; i++){
        luces[i].status = estado;
        digitalWrite(luces[i].pin, luces[i].status);  
    }
}

void alarmaActivada(boolean estado){

    digitalWrite(alarmaLed, estado);
    digitalWrite(buzeer,    estado);
    

}

void ventilar(boolean estado){

    digitalWrite(ventilador, estado);

}

void generalPatio(boolean estado){

    digitalWrite(entradaPLed, estado);

    digitalWrite(patioPLed,   estado);

}

void puertas(int puerta, boolean estado){

    if (estado == true){

        if(puerta == 1){

            puerta1.write(100);
        }else{

            puerta2.write(100);  
        }
    }else{

        if(puerta == 1){
            puerta1.write(0);
        }else if(puerta == 2){

            puerta2.write(0);  
        }
    }
}

void prenderLed(char key){
    int i;
    for(i=0; i< tamLuces ; i++){
        if(luces[i].key == key){
            luces[i].status = luces[i].status ? false: true;
            digitalWrite(luces[i].pin, luces[i].status);
        }
    }
}


//void AlarmaGas(boolean estado){}




