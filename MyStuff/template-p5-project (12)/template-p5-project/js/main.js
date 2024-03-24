"use strict";

// We create a JavaScript object to configure our Phaser 3 game
let config = {
    // The type refers to the kind of display we'll be using
    // which is either Canvas or WebGL. The Phaser.AUTO setting
    // will choose the best option for us.
    type: Phaser.AUTO,
    // Here we define the actual dimensions of our game's display area
    // Though note that we're able to scale the entire game as well
    // if we need to for responsive design
    width: 800,
    height: 600,
    // Because it's so common to include physics in a game, this is how
    // we set up the basic "arcade physics" engine with our game
    physics: {
        default: 'arcade',
    },
    // Finally, the scene property has an array of the different scenes
    // in our game, with the one listed first being loaded automatically
    // Right now we don't have a scene to load, so let's leave it empty
    scene: [Play]
};

// Here we actually create the game using this configuration!
let game = new Phaser.Game(config);