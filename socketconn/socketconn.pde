/*
Google+ Hangout Extension / Interactive Web App Demo
---
This is the sketch that runs on your computer to listen to the
web app, and tell your Arduino what to do.

In order for the sketch to connect to your web app, you need the
IP address of wherever the app is hosted, and also the port of
your web app's tcp socket.

(The tcp socket and web socket are different, so be sure to
choose the tcp socket port.)

Every 5 seconds we check and make sure that the socket is still
connected to the server. Sometimes it borks out, but works fine
if you check it- and if it isn't there, then just open a new
connection.

Example by RobotGrrl
robotgrrl.com
robobrrd.com
CC-BY
*/

import processing.net.*;
import processing.serial.*;

// -- SOCKET -- //
String SERVER = "ipaddress"; // TODO: ip address of your ec2 instance
int PORT = port; // TODO: tcp port (in server.js of the web app)
int FREQ = 5;
Client c;

// -- MISC -- //
String data;
int sec_0 = 88;
int sec;

// -- ARDUINO -- //
Serial arduino;
int port = 0;
String theserial = "serial"; // TODO: port of your arduino

void setup() {
  
  size(200, 200);
  frameRate(60);
  
  // let's connect to the tcp socket
  c = new Client(this, SERVER, PORT);
  
  // find our arduino
  for (int i=0; i<Serial.list().length; i++) {
    println(Serial.list()[i]);
    if (Serial.list()[i].equals(theserial)) {
      println("ding!");
      port = i;
      break;
    }
  }

  // open our arduino
  arduino = new Serial(this, Serial.list()[port], 9600);
  
}

void draw() {
  
  // check for data from web app
  if (c != null) {
    if (c.available() > 0) {
      data = c.readString();
      println("data: " + data + "\n");
      
      // parse the message
      if(data.equals("0")) {
        // off
        println("off");
        arduino.write('0');
        background(0);
        
      } else if(data.equals("1")) {
        // on
        println("on");
        arduino.write('1');
        background(0, 255, 0);
      }
      
    }
  }
  
  
  // get the current second
  sec = second();

  // every 5 seconds (or whatever FREQ is), we need to do this
  if (sec%FREQ == 0 && sec_0 != sec) {
    println("\n\nding!");
    sec_0 = sec;
    
    // sometimes the socket disconnects, so let's make that not happen
    if(c != null) {
      c.write("ping!"); 
    } else {
      c = new Client(this, SERVER, PORT);
      c.write("ping");
    }
    
  } else {
    
    // just printing out to the console
    if (sec != sec_0) {
      print(sec + " ");
      sec_0 = sec;
    }
  
  }
  
}

