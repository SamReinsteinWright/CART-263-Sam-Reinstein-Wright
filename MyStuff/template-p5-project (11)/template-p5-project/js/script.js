/**
NAME GUESSOR

Sam Reinstein Wright
Uses and very indepth and thorough method to scan you face and based on the data collected it guesses your name (its random)

Facemesh:
https://learn.ml5js.org/#/reference/facemesh

Image of the facemesh data points:
https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg
*/

// Our face detector
let facemesh;
// Our webcam feed
let video;
// To store the current results set
let results = [];

// Just to track what state the program is in
const STATE = {
    STARTUP: `STARTUP`,
    DETECTING: `DETECTING`,
    ASSESSING: `ASSESSING`,
    RESULTS: `RESULTS`
};
let state = STATE.STARTUP;
//these are to track the data of each point on the face
//------------------------------------------------------
let rightEyeX;
let rightEyeY;
let leftEyeX;
let leftEyeY;
let faceLength;
let facelengthLeftX;
let facelengthLeftY;
let facelengthRightX;
let facelengthRightY;
let noseX;
let noseY;
let mouthX;
let mouthY;
//-----------------------------------------------------

//this is to keep track for my timer function
//-----------------------------------------------------
let timer;
let timerOn = false;
let yourNumber;
//-----------------------------------------------------

//this is an array of every name that can bu guessed
//-----------------------------------------------------
let face = [
    {
        name: `Rachel`,
    },
    {
        name: `Seamus`,
    },
    {
        name: `Mackenzie`,
    },
    {
        name: `Preston`,
    },
    {
        name: `Marvin`,
    },
    {
        name: `Ela`,
    },
    {
        name: `Alys`,
    },
    {
        name: `Yasin`,
    },
    {
        name: `Holly`,
    },
    {
        name: `Chiara`,
    },
    {
        name: `Eliana`,
    },
    {
        name: `Loui`,
    },
    {
        name: `Bibi`,
    },
    {
        name: `Goergie`,
    },
    {
        name: `Alyssa`,
    },
    {
        name: `Deanna`,
    },
    {
        name: `Savanna`,
    },
    {
        name: `Juliet`,
    },
    {
        name: `Elizabeth`,
    },
    {
        name: `Mina`,
    },
    {
        name: `Devon`,
    },
    {
        name: `Livia`,
    },
    {
        name: `Sion`,
    },
    {
        name: `Raihan`,
    },
    {
        name: `Gabriela`,
    },
    {
        name: `Maria`,
    },
    {
        name: `Jackson`,
    },
    {
        name: `Thomas`,
    },
    {
        name: `Zarah`,
    },
    {
        name: `Jago`,
    },
];
//---------------------------------------------------------

//some parts of this code is directly pulled from pippins code so i wont change the comments either
/**
Create the canvas, start the webcam, start up Facemesh
*/
function setup() {
    createCanvas(640, 480);

    // Set up and start the webcam
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // Start up Facemesh
    facemesh = ml5.facemesh(video, modelLoaded);
}

/**
Called when Facemesh is ready to start detection
*/
function modelLoaded() {
    // Now we know we're ready we can switch states
    state = STATE.DETECTING;
    // What to do 
    facemesh.on('face', handleFaceDetection);
}

/**
Displays based on the current state
*/
function draw() {
    stopwatch()
    switch (state) {
        case STATE.STARTUP:
            startup();
            break;
        case STATE.DETECTING:
            detecting();
            break;
        case STATE.ASSESSING:
            assessing();
            break;
        case STATE.RESULTS:
            congrats();
            break;
    }
}

/**
Tells the user we're getting started with loading Facemesh
*/
function startup() {
    background(0);

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Loading Facemesh...`, width / 2, height / 2);
    pop();
}

/**
Displays the video feed and all the data of nose to mouth and eye to eye distances
*/
function detecting() {
    background(200, 127, 120);
    // Show the webcam
    image(video, 0, 0);
    console.log(timer)
    // Default text settings
    textSize(24);
    textAlign(CENTER, CENTER);
    rectMode(CENTER)
    push()
    //this checks if the nose is within the center of the box indicated
    //---------------------------------------------------------------------
    if (noseX < 250 && noseX > 150 && noseY > 250 && noseY < 350) {
        stroke(255)
        //---------------------------------------------------------------------

        //these all take in the data of the points on the face mesh that correspond to the features i am tracking
        //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        text('Your eye (L) to eye (R) rating is: ' + int(((featureDistance(leftEyeX, leftEyeY, rightEyeX, rightEyeY) / featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY)) * 10)), 200, 20)
        line(leftEyeX, leftEyeY, rightEyeX, rightEyeY)

        text('Your eye (L) to nose rating is: ' + int(((featureDistance(leftEyeX, leftEyeY, noseX, noseY) / featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY)) * 10)), 187, 50)
        line(leftEyeX, leftEyeY, noseX, noseY)

        text('Your eye (R) to nose rating is: ' + int(((featureDistance(rightEyeX, rightEyeY, noseX, noseY) / featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY)) * 10)), 188, 80)
        line(rightEyeX, rightEyeY, noseX, noseY)

        text('Your mouth to nose rating is: ' + int(((featureDistance(mouthX, mouthY, noseX, noseY) / featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY)) * 10)), 182, 110)
        line(mouthX, mouthY, noseX, noseY)

        text('Your mouth to eye (R) rating is: ' + int(((featureDistance(mouthX, mouthY, rightEyeX, rightEyeY) / featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY)) * 10)), 195, 140)
        line(mouthX, mouthY, rightEyeX, rightEyeY)

        text('Your mouth to eye (L) rating is: ' + int(((featureDistance(mouthX, mouthY, leftEyeX, leftEyeY) / featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY)) * 10)), 195, 170)
        line(mouthX, mouthY, leftEyeX, leftEyeY)
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //this is to turn the timer on and make the rectangle green
        //------------------------------------------------------------
        stroke(0, 255, 0)
        timerOn = true
    }
    //-------------------------------------------------------------

    //this makes sure that the timer resets if the nose isnt in the box
    //------------------------------------------------------------------
    else {
        timerOn = false
    }
    //------------------------------------------------------------------

    //this checks if timer is done and changes the state
    //------------------------------------------------------------------
    if (timer === 1) {
        timerOn = false
        state = STATE.ASSESSING;

    }
    //-----------------------------------------------------------------

    //this is for the two bars on the side of the screen that go up and down
    //-------------------------------------------------------------------------
    strokeWeight(5)
    noFill()
    rect(200, 320, 200, 250)
    pop()
    push()
    stroke(255)
    text('Place your head within this box', 200, 460)
    pop()
    rectMode(CORNER)
    rect(400, 450, 50, -featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY) * 1.5)
    rect(500, 450, 50, -featureDistance(facelengthLeftX, facelengthLeftY, facelengthRightX, facelengthRightY) * random(1, 1.5) * random(1.5, 2))
    //---------------------------------------------------------------------------

    //none of the below coments are accurate but for some reason whenever i put the distanceCalculatorData function elsewhere it doesnt work
    //--------------------------------------------------------------------------------------------------------
    // Go through all the current results
    for (let result of results) {
        // Go through each of the possible features we're mapping
        for (let feature of face) {
            // Get the scaled mesh data for the current result (the data that
            // tells us where the features are located)
            const data = result.scaledMesh;
            // Calculate x as halfway between the left and right coordinates
            // of that feature
            //const x = halfwayBetween(data[feature.leftDataIndex][0], data[feature.rightDataIndex][0]);
            //onst y = halfwayBetween(data[feature.leftDataIndex][1], data[feature.rightDataIndex][1]);
            // Display the emoji there
            distanceCalculatorData()
        }
    }
}
//--------------------------------------------------------------------------------------------------------

//this is for when the state swaps to assessing
//------------------------------------------------
function assessing() {
    background(0);
    timerOn = true
    console.log(timer)
    //once the timer reaches its end it comes up with a randome number
    //-----------------------------------------------------------------
    if (timer === 1) {
        yourNumber = int(random(0, 29))
        state = STATE.RESULTS;
    }
    //-----------------------------------------------------------------
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Assessing Face...`, width / 2, height / 2);
    pop();
}
//-------------------------------------------------------

//this is when it displays your name
//-------------------------------------------------------
function congrats() {

    background(0);
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    //this makes sure the random number you chose gets turned into a name
    //------------------------------------------------------------------------
    text(`CONGRADULATIONS! YOU LOOK LIKE A(N) \n` + face[yourNumber].name, width / 2, height / 2);
    pop();
    //-------------------------------------------------------------------------
}
//----------------------------------------------------------

/**
Calculates the number halfway between a and b. Could also use lerp.
*/
function halfwayBetween(a, b) {
    return a + (b - a) / 2;
}

//this function is to calculate the distance of stuff that goes into the function
//------------------------------------------------------
function featureDistance(a, b, c, d) {
    return dist(a, b, c, d);
}
//----------------------------------------------------------

function distanceCalculatorData() {
    /* This is for the distance between the eyes
    -------------------------------------------------*/
    const xRightEye = halfwayBetween(results[0].scaledMesh[263][0], results[0].scaledMesh[362][0]);
    const yRightEye = halfwayBetween(results[0].scaledMesh[263][1], results[0].scaledMesh[362][1]);
    //ellipse(xRightEye, yRightEye, 40, 40);
    rightEyeX = xRightEye
    rightEyeY = yRightEye
    const xLeftEye = halfwayBetween(results[0].scaledMesh[33][0], results[0].scaledMesh[133][0]);
    const yLeftEye = halfwayBetween(results[0].scaledMesh[33][1], results[0].scaledMesh[133][1]);
    leftEyeX = xLeftEye
    leftEyeY = yLeftEye
    //--------------------------------------------------

    //This is for the width of the face
    //--------------------------------------------------
    const xLeftFaceWidth = results[0].scaledMesh[234][0];
    const yLeftFaceWidth = results[0].scaledMesh[234][1];
    facelengthLeftX = xLeftFaceWidth
    facelengthLeftY = yLeftFaceWidth
    const xRightFaceWidth = results[0].scaledMesh[454][0];
    const yRightFaceWidth = results[0].scaledMesh[454][1];
    facelengthRightX = xRightFaceWidth
    facelengthRightY = yRightFaceWidth
    //---------------------------------------------------

    //this is for nose
    //---------------------------------------------------
    const xNose = results[0].scaledMesh[1][0];
    const yNose = results[0].scaledMesh[1][1];
    noseX = xNose
    noseY = yNose
    //---------------------------------------------------

    //this if for mouth
    //---------------------------------------------------
    const xMouth = halfwayBetween(results[0].scaledMesh[14][0], results[0].scaledMesh[13][0]);
    const yMouth = halfwayBetween(results[0].scaledMesh[14][1], results[0].scaledMesh[13][1]);
    mouthX = xMouth
    mouthY = yMouth
}

//this is the timer function
//---------------------------------------
function stopwatch() {
    if (timerOn === false) {
        timer = 400
    }
    if (timer > 0 && timerOn === true) {
        timer -= 1
    }
}
//---------------------------------------

/**
Called by Facemesh when it sees a face, just stores the data in results
so we can see it in detecting()
*/
function handleFaceDetection(data) {
    if (data.length > 0) {
        results = data;
    }
}