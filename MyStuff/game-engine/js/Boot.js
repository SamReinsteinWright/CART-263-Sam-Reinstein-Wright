class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }
    preload() {
        this.load.image(`grass`, `assets/images/Sprite-0001.png`)
        this.load.image(`sheep`, `assets/Spritesheets/sheep.png`)
        this.load.image(`ball`, `assets/Spritesheets/ball.png`)
        this.load.image(`hole`, `assets/Spritesheets/hole.png`)
        this.load.image(`flag`, `assets/Spritesheets/flag.png`)

        this.load.spritesheet('avatarIdle', `assets/Spritesheets/GameJamProjectIdle.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 4
        })
        this.load.spritesheet('avatarStep', `assets/Spritesheets/GameJamProjectWalk.png`, {
            frameWidth: 32,
            frameHeight: 48,
            endFrame: 14
        })

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        })
    }
    create() {
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            color: `#ffffff`
        };
        let loadingString = `Loading...`;
        this.add.text(100, 100, loadingString, style)
    }

    update() {

    }
}