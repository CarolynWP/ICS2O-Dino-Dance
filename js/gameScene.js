/* global Phaser */
//copyright (c) Mr. Coxall
//modified by Carolyn
//2022

//the game js file

//function to extend Phaser's code
class GameScene extends Phaser.Scene {
	//function to run Phaser's scene constructor code which will construct the scene
  constructor () {
    super({ key: 'gameScene' })

		this.background = null
		this.ship = null
  }

	//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

	//function to print out the console for debugging purposes and load the image needed
  preload () {
    console.log('Game Scene')

		this.load.image('starBackground', '/assets/gameBackground.jpg')
		this.load.image('ship', 'assets/dinoSprite.png')
  }

	//funcgtion to place the image in the center of the screen and change the size
  create (data) {
		this.background = this.add.image(0,0, 'starBackground').setScale(3.5)
		this.background.setOrigin(0,0)
		
		//to give the dinosaur sprite physics with collisions and place it near the bottom of the screen
		this.ship = this.physics.add.sprite(1920 / 2, 1080 - 250, 'ship').setScale(1.5)
  }

  update (time, delta) {
		//to be able to move the dinosaur sprite
		const keyLeftObj = this.input.keyboard.addkey('LEFT')
		const keyRightObj = this.input.keyboard.addkey('RIGHT')
		
		//IF statement if the left key is down 
		if (keyLeftObj.isDown  === true){
			//if the left key is down, move it to the left
			this.ship.x = this.ship.x - 20
			
			//to make sure it can't go off the screen
			if (this.ship.x < 0) {
				this.ship.x = 0
			}
		}
		//IF statement if the right key is down
			if (keyRightObj.isDown  === true){
			//if the right key is down, move it to the right
			this.ship.x += 20

				//to make sure it can't go off the screen
			if (this.ship.x > 1920) {
				this.ship.x = 1920
			}
		}
  }
}

export default GameScene