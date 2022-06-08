/* global Phaser */
//copyright(c) Mr. Coxall
//modified by Carolyn
//2022

//the title scene js file

//function to extend Phaser's code
class TitleScene extends Phaser.Scene {
	//function to run Phaser's scene constructor code which will construct the scene
  constructor () {
		super({ key: 'titleScene' })
		//to insert the title scene image
		this.titleSceneBackgroundImage = null
		//insert text
		this.titleSceneText = null
		//to change the font colour, style, and size
		this.titleSceneTextStyle = { font: '50px Times', fill: '#008515', align: 'center' } 
	}

//function to initialize and get the scene running
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

//function to print out the console for debugging purposes as well as load the image
  preload () {
    console.log('Title Scene')
		this.load.image('titleSceneBackground', 'assets/Title_Scene.png')
  }

	//to place the image and put it on the screen
  create (data) {
		this.titleSceneBackgroundImage = this.add.sprite(0,0,'titleSceneBackground')
		//to put it in the middle of our scene
		this.titleSceneBackgroundImage.x = 1920 / 2
		this.titleSceneBackgroundImage.y = 1080 / 2
		//to add text on top of the image
		this.titleSceneText = this.add.text(1920 / 2, (1080 / 2)+ 350, 'Copyright 2022', this.titleSceneTextStyle).setOrigin(0.5)
  }

  update (time, delta) {
		if (time > 6500)
			this.scene.switch('menuScene')
  }
}

export default TitleScene