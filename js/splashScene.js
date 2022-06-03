/* global Phaser */
//copyright Mr. Coxall
//modified by Carolyn
//2022

//the splash scene js file

//function to extend Phaser's code
class SplashScene extends Phaser.Scene {
		//function to run Phaser's scene constructor code which will construct the scene
	constructor() {
		super({ key: "splashScene" })

		this.splashSceneBackgroundImage = null
	}
//function to initialize and get the scene running
	init(data) {
		this.cameras.main.setBackgroundColor("ffffff") 
	}

	preload() {
		console.log("Splash Scene")
		//load the image for the splash screen
		this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
	}
	//to place the splash scene image in an x y coordinate
	create(data) {
		this.splashSceneBackgroundImage = this.add.sprite(0,0,'splashSceneBackground')
		//to put it in the middle of our scene
		this.splashSceneBackgroundImage.x = 1920 / 2
		this.splashSceneBackgroundImage.y = 1080 / 2
	}
	//on the very first update it will switch from the splash scene to the title scene
	update(time, delta) {
		//to make the splash screen last longer
		if (time > 3000){
			this.scene.switch("titleScene")
		}
	}
}

export default SplashScene  