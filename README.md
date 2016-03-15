# AWS IOT Demo
Example of a basic connection between the Amazon Echo device and a servo connected to an Raspberry PI 2 Model B.  The servo used in the demo will simulate a door lock as I dont have a real IoT style door lock.

The project can be broken into 3 distinct parts:
- Creating the AWS IoT configuration
- Configuring Alexa
- Writing the Node.JS app for the Raspberry PI

Before we get started clone the code above (the rest of this document assumes you use the awsiotdemo directory).  
```bash
git clone https://github.com/geekfamily/awsiotdemo.git
```
Then create a sub directory called aws_certs - more on this later.

I am assuming you have the PI setup running Raspian and that NodeJS is installed.

## AWS IoT Configuration
#### Components Required
- AWS IoT account (https://console.aws.amazon.com/iot/)

#### Setup
- Login to AWS account
- Click services menu and select 'AWS IoT'
- Click '+ Create a resource'
- Select 'create a certificate'
- Select '1 click certificate create'
- Download the 3 cert files to the aws_certs directory you created earlier
- Now click the 'Create a Rule' button
- Now insert the following for this example - this opens up everything which is fine for this demo
```bash
{
  "Version": "2016-03-14",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```
- Now click 
- Keep this tab in your browser and open a new tab for the next step... we will need this page for testing after the next step.

## Alexa
#### Components Required
- Alexa account (https://developer.amazon.com/edw/home.html)
- I would recommend reading this: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/getting-started-guide

#### Setup
- Click on 'Alexa skills kit'
- Click on 'Add a new skill'
- Fill out the four fields with the information for you application that you want Alexa to use
- Click 'Next'
- On the Interaction Model screen enter the following for the intnet schema
```bash
{
    "intents": [
        {
            "intent": "MyHouse",
            "slots": [
                {
                    "name": "Command",
                    "type": "DEVICE_STATE"
                },
              {
                    "name": "Location",
                    "type": "LIST_OF_ROOMS"
                }
            ]
        }

    ]
}
```
- Next we need to create 'Slot Types' that correspond with the above schema
- Click 'Add Slot Type' and enter the following:
For Type: 
```bash
DEVICE_STATE
```
For Values: 
```bash
Lock
Unlock
```
- Click 'Add Slot Type' and enter the following:
For Type: 
```bash
LIST_OF_ROOMS
```
For Values: 
```bash
Livingroom
Kitchen
Bathroom
Outside
```
- For 'Sample Utterance' enter the following:
```bash
MyHouse to {Command} {Location} door
```
- Click 'Next'
- The Alexa command should be setup now, so we can test the configuration
- In the 'Service simulator' type:
```bash
MyHouse to open outside door
```
- if all is working you should be able to switch to eh AWS IoT that you left open ealier and see the shadow state a new 'desired' value.

## Raspberry PI
#### Components Required
- Raspberry PI 2 Model B
- Node.JS
- Cylon.JS
- Pi-blaster.js
- Servo
- 3 male to female connector wires

#### Setup
- In the terminal app of your choice go to the awtisodemo directory
- Type the following (and wait):
```bash
npm install
```
- All the dependencies should now be installed
- Verify the aws_certs directory exists in this directory (if it doesnt locate it and put it in here)
- Type the folowing:
- Type the following (and wait):
```bash
node main.js
```
