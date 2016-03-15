# AWS IOT Demo
Example of a basic connection between the Amazon Echo device and a servo connected to an Raspberry PI 2 Model B

The project can be broken into 3 distinct parts:
- Creating the AWS IoT configuration
- Configuring Alexa
- Writing the Node.JS app for the Raspberry PI

Before we get started clone the code above (the rest of this document assumes you use the awsiotdemo directory).  Then create a sub driectory called aws_certs - more on this later.

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



## Alexa
#### Components Required
- Alexa account (https://developer.amazon.com/edw/home.html)

## Raspberry PI
#### Components Required
- Raspberry PI 2 Model B
- Node.JS
- Cylon.JS
- Pi-blaster.js
- Servo
- 3 male to female connector wires
