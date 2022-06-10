/* global Phaser */
//copyright (c) Mr. Coxall
//modified by Carolyn
//2022

//the Rules Scene JS file

class RuleScene extends Phaser.Scene {
		//function to run Phaser's scene constructor code which will construct the scene
	constructor() {
		super({ key: "ruleScene" })

		this.ruleSceneBackgroundImage = null
	}
//function to initialize and get the scene running
	init(data) {
		this.cameras.main.setBackgroundColor("ffffff") 
	}

	preload() {
		console.log("Rule Scene")
		//load the image for the rules scene
		this.load.image('ruleSceneBackground', './assets/gameRules.jpg')
	}
	//to place the rules scene image in an x y coordinate
	create(data) {
		this.ruleSceneBackgroundImage = this.add.sprite(0,0,'ruleSceneBackground').setScale(2.75)
		//to put it in the middle of our scene
		this.ruleSceneBackgroundImage.x = 1920 / 2
		this.ruleSceneBackgroundImage.y = 1080 / 2
	}
	//Once you press the letter H, it will switch to the game scene.
	update(time, delta) {
		//constant for the H key
    const keyLeftObj = this.input.keyboard.addKey('H')
		 if (keyLeftObj.isDown  === true){
			//if the H key has been pressed down, switch to the game scene
			this.scene.start('gameScene')
		}
	}
}

export default RuleScene  