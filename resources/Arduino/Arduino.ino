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
int lecCO2;

/////////////////PIR

int PIR1 = 3 ;
int PIR2 = 4 ;


/////////////////variable que envia los datos

String data = "";
String sep = "_";

//////////////////pines de Led

int dorm1Led = 27 , dorm2Led = 29 , banioLed = 31 , cocinaLed = 33;

int salaLed = 37 , dorm3Led = 39;


///////////////////pin buzzer

int alarmaLed = 41;
int alarmaPatio = 38;
int buzeer2    = 12 ;
int buzeer    = 13 ;

String roboC ;
String gasC ;

///////////////////pines del patio

int entradaPLed = 35;

int patioPLed   = 43;

///////////////////Puertas 

Servo puerta1;  
Servo puerta2;
Servo puerta3;

int pos1 = 0, pos2 = 0;

///////////////////////////////////////////////////

//////////////////Sensor de Gas

int MQ135 = A14;

int lecMQ135;


int CO2 = A0, GAS = 42;



struct Led
{
    char key;     // key asociado al Led
    int pin;        // numero de pin asociado al Led
    boolean status; // estado del Led
};

struct Puerta
{
    char key;     // key asociado al Led
    Servo puerta;        // numero de pin asociado al Led
    boolean status; // estado del Led
};

Puerta puertas[] = {
                'M', puerta1, false,
                'N', puerta2, false,
                'O', puerta3, false,
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
int tamPuertas = sizeof(puertas)/sizeof(Puerta); // tamanio array de luces

boolean alarma = false;  // estado si la alarma esta encendida o no 

void setup() {

  //BT1.begin(9600);

    Serial.begin(9600);
    
    
    
    pinMode(LDR,         INPUT);
    pinMode(PIR1,         INPUT);
    pinMode(PIR2,         INPUT);
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
    pinMode(alarmaPatio,   OUTPUT);

    pinMode(buzeer,      OUTPUT);
    pinMode(buzeer2,      OUTPUT);
    pinMode(ventilador,  OUTPUT);

    pinMode(CO2,         INPUT);
    pinMode(GAS,         OUTPUT);

    puerta1.attach(34);    
    puerta2.attach(32);    
    puerta3.attach(45);    
    
    for(int i=0; i< tamPuertas ; i++){

        puertas[i].puerta.write(20);
    }

}

void loop() {

    lecLDR = analogRead(LDR);

    lecCO2 = analogRead(CO2);
    //Serial.println(lecCO2);    
    lecMQ135= analogRead(MQ135);
    hum = dht11.readHumidity();
    temp = dht11.readTemperature();
    
    if ( Serial.available() >  0 ){
        char dato = Serial.read();      
        abrirPuerta(dato);                
        prenderLed(dato);
        if(dato == 'I'){ //prendemos todo el interior de la casa
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
        ventilar(true);
    }else{
        ventilar(false);
    }


    if (isnan(hum) || isnan(temp)) {
        dataDth11 = "0"+sep+"0";  
    }else{
        dataDth11 = (String)temp+sep+(String)hum;
    }
    if(alarma){
        int pirr1 = digitalRead( PIR1 );
        int pirr2 = digitalRead( PIR2 );
        
        if ( pirr1 || pirr2 ){
            alarmaActivada(true);
                   
        }
    }else{
        alarmaActivada(false);        
    }

    if(lecCO2 >= 350 ){
        gasC = "T";
        digitalWrite(buzeer2, true);
    }else{

        gasC = "F";
        digitalWrite(buzeer2, false);
    }

    //data = dataDth11+sep+(String)lecLDR+sep+roboC+sep+gasC;
    data = dataDth11+sep+roboC+sep+gasC;
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
    digitalWrite(alarmaPatio, estado);

    digitalWrite(buzeer,    estado);
    roboC = estado ? "T":"F";    
}

void ventilar(boolean estado){
    digitalWrite(ventilador, estado);

}

void generalPatio(boolean estado){
    digitalWrite(entradaPLed, estado);
    digitalWrite(patioPLed,   estado);
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

void abrirPuerta(char key){
    int i;
    for(i=0; i< tamPuertas ; i++){
        if(puertas[i].key == key){
            puertas[i].status = puertas[i].status ? false: true;
            if( puertas[i].status == 1 ){                
                //Serial.println("se abrio puerta ==== "+ (String)puertas[i].key);
                puertas[i].puerta.write(100);
            }else{
                //Serial.println("se cerro puerta ==== "+ (String)puertas[i].key);
                puertas[i].puerta.write(20);
            }            
        }
    }
}







//void AlarmaGas(boolean estado){}




