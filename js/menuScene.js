/* global Phaser */
//copyright (c) Mr. Coxall
//modified by Carolyn
//2022

//the menu js file

//function to extend Phaser's code
class MenuScene extends Phaser.Scene {
	//function to run Phaser's scene constructor code which will construct the scene
  constructor () {
    super({ key: 'menuScene' })
 
		this.menuSceneBackgroundImage = null
		//to add the button
		this.startButton =  null
  }

//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

//function to load the images and print out the function for debugging purposes
  preload () {
    console.log('Menu Scene')
		this.load.image('menuSceneBackground', 'assets/Dino_Dance.png')
		this.load.image('startButton', 'assets/startButton.webp')
  }

	//to place the images and put it on the screen
  create (data) {
		this.menuSceneBackgroundImage = this.add.sprite(0,0,'menuSceneBackground')
		this.menuSceneBackgroundImage.x = 1920 / 2
		this.menuSceneBackgroundImage.y = 1080 / 2

		this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
		//to be able to use the button and make it interactive
		this.startButton.setInteractive({ useHandCursor: true})
		this.startButton.on('pointerdown',() => this.clickButton())
  }

	//to make the button do something and start the game scene
  update (time, delta) {
  }
	clickButton (){
		this.scene.start('ruleScene')
	}
}

export default MenuScene