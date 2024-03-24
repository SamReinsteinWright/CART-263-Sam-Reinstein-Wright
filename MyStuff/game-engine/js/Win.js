class Win extends Phaser.Scene {

    constructor() {
        super({
            key: `win`
        });
    }
    create() {
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            color: `#ffffff`
        };
        let loadingString = `You Won!`;
        this.add.text(400, 300, loadingString, style)
    }
}