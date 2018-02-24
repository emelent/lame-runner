lame.BootState = class BootState{
	init(level_file){
		this.level_file = level_file
	}

	preload(){
		this.load.image(
			'preloadbar', 
			'./assets/images/preloader-bar.png'
		)
    	this.load.text(
    		'level1',
    		this.level_file
    	)
	}

	create(){
		this.game.stage.backgroundColor = '#000'

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
		this.scale.pageAlignVertically = true
		this.scale.pageAlignHorizontally = true


		let level_text = this.game.cache.getText("level1"),
	    	level_data = JSON.parse(level_text)
	    this.game.state.start(
	    	'loadState',
	    	true, 
	    	false, 
	    	level_data
	    )
	}
}