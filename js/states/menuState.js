lame.MenuState = class MenuState{
	init(levelData){
		this.levelData = levelData
		this.highestScore = Math.max(
			this.levelData.score || 0,
			this.highestScore || 0
		)
	}

	create(){
		this.cursors = this.game.input.keyboard.createCursorKeys()

		// start game text
		let text = 'Tap or press down/up arrow to begin'
		let style = {
			font: '30px Arial',
			fill: '#fff',
			align: 'center'
		}
		const t = this.game.add.text(
			this.game.width/2, this.game.height / 2,
			text,
			style
		)
		t.anchor.set(0.5)

		// highest score
		text = 'Highest score: ' + this.highestScore
		style = {
			font: '15px Arial',
			fill: '#fff',
			align: 'center'
		}
		const h = this.game.add.text(
			this.game.width/2,
			this.game.height/2 + 50,
			text,
			style
		)
		h.anchor.set(0.5)
	}

	update(){
		if(this.game.input.activePointer.justPressed() ||
			this.cursors.down.justPressed() ||
			this.cursors.up.justPressed()
		){
			this.game.state.start(
				'gameState',
				true,
				false,
				this.levelData
			)
		}
	}
}
