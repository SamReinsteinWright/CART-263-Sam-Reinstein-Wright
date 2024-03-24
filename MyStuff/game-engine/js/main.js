"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    arcade: {
        debug: true
    },
    scene: [Boot, Play, Win]
};

let game = new Phaser.Game(config);