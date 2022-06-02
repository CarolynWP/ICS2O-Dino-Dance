/* global Phaser */
//copyright Mr. Coxall
//modified by Carolyn
//2022

//the splash scene js file

//function to extend Phaser's code
class SplashScene extends Phaser.Scene {
		//function to run Phaser's scene constructor code which will construct the scene
	constructor () {
		super({ key: 'splashScene' })
}
//function to initialize and get the scene running
	init (data) {
		this.cameras.main.setBackgroundColor('c5e6e6') 
	}
	//function to print out the console for debugging purposes
	preload () {
		console.log('Splash Scene')
	}
	
	create (data) {
	}
	
	update (time, delta) {
	}
}

export default SplashScene