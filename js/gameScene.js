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
  }

//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

//function to print out the console for debugging purposes
  preload () {
    console.log('Game Scene')
  }

  create (data) {
  }

  update (time, delta) {
  }
}

export default GameScene