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
  }

//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

//function to print out the console for debugging purposes
  preload () {
    console.log('Menu Scene')
  }

  create (data) {
  }

  update (time, delta) {
  }
}

export default MenuScene