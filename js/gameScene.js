/* global Phaser */
//copyright (c) Mr. Coxall
//modified by Carolyn
//2022

//the game js file

//function to extend Phaser's code
class GameScene extends Phaser.Scene {
	//create a meteor to fall randomly from one point at the top and fall down to the bottom
	createAlien() {
		const alienXLocation = Math.floor(Math.random() * 1920) + 1
		//to make the meteor move in different directions and not just straight down
		let alienXVelocity = Math.floor(Math.random() * 50) + 1
		alienXVelocity *= Math.round(Math.random()) ? 1 : -1
		const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
		anAlien.body.velocity.y = 200
		anAlien.body.velocity.x = alienXVelocity
		this.alienGroup.add(anAlien)
		var alienYLocation = (anAlien.x, anAlien.y)
	}
	//function to run Phaser's scene constructor code which will construct the scene
  constructor () {
    super({ key: 'gameScene' })
		
		this.background = null
		this.ship = null
		this.fireMissile = false
		//the variable that will hold the score: First set to zero
		this.score = 99
		//to display the score text
		this.scoreText = null
		//score font, size, and colour
		this.scoreTextStyle = {font: '65px Arial', fill: "#ffffff", align: 'center'}
		this.gameOverTextStyle = {font: '65px Arial', fill: "#ff0000", align: 'center'}
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
		this.load.image('alien', 'assets/meteor.png')
		this.load.image('gameOver', 'assets/gameOver.png')
		this.load.image('meteorDeath', 'assets/explosion.png')
		this.load.image('gameWin', 'assets/youWin.jpg')
		//sounds
		this.load.audio('laser','sounds/dinoRoar.mp3')
		this.load.audio('explosion', 'sounds/explosion.mp3')
  }

	//function to place the image in the center of the screen and change the size
  create (data) {
		this.background = this.add.image(0,0, 'starBackground').setScale(3.5)
		this.background.setOrigin(0,0)
		//to show the score on the screen
		this.scoreText = this.add.text(10,10, 'Score ' + this.score.toString(), this.scoreTextStyle)
		
		//to give the sprites physics with collisions 
		//for the dinosaur sprite (ship), it will also be placed at the bottom of the screen
		this.ship = this.physics.add.sprite(1920 / 2, 1080 - 250, 'ship')
		this.missileGroup = this.physics.add.group()

		//group for the meteor
		this.alienGroup = this.add.group()
		this.createAlien()
		
		//to add collisions between the sound waves and meteors
		this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide,){
			//var variable for the explosion that plays after the meteor is hit from the missile
			var meteorDeath = this.physics.add.sprite(alienCollide.x, alienCollide.y, 'meteorDeath')

			//if the missile touches a meteor, the function is triggered and they are both destroyed then two meteors show up
			alienCollide.destroy()
			missileCollide.destroy()
			
			//destroy the explosion image after .5 seconds
			setTimeout(function(){
			meteorDeath.destroy()
			}, 500);
			
			//explosion sound plays
			this.sound.play('explosion')
			//score gets updated
			this.score = this.score + 1
			this.scoreText.setText('Score: ' + this.score.toString())
			//new meteors are created
			this.createAlien()
			this.createAlien()
		}.bind(this))

			//to make the Game Over screen
			this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide){
			this.sound.play('explosion')
			this.physics.pause()
			alienCollide.destroy()
			shipCollide.destroy()
				//score is reset
			//this.score = 0
				//game over screen is showm
			this.background = this.add.image(1920 / 2, 1080 / 2, 'gameOver')
			this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over! Click to play again.", this.gameOverTextStyle).setOrigin(0.5)
				//when you click on the text, it resets back to the game scene
			this.gameOverText.setInteractive({useHandCursor: true})
			this.gameOverText.on('pointerdown', () => this.scene.start ('gameScene'))
			
			/*this.background = this.add.image(1920 / 2, 1080 / 2, 'gameWin')
			this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "You win! Click to play again.", this.gameOverTextStyle).setOrigin(0.5)
				//score is reset
				this.score = 0
				//when you click on the text, it resets back to the game scene
			this.gameOverText.setInteractive({useHandCursor: true})
			this.gameOverText.on('pointerdown', () => this.scene.start ('gameScene')) */
		}.bind(this))
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
				const aNewMissile = this.physics.add.sprite(this.ship.x-60, this.ship.y-100, 'missile')
				this.missileGroup.add(aNewMissile)
				//to play the sound when it fires
				this.sound.play('laser')
			}
		}
		//to check and make sure the spacebar has been lifted up to be able to reset so you can fire multiple missiles
		if (keySpaceObj.isUp === true){
			this.fireMissile = false
		}
		//each missile group will run a function
		this.missileGroup.children.each(function (item){
			//for each item (the missile), it will change the y value and move it upwards
			item.y = item.y - 15
			//to check if the missile has left the screen. If so, it will be DESTROYED
			if (item.y < 0){
				item.destroy()
			}
		})
		
		//incase you don't hit any meteors, a new one will appear at the start
		this.alienGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.y = -10
        item.x = Math.floor(Math.random() * 1920 + 1)
      }
    })
  }
	
}

export default GameScene