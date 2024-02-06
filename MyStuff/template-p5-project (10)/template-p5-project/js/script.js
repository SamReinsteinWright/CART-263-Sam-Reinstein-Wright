/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//here is my voice synthesizer 
let voice = new p5.Speech()
let frameTimer1 = -1
let frameTimer2 = -1
let frameTimer3 = -1
let frameTimer4 = -1
//here is pippins code (soon to be modified)
const commands = [
    {
        "command": /perform (.*)/,
        "callback": shipScan
    },
    /*{
        "command": /set the text to (.*)/,
        "callback": setText
    },*/
    {
        "command": /i am (.*) you/,
        "callback": received
    },
    /*{
        "command": /set the red value to (.*)/,
        "callback": setRed
    },
    {
        "command": /set the text color to (.*) gray/,
        "callback": setTextColor
    },
    /*{
        "command": /set the background to (\d+) (\d+) (\d+)/,
        "callback": setBackground
    },*/
    {
        "command": /say the word (.*)/,
        "callback": sayWord
    },


];

const voiceRecognizer = new p5.SpeechRec();

let displayText = `...`;
let bgColor = {
    r: 0,
    g: 0,
    b: 0
};
let textColor = 255;

function setup() {
    createCanvas(400, 400);
    //here is the initial story beat. i want this to be a weird space adventure
    voice.speak(`you must wake up, \n 
    wake up! Your sensory functions have been severely damaged.
    I've managed to connect to your insular cortex to transmit brainwaves.
    repeat "I am receiving you" to demonstrate your understanding.`);

    voiceRecognizer.continuous = true;
    voiceRecognizer.onResult = handleCommand;
    voiceRecognizer.start();
}

function draw() {
    background(bgColor.r, bgColor.g, bgColor.b);
    rectMode(CENTER)
    rect(width / 2, height / 2.25, frameTimer1 / 0.75, 10)

    push()
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(textColor);
    text(displayText, width / 2, height / 2);
    pop();
    //here will be a bunch of timers i know this isnt the best way to do it but im gonna cuz rn im running out of time
    if (frameTimer1 >= 1) {
        frameTimer1 -= 1
        displayText = 'Corporial Scan In Progress'
    }
    //im also using them to display timer bars on screen
    if (frameTimer1 === 0) {
        voice.speak(random(100, 500))
        frameTimer1 -= 1
        frameTimer2 = 500
        displayText = 'Scan Complete'
    }
    //here is the second frame timer<3
    if (frameTimer2 >= 1) {
        frameTimer2 -= 1;
    };
    if (frameTimer2 === 0) {
        voice.speak('seconds to live. would you like me to perform a ship scan?');
        frameTimer2 -= 1;
        displayText = '';
    };
    if (frameTimer3 >= 1) {
        frameTimer3 -= 1;
    };
    if (frameTimer3 === 0) {
        voice.speak('fortunately it seems that most of the ships functions are intact. unfortunately the power reserves have been damaged. we may only perform one ships function at a time. may i recommend setting rear thrusters to 75% or above.');
        frameTimer3 -= 1;
    };

}

function handleCommand() {
    if (!voiceRecognizer.resultValue) {
        return;
    }

    for (let command of commands) {
        let lowercase = voiceRecognizer.resultString.toLowerCase();
        let match = lowercase.match(command.command);
        console.log(match);
        if (match && match.length > 1) {
            command.callback(match);
        }
    }
}

/*function setText(data) {
    displayText = data[1];
}

function setRed(data) {
    bgColor.r = parseInt(data[1]);
}

function setTextColor(data) {
    textColor = parseInt(data[1]);
}*/
function sayWord(data) {
    displayText = data[1]

    voice.speak(data[1])
}
//here is they
function received(data) {
    if (data[1] === 'receiving') {
        voice.speak('Good, based on my current assessment you have approximately');
        frameTimer1 = 200
    }
}
function shipScan(data) {
    if (data[1] === 'scan') {
        voice.speak('performing scan');
        frameTimer3 = 200
    }
}
function mousePressed() {
    voiceRecognizer.start();
}

/*function setBackground(data) {
    if (data.length > 3) {
        bgColor.r = parseInt(data[1]);
        bgColor.g = parseInt(data[2]);
        bgColor.b = parseInt(data[3]);
    }
}*/

// ["set the background to 100 100 210", "100", "100", "210"]