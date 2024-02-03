/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const commands = [
    {
        "command": /set the text to (.*)/,
        "callback": setText
    },
    {
        "command": /set the red value to (.*)/,
        "callback": setRed
    },
    {
        "command": /set the text color to (.*) gray/,
        "callback": setTextColor
    },
    {
        "command": /set the background to (\d+) (\d+) (\d+)/,
        "callback": setBackground
    }
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

    voiceRecognizer.continuous = true;
    voiceRecognizer.onResult = handleCommand;
    voiceRecognizer.start();
}

function draw() {
    background(bgColor.r, bgColor.g, bgColor.b);

    push()
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(textColor);
    text(displayText, width / 2, height / 2);
    pop();
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

function setText(data) {
    displayText = data[1];
}

function setRed(data) {
    bgColor.r = parseInt(data[1]);
}

function setTextColor(data) {
    textColor = parseInt(data[1]);
}

function setBackground(data) {
    if (data.length > 3) {
        bgColor.r = parseInt(data[1]);
        bgColor.g = parseInt(data[2]);
        bgColor.b = parseInt(data[3]);
    }
}

// ["set the background to 100 100 210", "100", "100", "210"]