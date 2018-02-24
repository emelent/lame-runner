lame.GameState = class GameState{

	// SPECIAL METHODS

	init(levelData){
		this.levelData = levelData
	}

	create(){

		// activate physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
		
		this.cursors = this.game.input.keyboard.createCursorKeys()

		this.createGroups()

		this.createStripes()
		this.createItems()
		this.createPlayers()
		this.createCover()
	}

	update(){
		if(this.player1.distance_shifted === 0){
			if(this.cursors.left.justPressed() && this.player1.canShift(-1)){
				this.player1.shift_direction = -1
				this.player2.shift_direction = 1
			}else if(this.cursors.right.justPressed() && this.player1.canShift(1)){
				this.player1.shift_direction = 1
				this.player2.shift_direction = -1
			}
		}
	}

	// CUSTOM METHODS

	createGroups(){
		this.groups = {}
		this.levelData.groups.forEach(groupName => {
			this.groups[groupName] = this.game.add.group()
		})
	}

	createPlayers(){
		const width = this.game.world.width / 2
		const p1StartPos = {
			x: width,
			y: 0,
		}
		const p2StartPos = {
			x: width,
			y: this.game.world.height
		}
		const p1Props = {
			texture: 'temp',
			initial_frame: 0,
			group: 'players'
		}
		const p2Props = {
			texture: 'temp',
			initial_frame: 1,
			group: 'players'
		}

		this.player1 = new Player(this, p1StartPos, p1Props)
		this.player2 = new Player(this, p2StartPos, p2Props)

	}

	createCover(){
		const cover = this.game.add.sprite(0, 300, 'temp')
		cover.frame = 5
		cover.scale.setTo(50, 4)
		cover.anchor.setTo(0, 0.5)
		this.cover = cover
	}

	createStripes(){
		const stripes = []
		const x = this.game.world.width / 2
		const init_y = this.game.world.height / 2 - 50
		const gap = 100
		const speed = 300

		const props = {
			direction: -1,
			group: 'background',
			texture: 'temp',
			initial_frame: 3,
			init_y,
			speed
		}
		for(let i=0; i < 5; i++){
			stripes.push(new Stripe(this, {
				x: x - 120,
				y: init_y - (gap * i)
			}, props))
		}
		for(let i=0; i < 5; i++){
			stripes.push(new Stripe(this, {
				x: x + 120,
				y: init_y - (gap * i)
			}, props))
		}

		for(let i=0; i < 5; i++){
			stripes.push(new Stripe(this, {
				x: x - 120,
				y: init_y + (gap * i)
			}, Object.assign({}, props, {direction: 1})))
		}

		for(let i=0; i < 5; i++){
			stripes.push(new Stripe(this, {
				x: x + 120,
				y: init_y + (gap * i)
			}, Object.assign({}, props, {direction: 1})))
		}
	}
	createItems(){
		this.items = []
		
	}

	restartLevel(){
    	this.game.state.restart(true, false, this.levelData)
	}
}
