"use strict";
 
var awsIot = require('aws-iot-device-sdk'),
    cylon = require("cylon"),
    piblaster = require('pi-blaster.js');
 
var bulbState = {"state":{"desired":{"lockangle":0}}};
var clientTokenUpdate;
var lastAngle = 0;

var thingShadows = awsIot.thingShadow({
  keyPath: './aws_certs/privateKey.pem',
  certPath: './aws_certs/cert.pem',
  caPath: './aws_certs/rootCA.pem',
  clientId: 'myLightBulb',
  region: 'us-east-1'
});

thingShadows.on('connect', function() {
  thingShadows.register( 'myLightBulb' );
  setTimeout( function() {
    clientTokenUpdate = thingShadows.update('myLightBulb', bulbState  );
  }, 2000 );
    
});

thingShadows.on('status',
  function(thingName, stat, clientToken, stateObject) {
    console.log('received '+stat+' on '+thingName+': '+ JSON.stringify(stateObject));
  });

thingShadows.on('delta',
  function(thingName, stateObject) {
    var lockPos = stateObject.state.lockangle;
    console.log("***** turn lock to: "+ stateObject.state.lockangle +"*****");  
    if (lockPos>0){
        console.log("===turn lock to: "+ lockPos);   
        //robot.servo.angle = lockPos;
        if (null!=robot){
            robot.servo.angle(lockPos);
            //robot.moveServo(lockPos);
            setTimeout(function(){
                console.log('lock is now moved');
                console.log();
                clientTokenUpdate = thingShadows.update('myLightBulb' ,{"state":{"reported":{"lockangle":lockPos}}});
            });
        }
    }
    
  });

thingShadows.on('timeout',
  function(thingName, clientToken) {
    console.log('received timeout '+' on '+thingName+': '+ clientToken);
  });

var robot = cylon.robot({
  name: "doorbot",
  connections: {
    raspi: { adaptor: 'raspi' }
  },
  devices: {
    // digital sensors
    //servo:  { driver: "servo", pin: 4, connection: "raspi" },
    // analog sensors
    //dial:   { driver: "analogSensor", pin: 0, connection: "raspi" }
    servo: {
    	driver: "servo",
    	pin: 7,
    	limits: { bottom: 20, top: 160 }
    }
  },
  turnLock: function(val) {
    var that = this;
    var currentAngle = that.servo.currentAngle();
    var angle = val.fromScale(0, 1023).toScale(0,180) | 0;
    if (angle <= lastAngle - 20 || angle >= lastAngle + 20) {
        setTimeout(function(){
            console.log('turning lock...'+angle);
            clientTokenUpdate = thingShadows.update('myLightBulb' ,{"state":{"desired":{"lockangle":angle}}});
        });
        lastAngle = angle;
    }
  },
  moveServo: function(angle) {
      var that = this;
      console.log('moveservo...'+angle);
      that.servo.angle(angle);
  },
  writeMessage: function(message, color) {
      
  },
  reset: function() {
    this.writeMessage("Doorbot ready");
  },
  work: function(my) {
 
  }
}).start();