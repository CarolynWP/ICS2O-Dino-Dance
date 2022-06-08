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
		this.fireMissile = false
  }

	//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

	//function to print out the console for debugging purposes and load the images needed
  preload () {
    console.log('Game Scene')
		//images
		this.load.image('starBackground', '/assets/gameBackground.jpg')
		this.load.image('ship', 'assets/dinoSprite.png')
		this.load.image('missile','assets/soundMissile.png')
  }

	//funcgtion to place the image in the center of the screen and change the size
  create (data) {
		this.background = this.add.image(0,0, 'starBackground').setScale(3.5)
		this.background.setOrigin(0,0)
		
		//to give the sprites physics with collisions 
		//for the dinosaur sprite (ship), it will also be placed at the bottom of the screen
		this.ship = this.physics.add.sprite(1920 / 2, 1080 - 250, 'ship').setScale(1.5)
		this.missileGroup = this.physics.add.group()
  }

  update (time, delta) {
		//to be able to use your keys to move the dinosaur and allow it to shoot missiles
		const keyLeftObj = this.input.keyboard.addKey('LEFT')
		const keyRightObj = this.input.keyboard.addKey('RIGHT')
		const keySpaceObj = this.input.keyboard.addKey('SPACE')
		
		//IF statement if the left key is down 
		 if (keyLeftObj.isDown  === true){
			//if the left key is down, move it to the left
			this.ship.x = this.ship.x - 15
			
			//to make sure it can't go off the screen
			if (this.ship.x < 0) {
				this.ship.x = 0
			}
		}
		//IF statement if the right key is down
			if (keyRightObj.isDown  === true){
			//if the right key is down, move it to the right
			this.ship.x += 15

				//to make sure it can't go off the screen
			if (this.ship.x > 1920) {
				this.ship.x = 1920
			}
		} 
		//IF statement if the spacebar is down
		if (keySpaceObj.isDown === true){
			if (this.fireMissile === false){
				//if the spacebar is down, a missile is fired
			this.fireMissile = true
			const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
			this.missileGroup.add(aNewMissile)
			}
		}
		//to check and make sure the spacebar has been lifted up to be able to reset so you can fire multiple missiles
		if (keySpaceObj.isUp === true){
			this.fireMissile = false
		}
  }
	
}

export default GameScene