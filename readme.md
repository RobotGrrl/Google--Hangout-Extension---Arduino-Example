
# Google+ Hangout Extension - Arduino Example #

Based off of the code by [John Schimmel _node-session_](https://github.com/johnschimmel/node-session), used it for the Robot Party Robot Controller extension and the RoboBrrd Brrd Feeder extension! Here is a basic Arduino demo that can help get you up and running with your own Hangout robots!

There are four main parts to this:

* web app (node.js running on ec2, has tcp & web sockets)
* processing sketch (listening to tcp socket, serial conn to arduino)
* arduino (listening to serial for messages, performs actions)
* google+ hangout (hangout.xml showing iframe)

# useful for setup #

* ec2:
	* https://console.aws.amazon.com/ec2/

* ec2 - network & security
	* -> security groups
	* add 2 ports for your websocket and tcp socket

* google apis: 
	* https://code.google.com/apis/console/

# ec2 & node.js info #

* _'[diy node.js server](http://cuppster.com/2011/05/12/diy-node-js-server-on-amazon-ec2/)'_ -- follow this up to installing nginx

* _'[node.js server and web sockets](http://catchvar.com/nodejs-server-and-web-sockets-on-amazon-ec2-w)'_ -- follow this from install & configure HAProxy

* _'[how i got node.js running on a linux micro instance](http://www.bennadel.com/blog/2321-How-I-Got-Node-js-Running-On-A-Linux-Micro-Instance-Using-Amazon-EC2.htm)'_ -- from the forever part:


# robots & google+ hangouts info #

* [oscar robot](http://gusclass.com/blog/2012/07/31/oscar-the-hangout-robot/)

* [running hangout apps](https://developers.google.com/+/hangouts/running
)

* [writing hangout apps](https://developers.google.com/+/hangouts/writing
)

# misc info #

Just some notes that I jotted down while making this which might be helpful

* permissions for keypair:
	* chmod folder to 700
	* chmod file to 600

* add keypair:
	* ssh-add /Users/frankenteddy/Documents/keypair/coolioeskeypair.pem

* extension iframe size:
	* 300 x 732 px
	
# Robot Party #
Hope to see ya at the [ROBOT PARTY](http://robotgrrl.com/robotparty)!
