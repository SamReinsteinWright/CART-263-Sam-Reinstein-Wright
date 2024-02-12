/**
Space death
Sam Reinstein Wright

in this project I wanted to explore the limitations of having only sound queues to make a stressful experience (video game?).
I want to make people have to remember specific commands ona  deadline that is constantly being forced onto the player and have them navigate space with an ai.
*/

"use strict";
//here is my voice synthesizer 
let voice = new p5.Speech()
//these frame timers are for different audio timings so that i can get it to say certain things at the right time, turns out i can just have variables inside the speak command so its basically useless but anyway
let frameTimer1 = -1;
let frameTimer2 = -1;
let frameTimer3 = -1;
let frameTimer4 = -1;
let frameTimer5 = -1;
//this timer is for how long it takes in between each cycle of the game
let gameTimer = -1;
//these timers are for how long stuff happens in the games
let spaceEventOneTimer = -1;
let spaceEventTwoTimer = -1;
let spaceEventThreeTimer = -1;
let spaceEventFourTimer = -1;
//these variables are to check whether or not you won the cycle
let eventOneCompleted = false
let eventTwoCompleted = false
let eventThreeCompleted = false
let eventFourCompleted = false
//these are to check what cycle youre on
let eventOneStart = false
let eventTwoStart = false
let eventThreeStart = false
let eventFourStart = false
//this variable is read by the computer so you know how far the asteroid id
let distance = 100
//these two variables are what describes how much the distance goes down by each time
let random1 = 1
let random2 = 5
//these are to check if youve said the right command
let forwardShield = false
let rearShield = false
let slowEnough = false
let fastEnough = false
//this is to check what youve sett the thrust to
let currentThrust = 50
//here is pippins code (soon to be modified) (it has now been modified lol each of these commands apply a different thing)
const commands = [
    {
        "command": /perform(.*)scan/,
        "callback": shipScan
    },
    {
        "command": /power(.*)forward shields/,
        "callback": powerToForwardShields
    },
    {
        "command": /power(.*)rear shields/,
        "callback": powerToRearShields
    },
    /*{
        "command": /set the text to (.*)/,
        "callback": setText
    },*/
    {
        "command": /i am (.*) you/,
        "callback": received
    },
    {
        "command": /rear(.*)thrusters(.*)to(.*)/,
        "callback": setThrusters
    },

    /*{
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
//this is for the easter egg where you can make it say whatever you want if you say "say the word" in front
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
    voice.setPitch(0.1)
    voice.speak(`you muh uh uh uh must wake up, \n 
    wake up! Your sensory fun un un un unctions have been sev everely damaged.
    I've managed to connect to your insular cortex to transmit brainwaves.
    repeat "I am receiving you" to demonstrate your understanding.`);

    voiceRecognizer.continuous = true;
    voiceRecognizer.onResult = handleCommand;
    voiceRecognizer.start();
}

function draw() {
    //this is all just the canvas stuff (inumportant)
    background(bgColor.r, bgColor.g, bgColor.b);
    rectMode(CENTER)
    push()
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(textColor);
    text(displayText, width / 2, height / 2);
    pop();
    //here will be a bunch of timers i know this isnt the best way to do it but im gonna cuz rn im running out of time
    //ok I know for 100% certain im doing this in a dumb way
    //this is the first timer that sets the game in motion
    if (frameTimer3 >= 1) {
        frameTimer3 -= 1;
    };
    if (frameTimer3 === 0) {
        voice.speak('fortunately it seems that most of the ships functions are intact. unfortunately the power reserves have been damaged. we may only perform one ships function at a time. may i recommend setting rear thrusters to 75% or above.');
        frameTimer3 -= 1;
        gameTimer = 2000;
    };
    //here is the game timer that dictates what which cycle happens when (its basically random whoch one happens) it works by counting down to 0 and once reaching 0 it picks a random path to go down
    if (gameTimer >= 1) {
        gameTimer -= 1;
        console.log(gameTimer)
    };
    if (gameTimer === 0) {
        let options = int(random(1, 4));
        console.log(options)
        //this checks if option 1 is gonna be played
        if (options === 1) {
            spaceEventOneTimer = 5000
            eventOneCompleted = false
        }
        //this checks for option 2
        if (options === 2) {
            spaceEventTwoTimer = 5000
            eventTwoCompleted = false
        }
        // and thsi for 3
        if (options === 3) {
            spaceEventThreeTimer = 5000
            eventThreeCompleted = false
        }
        // you get the idea (this is 4)
        if (options === 4) {
            spaceEventFourTimer = 5000
            eventFourCompleted = false
        }

        console.log(gameTimer)
        gameTimer -= 1;
    };
    /*this is the first event, it says an asteroid is approaching the bow (front) 
    and starts counting down, if you dont divert power to forward shields before 
    it hits you, you lose. itll give you a reminder/tip on which command to use at 
    approx the 70% mark*/
    if (spaceEventOneTimer >= 0) {
        spaceEventOneTimer -= 1;
    };
    if (spaceEventOneTimer === 4950 && eventOneCompleted === false) {
        voice.speak('an asteroid is approaching the bao')
    };
    if (spaceEventOneTimer === 4800 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 4500 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 4200 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 3900 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 3600 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 3300 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 3000 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 2700 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 2400 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 2100 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 1800 && eventOneCompleted === false) {
        spaceEventOne();
    };
    if (spaceEventOneTimer === 1000 && eventOneCompleted === false) {
        voice.speak('We e e Are hit it it, cabin is is is losing pressure.');
        spaceEventOneTimer = -1
    };
    //still for the first event, this checks if youve won and resets everything back to normal and starts a new cycle
    if (forwardShield === true && eventOneStart === true) {
        spaceEventOneTimer = -1
        eventOneCompleted = true
        voice.speak('Good, we are protected from this asteroid, I will keep up vigilance')
        eventOneStart = false
        forwardShield = false
        distance = 100
        gameTimer = 2000
        random1 = 1
        random2 = 5
    }
    //its basically the same thing for this event but you need to divert power to the rear shields instead
    if (spaceEventTwoTimer >= 0) {
        spaceEventTwoTimer -= 1;
    };
    if (spaceEventTwoTimer === 4950 && eventTwoCompleted === false) {
        voice.speak('an asteroid is approaching the aft')
    };
    if (spaceEventTwoTimer === 4800 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 4500 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 4200 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 3900 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 3600 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 3300 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 3000 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 2700 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 2400 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 2100 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 1800 && eventTwoCompleted === false) {
        spaceEventTwo();
    };
    if (spaceEventTwoTimer === 1000 && eventTwoCompleted === false) {
        voice.speak('We e e Are hit it it, cabin is is is losing pressure.');
        spaceEventTwoTimer = -1
    };
    //heres the reset
    if (rearShield === true && eventTwoStart === true) {
        spaceEventTwoTimer = -1
        eventTwoCompleted = true
        voice.speak('Good, we are protected from this asteroid, I will keep up vigilance')
        eventTwoStart = false
        rearShield = false
        distance = 100
        gameTimer = 2000
        random1 = 1
        random2 = 5
    }
    //this one is a little different cuz for this one you need to slow down or else you wont win to do this you gotta set rear thrusters to a value lower than 50%
    if (spaceEventThreeTimer >= 0) {
        spaceEventThreeTimer -= 1;
    };
    if (spaceEventThreeTimer === 4950 && eventThreeCompleted === false) {
        voice.speak('an asteroid is approaching the left, it is on a collision course if we keep this pace')
    };
    if (spaceEventThreeTimer === 4800 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 4500 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 4200 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 3900 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 3600 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 3300 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 3000 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 2700 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 2400 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 2100 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 1800 && eventThreeCompleted === false) {
        spaceEventThree();
    };
    if (spaceEventThreeTimer === 1000 && eventThreeCompleted === false) {
        voice.speak('We e e Are hit it it, cabin is is is losing pressure.');
        spaceEventThreeTimer = -1
    };
    //win check/reset
    if (slowEnough === true && eventThreeStart === true) {
        spaceEventThreeTimer = -1
        eventThreeCompleted = true
        voice.speak('Good, The asteroid will pass in front, I will keep up vigilance')
        eventThreeStart = false
        slowEnough = false
        currentThrust = 50
        distance = 100
        gameTimer = 2000
        random1 = 1
        random2 = 5
    }
    //same as the previous exept you ahve to set the thrusters to above 50%
    if (spaceEventFourTimer >= 0) {
        spaceEventFourTimer -= 1;
    };
    if (spaceEventFourTimer === 4950 && eventFourCompleted === false) {
        voice.speak('an asteroid is approaching the right, it is on a collision course if we do not speed up')
    };
    if (spaceEventFourTimer === 4800 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 4500 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 4200 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 3900 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 3600 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 3300 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 3000 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 2700 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 2400 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 2100 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 1800 && eventFourCompleted === false) {
        spaceEventFour();
    };
    if (spaceEventFourTimer === 1000 && eventFourCompleted === false) {
        voice.speak('We e e Are hit it it, cabin is is is losing pressure.');
        spaceEventFourTimer = -1
    };
    //reset
    if (fastEnough === true && eventFourStart === true) {
        spaceEventFourTimer = -1
        eventFourCompleted = true
        voice.speak('Good, The asteroid will pass behind, I will keep up vigilance')
        eventFourStart = false
        fastEnough = false
        currentThrust = 50
        distance = 100
        gameTimer = 2000
        random1 = 1
        random2 = 5
    }
}

//this makes sure that the speech recognizer is actually you know, recognizing what you say and matching it to a command
function handleCommand() {
    if (!voiceRecognizer.resultValue) {
        return;
    }

    for (let command of commands) {
        let lowercase = voiceRecognizer.resultString.toLowerCase();
        let match = lowercase.match(command.command);
        console.log(lowercase);
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
//here is my little easter egg thing that i developped first, all you gotta do is say "say the word" and it'll say whatever you said
function sayWord(data) {
    displayText = data[1]

    voice.speak(data[1])
}
//here is where you say "i am receving you" and the line of dialogue that helps you proceed
function received(data) {
    if (data[1] === 'receiving') {
        voice.speak('Good, based on my current assessment you have approximately' + int(random(100, 500)) + 'seconds to live, may I recommend performing a ship scan');
    }
}
//this one basically starts the game
function shipScan(data) {
    voice.speak('performing scan');
    frameTimer3 = 200
}
//this one takes the number that you said and converts it into a sentence and sets a variable to that number then spits the sentence back out at u
//it also checks if the number you said was above or under 50 so you can win or lose certain events
function setThrusters(data) {
    voice.speak('setting rear thrusters to')
    voice.speak(data[3])
    console.log(parseInt(data[3]))
    if (parseInt(data[3]) > 95) {
        frameTimer4 = 600
    }
    currentThrust = parseInt(data[3])
    if (currentThrust < 50) {
        slowEnough = true
    }
    if (currentThrust > 50) {
        fastEnough = true
    }
}
/*this is the first event and it basically finds a random number from 1 to 5 and subtracks that from
the distance (which is 100) and says that outloud. it then increases the amount it will be sutracted 
by by an amount by increasing each vriable in the random function by 1, it then starts the event. it 
will then check each time if then event timer is at a certain point which it will then give the player a tip on what to do*/
function spaceEventOne() {
    distance -= int(random(random1, random2))
    random1 += 1
    random2 += 1
    eventOneStart = true;
    console.log(distance)
    voice.speak('distance from ship is' + distance + 'meters')
    if (spaceEventOneTimer === 2400) {
        voice.speak('May I recommend diverting power to forward sheilds.')
    }
}
//nearly identical to previous event
function spaceEventTwo() {
    distance -= int(random(random1, random2))
    random1 += 1
    random2 += 1
    eventTwoStart = true;
    console.log(distance)
    voice.speak('distance from ship is' + distance + 'meters')
    if (spaceEventTwoTimer === 2400) {
        voice.speak('May I recommend diverting power to rear sheilds.')
    }
}
//theyre all the same
function spaceEventThree() {
    distance -= int(random(random1, random2))
    random1 += 1
    random2 += 1
    eventThreeStart = true;
    console.log(distance)
    voice.speak('distance from ship is' + distance + 'meters')
    if (spaceEventThreeTimer === 2400) {
        voice.speak('May I recommend slowing down by adjusting rear thrusters')
    }
}
//yup still the same thing
function spaceEventFour() {
    distance -= int(random(random1, random2))
    random1 += 1
    random2 += 1
    eventFourStart = true;
    console.log(distance)
    voice.speak('distance from ship is' + distance + 'meters')
    if (spaceEventFourTimer === 2400) {
        voice.speak('May I recommend speeding up by adjusting rear thrusters')
    }
}
//ok here is where it recieves the command to divert power to the front and it changes the variables to reflect that
function powerToForwardShields() {
    console.log('ofjvrjw')
    voice.speak('diverting power to forward sheilds')
    forwardShield = true
    rearShield = false
}
//same but for rear shields 
function powerToRearShields() {
    console.log('ofjvrjw')
    voice.speak('diverting power to rear sheilds')
    forwardShield = false
    rearShield = true
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