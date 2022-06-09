/* global Phaser */
//copyright (c) Mr. Coxall
//modified by Carolyn
//2022

//the Game rules js file

//this is to display the rules of the game. After clicking the (H) button, it will switch to the game scene and start the game.

//function to extend Phaser's code
class GameRules extends Phaser.Scene {
	//function to run Phaser's scene constructor code which will construct the scene
  constructor () {
    super({ key: 'gameRules' })
 
		this.gameRulesBackgroundImage = null
  }

//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

//function to load the images and print out the function for debugging purposes
  preload () {
    console.log('Game Rules')
		this.load.image('gameRulesbackground', 'assets/gameRules.jpg')
  }

	//to place the images and put it on the screen
  create (data) {
		this.gameRulesBackgroundImage = this.add.sprite(0,0,'gameRulesBackground')
		this.gameRulesBackgroundImage.x = 1920 / 2
		this.gameRulesBackgroundImage.y = 1080 / 2
  }

	//
  update (time, delta) {
		document.addEventListener("keyup", function(event) {
    if (event.keyCode === 72) {
       this.scene.start('gameScene')
    }
		})
  }
	}

export default GameRules