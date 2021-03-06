lame.LoadState = class LoadState{
	init(level_data){
		this.level_data = level_data
	}

	preload(){
		this.preloadBar = this.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY + 128,
			'preloadbar'
		)
		this.preloadBar.anchor.setTo(0.5)
		this.load.setPreloadSprite(this.preloadBar)

		// LOAD SOME SPRITESHEETS
		this.load.spritesheet(
			'temp',
			'./assets/images/temp.png', 
			16, 16
		)
		this.load.spritesheet(
			'player',
			'./assets/images/player.png', 
			64, 80
		)


		// LOAD SOME SOUNDS
		this.load.audio('collect', 'assets/sounds/pickup.wav')
	}

	create(){
		this.state.start(
			'menuState', 
			true,
			false,
			this.level_data
		)
	}
}