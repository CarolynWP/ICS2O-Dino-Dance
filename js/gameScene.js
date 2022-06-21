/* global Phaser */
//copyright (c) Mr. Coxall
//modified by Carolyn
//2022

//the game js file

//function to extend Phaser's code
class GameScene extends Phaser.Scene {
	//create a meteor to fall randomly from one point at the top and fall down to the bottom
	createMeteor() {
		const meteorXLocation = Math.floor(Math.random() * 1920) + 1
		//to make the meteor move in different directions and not just straight down
		let meteorXVelocity = Math.floor(Math.random() * 50) + 1
		meteorXVelocity *= Math.round(Math.random()) ? 1 : -1
		const aMeteor = this.physics.add.sprite(meteorXLocation, -100, 'meteor')
		aMeteor.body.velocity.y = 200
		aMeteor.body.velocity.x = meteorXVelocity
		this.meteorGroup.add(aMeteor)
		var meteorYLocation = (aMeteor.x, aMeteor.y)
	}
	//function to run Phaser's scene constructor code which will construct the scene
  constructor () {
    super({ key: 'gameScene' })
		this.background = null
		this.dino = null
		this.fireWave = false
		//the variable that will hold the score: First set to zero
		this.score = 70
		//to display the score text
		this.scoreText = null
		//text font, size, and colour
		this.scoreTextStyle = {font: '65px Arial', fill: "#ffffff", align: 'center'}
		this.gameOverTextStyle = {font: '65px Arial', fill: "#ff0000", align: 'center'}
		this.gameWinTextStyle = {font: '65px Arial', fill: "#ff0000", align: 'center'}
  }

	//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

	//function to print out the console for debugging purposes and load the images needed
  preload () {
    console.log('Game Scene')
		//images
		this.load.image('dino', 'assets/dinoSprite.png');			 
		this.load.image('wave','assets/soundMissile.png');
		this.load.image('meteor', 'assets/meteor.png');
		this.load.image('background', 'assets/gameBackground.jpg');
		this.load.image('gameOver', 'assets/gameOver.gif');
		this.load.image('death', 'assets/explosion.png');
		this.load.image('gameWin', 'assets/youWin.gif');
		//sounds
		this.load.audio('roar','sounds/dinoRoar.mp3');
		this.load.audio('explosion', 'sounds/explosion.mp3');
		this.load.audio('gameMusic', 'sounds/gameMusic.mp3');
		this.load.audio('loseMusic', 'sounds/loseMusic.mp3');
		this.load.audio('winMusic', 'sounds/winMusic.mp3');
  }


	
	//function to place the image in the center of the screen and change the size
  create (data) {
		//stop other sounds (such as previous lose or win music) from playing
		this.sound.stopAll()
		//game music
		this.sound.play('gameMusic')
		//loads and adds the background image
		this.background = this.add.image(0,0, 'background').setScale(3.5)
		this.background.setOrigin(0,0)
		//to show the score on the screen
		this.scoreText = this.add.text(10,10, 'Score ' + this.score.toString(), this.scoreTextStyle)
		
		//to give the sprites physics with collisions 
		//for the dinosaur sprite, it will also be placed at the bottom of the screen
		this.dino = this.physics.add.sprite(1920 / 2, 1080 - 250, 'dino')
		this.waveGroup = this.physics.add.group()

		//group for the meteor
		this.meteorGroup = this.add.group()
		this.createMeteor()
		
		//to add collisions between the sound waves and meteors
		this.physics.add.collider(this.waveGroup, this.meteorGroup, function (meteorCollide, waveCollide,){
		//var variable for the explosion that plays after the meteor is hit from the sound wave
		var meteorDeath = this.physics.add.sprite(meteorCollide.x, meteorCollide.y, 'death')

		//if the wave touches a meteor, the function is triggered and they are both destroyed
		meteorCollide.destroy()
		waveCollide.destroy()
		
		//destroy the explosion image after .5 seconds
		setTimeout(function(){
		meteorDeath.destroy()
		}, 500);
		
		//explosion sound plays
		this.sound.play('explosion')
		//score gets updated
		this.score = this.score + 1
		this.scoreText.setText('Score: ' + this.score.toString())
		
		//if the player gets a score of 100, the win screen will be shown
		if (this.score === 100){
			this.physics.pause()
			this.sound.stopAll()
			this.background = this.add.image(1920 / 2, 1080 / 2, 'gameWin')
			this.gameWinText = this.add.text(1920 / 2, 1080 / 2, "You win! Click to play again.", this.gameWinTextStyle).setOrigin(0.5)
			//winning music plays
			this.sound.play('winMusic')
			//score is reset
			this.score = 0
			//when you click on the text, it resets back to the game scene
			this.gameWinText.setInteractive({useHandCursor: true})
			this.gameWinText.on('pointerdown', () => this.scene.start ('gameScene')) 
			}
			else {
				//new meteors are created
				this.createMeteor()
				this.createMeteor()
			}
		}.bind(this))

			//to make the Game Over screen
			this.physics.add.collider(this.dino, this.meteorGroup, function (dinoCollide, meteorCollide){
				//stops previous sounds
			  this.sound.stopAll()
				this.sound.play('explosion')
				this.physics.pause()
				meteorCollide.destroy()
				dinoCollide.destroy()
				//losing music plays
				this.sound.play('loseMusic')
				//start the game over scene
				this.background = this.add.image(1920 / 2, 1080 / 2, 'gameOver')
				this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over! Click to play again.", this.gameOverTextStyle).setOrigin(0.5)
				//score is reset
				this.score = 0
				//game over screen is show
				//when you click on the text, it resets back to the game scene
				this.gameOverText.setInteractive({useHandCursor: true})
				this.gameOverText.on('pointerdown', () => this.scene.start ('gameScene'))
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
			this.dino.x = this.dino.x - 15
			
			//to make sure it can't go off the screen
			if (this.dino.x < 0) {
				this.dino.x = 1920
			}
		}
		//IF statement if the right key is down
			if (keyRightObj.isDown  === true){
			//if the right key is down, move it to the right
			this.dino.x += 15
			}
				//to make sure it can't go off the screen
			if (this.dino.x > 1920) {
				this.dino.x = 0
			} 
		//IF statement if the spacebar is down
		if (keySpaceObj.isDown === true){
			if (this.fireWave === false){
				//if the spacebar is down, a missile is fired
				this.fireWave = true
				const aNewWave = this.physics.add.sprite(this.dino.x-60, this.dino.y-100, 'wave')
				this.waveGroup.add(aNewWave)
				//to play the sound when it fires
				this.sound.play('roar')
			}
		}
		//to check and make sure the spacebar has been lifted up to be able to reset so you can fire multiple sound waves
		if (keySpaceObj.isUp === true){
			this.fireWave = false
		}
		//each wave group will run a function
		this.waveGroup.children.each(function (item){
			//for each item (the wave), it will change the y value and move it upwards
			item.y = item.y - 15
			//to check if the wave has left the screen. If so, it will be DESTROYED
			if (item.y < 0){
				item.destroy()
			}
		})
		
		//incase you don't hit any meteors, a new one will appear at the start
		this.meteorGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.y = -10
        item.x = Math.floor(Math.random() * 1920 + 1)
      }
    })
  }
}

export default GameScene