class Play extends Phaser.Scene {

    constructor() {
        super({
            key: `play`
        });
    }
    create() {
        let width = 100, height = 100;
        for (let y = 0; y < width; y++) {
            ;
            for (let x = 0; x < height; x++) {

                this.add.image(width / 2 + 64 * x, height / 2 + 64 * y, "grass").setScale(3, 3);

            }
        }
        this.flag = this.physics.add.image(750, 540, 'flag')

        this.hole = this.physics.add.image(750, 550, 'hole')

        //this.wall = this.physics.add.image(100, 100, `grass`);
        //this.wall.setTint(0xADD8E6);
        //this.wall.setImmovable(true);
        //this.wall.setCollideWorldBounds(true);

        this.ball = this.physics.add.image(400, 300, `ball`);
        this.ball.setImmovable(false);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.avatar = this.physics.add.sprite(100, 200, `avatarIdle`);
        this.avatar.setCollideWorldBounds(true);

        this.herd = this.physics.add.group({
            key: 'sheep',
            quantity: 20,
            collideWorldBounds: true,
            bounceX: 0.5,
            bounceY: 0.5,
            pushable: true
        });
        this.herd.children.each(function (sheep) {
            let x = Math.random() * this.sys.canvas.width;
            let y = Math.random() * this.sys.canvas.height;
            sheep.setPosition(x, y);
            this.physics.add.overlap(this.herd, sheep, (sheep) => {
                if (sheep.name !== this.herd.children.entries.name) {
                    sheep.body.velocity.x += Math.random()
                    sheep.body.velocity.y -= Math.random()
                    console.log('hi')
                }
            });
            for (let i = 0; i < this.herd.getLength(); i++) {

                this.herd.getChildren()[i].name = "sheep-" + i;

                if (sheep.name === 'sheep-' + i)// && (sheep.x - this.herd.getChildren()[i].x) > 30 && (sheep.y - this.herd.getChildren()[i].y) > 30 && (sheep.x - this.herd.getChildren()[i].x) < 200 && (sheep.y - this.herd.getChildren()[i].y) < 200) 
                {
                    // this.physics.moveToObject(sheep, (sheep.name === 'sheep-2'), 1)
                    console.log(sheep.name)
                }

            }
        }, this);

        this.createAnimations();



        this.physics.add.collider(this.avatar, this.wall);
        this.physics.add.collider(this.herd, this.ball, this.wall);
        this.physics.add.collider(this.herd, this.herd);

        this.physics.add.overlap(this.ball, this.hole, this.win, null, this)



        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            color: `#ffffff`
        };
        let loadingString = `Get the ball in the hole!`;
        this.add.text(200, 50, loadingString, style)
        this.avatar.play(`avatar-idle`)


    }


    win() {
        this.scene.start(`win`);
    }
    update() {

        this.herd.children.each(function (sheep) {
            let avatarSheep = Phaser.Math.Distance.Between(sheep.x, sheep.y, this.avatar.x, this.avatar.y)
            if (sheep.body.velocity.x < 0) {
                sheep.flipX = true;
            }
            else {
                sheep.flipX = false;
            }


            if (sheep.x > 780) {
                sheep.body.velocity.x -= 5
            }
            if (sheep.x < 10) {
                sheep.body.velocity.x += 5
            }
            if (sheep.y > 580) {
                sheep.body.velocity.y -= 5
            }
            if (sheep.y < 10) {
                sheep.body.velocity.y += 5
            }

            for (let i = 0; i < this.herd.getLength(); i++) {
                let flock = this.herd.getChildren().find(v => v.name === "sheep-" + i)
                let flockDistance = Phaser.Math.Distance.Between(sheep.x, sheep.y, flock.x, flock.y)


                if (flockDistance > 70) {
                    if (flockDistance < 80 && flockDistance > 70) {
                        this.physics.moveToObject(sheep, flock, 20)
                        sheep.body.velocity.x += flock.body.velocity.x / 2
                        sheep.body.velocity.y += flock.body.velocity.y / 2
                    }
                }

            }
            if (avatarSheep < 100) {
                this.physics.moveToObject(sheep, this.avatar, -65);
            }
            if (sheep.body.velocity.x > 0) {
                sheep.body.velocity.x -= 0.01;
            }
            if (sheep.body.velocity.x < 0) {
                sheep.body.velocity.x += 0.01;
            }
            if (sheep.body.velocity.y > 0) {
                sheep.body.velocity.y -= 0.01;
            }
            if (sheep.body.velocity.y < 0) {
                sheep.body.velocity.y += 0.01;
            }





        }, this);

        this.avatar.setVelocity(0);

        /*if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(200);
        }
         
        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(200);
        }*/

        const pointer = this.input.activePointer;


        let pointerDistance = Phaser.Math.Distance.Between(this.avatar.x, this.avatar.y, pointer.x, pointer.y)
        // Move at 240 px/s
        if (pointerDistance > 10) {
            this.physics.moveToObject(this.avatar, pointer, 150);
        }

        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            if (this.avatar.body.velocity.x < 0) {
                this.avatar.flipX = true;
            }
            else if (this.avatar.body.velocity.x > 0) {
                this.avatar.flipX = false;
            }
            this.avatar.play(`avatar-step`, true)
        }
        else {
            this.avatar.play(`avatar-idle`, true)
        }

        if (this.ball.body.velocity.x > 0) {
            this.ball.body.velocity.x -= 0.1;
        }
        if (this.ball.body.velocity.x < 0) {
            this.ball.body.velocity.x += 0.1;
        }
        if (this.ball.body.velocity.y > 0) {
            this.ball.body.velocity.y -= 0.1;
        }
        if (this.ball.body.velocity.y < 0) {
            this.ball.body.velocity.y += 0.1;
        }
    }

    createAnimations() {
        this.anims.create({
            key: `avatar-idle`,
            frames: this.anims.generateFrameNumbers(`avatarStep`, {
                start: 14,
                end: 14
            }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: `avatar-step`,
            frames: this.anims.generateFrameNumbers(`avatarStep`, {
                start: 0,
                end: 14
            }),
            frameRate: 24,
            repeat: -1
        });
    }
}

