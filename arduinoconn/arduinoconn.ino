/*
Google+ Hangout Extension / Interactive Web App Demo
---
This is the sketch that runs on your Arduino to respond to the
two different buttons on the web app.

It listens for the commands via Serial to trigger the LEDs.

The Processing sketch must be running on your computer
(and your Arduino plugged in) for this to be able to work
properly!

Example by RobotGrrl
robotgrrl.com
robobrrd.com
CC-BY

and yes... this comment is larger than the entire program. lol!
*/

int led = 13;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);
}

void loop() {

  if(Serial.available() > 0) {
    while(Serial.available() > 0) {
      char c = Serial.read();
      
      if(c == '0') {
        digitalWrite(led, LOW);
      } else if(c == '1') {
        digitalWrite(led, HIGH);
      }
      
    }
  }
  
}

