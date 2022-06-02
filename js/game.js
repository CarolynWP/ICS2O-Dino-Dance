/* global Phaser */
//copyright Mr. Coxall
//modified by Carolyn
//2022

import SplashScene from './splashScene.js'


//The game scene constant
const splashScene = new SplashScene()

const config = {
	type: Phaser.AUTO,
	//standard screen size to use for the game
	width: 1920,
	height: 1080,
	//Phaser's Arcade physics for collision detection between different objects
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	backgroundColor: 0x5f6e7a,
	
	//the scale to automatically change the size of the screen depending on how large or small your device is
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	}
}

const game = new Phaser.Game(config)

//load the scenes
//any key is global and cannot be reused
game.scene.add('splashScene', splashScene)

//the starting title
game.scene.start('splashScene')