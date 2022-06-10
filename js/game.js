/* global Phaser */
//copyright Mr. Coxall
//modified by Carolyn
//2022

/* global phaser */

//bringing in the javascript files
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"
import RuleScene from "./gameRules.js"

//The game scene constants
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const ruleScene = new RuleScene()

//start the Phaser game
const config = {
  type: Phaser.AUTO,
	//standard screen size to use for the game
  width: 1920,
  height: 1080,
	//Phaser's Arcade physics for collision detection between different objects
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  //Background colour of the game
  backgroundColor: 0xffffff,
	//the scale to automatically change the size of the screen depending on how large or small your device is
  scale: {
    mode: Phaser.Scale.FIT,
    // Placing it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

//load the scenes to the game and manage them
//the words in quotations are keys. They are global and cannot be reused
game.scene.add('splashScene', splashScene)
game.scene.add('titleScene', titleScene)
game.scene.add('menuScene', menuScene)
game.scene.add('gameScene', gameScene)
game.scene.add('ruleScene', ruleScene)

//to start displaying the scenes
game.scene.start("splashScene") 