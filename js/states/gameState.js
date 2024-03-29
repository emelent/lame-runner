lame.GameState = class GameState{

	// SPECIAL METHODS

	init(levelData){
		this.levelData = levelData
		this.score = 0
		this.isGameOver = false
	}

	create(){

		// activate physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE)

		this.cursors = this.game.input.keyboard.createCursorKeys()

		this.createGroups()

		this.road_width = 150
		this.obstacle_speed = 300
		this.stripe_speed = 320

		this.counter = setInterval(() => {
			this.score++
		}, 1000)
		this.createSideWalk()
		this.createStripes()
		this.createObstacles()
		this.nextObstacles()
		this.createItems()
		this.createPlayers()
		this.createCover()

		let style = {
			font: '30px Arial',
			fill: '#fff',
			align: 'center'
		}
		this.scoreText = this.game.add.text(
			this.game.width/2, this.game.height / 2 - 20,
			'Score: 0',
			style
		)
	}

	update(){
		this.scoreText.text = 'Score: ' + this.score
		if(this.player1.distance_shifted === 0){
			if(this.cursors.left.isDown && this.player1.canShift(1)){
				this.player1.shift_direction = 1
				this.player2.shift_direction = -1
			}else if(this.cursors.right.isDown && this.player1.canShift(-1)){
				this.player1.shift_direction = -1
				this.player2.shift_direction = 1
			}
		}
	}

	// CUSTOM METHODS
	createObstacles(){
		const pos = {x: 0,y: 0}
		const props = {
			texture: 'temp',
			initial_frame: 0,
			group: 'traps'
		}
		this.obstacles = []
		for(let i=0; i < 4; i++){
			this.obstacles.push(new Obstacle(this, pos, props))
		}
	}


	generateObstacles(){
		let obs1 = []
		let numX = randomInteger(1, 3)
		let possiblePos = [-1, 0, 1]

		// generate first row of obstacles
		for(let i=0; i < numX; i++){
			const pos = pickRandom(possiblePos)
			obs1.push(pos)
			// remove used pos from possibilities
			possiblePos = possiblePos.filter(x => x !== pos)
		}

		let obs2 = obs1.map(x => x * -1)
		if(Math.random() > 0){ // don't mirror
			if(obs2.length === 2){// go one less
				obs2.pop()
			}else{ // go one more
				obs2.push(pickRandom(
					[-1, 0, 1].filter(x => x !== obs2[0])
				))
			}
		}

		// transform to coords
		const x = this.game.world.width / 2
		const delta = 150
		obs1 = obs1.map(v => x + (delta * v))
		obs2 = obs2.map(v => x + (delta * v))
		return {obs1, obs2}
	}

	nextObstacles(){
		if(this.isGameOver)
			return

		this.obstacles.forEach(obs => obs.hide())
		const {obs1, obs2} = this.generateObstacles()

		obs1.forEach((x, i) =>
			this.obstacles[i].activate(x, -1, this.obstacle_speed)
		)

		let idx = obs1.length
		obs2.forEach((x, i) =>
			this.obstacles[idx + i].activate(x, 1, this.obstacle_speed)
		)
	}

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
			texture: 'player',
			group: 'players',
			road_width: this.road_width,
			initial_frame: 0,
			direction: -1
		}

		const p2Props = Object.assign({}, p1Props, {
			initial_frame: 1,
			direction: 1
		})

		this.player1 = new Player(this, p1StartPos, p1Props)
		this.player2 = new Player(this, p2StartPos, p2Props)

	}

	createCover(){
		const cover = this.game.add.sprite(0, this.game.world.height / 2, 'temp')
		cover.frame = 4
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
		const road_width = this.road_width

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
				x: x - road_width/2,
				y: init_y - (gap * i)
			}, props))
		}
		for(let i=0; i < 5; i++){
			stripes.push(new Stripe(this, {
				x: x + road_width/2,
				y: init_y - (gap * i)
			}, props))
		}

		for(let i=0; i < 5; i++){
			stripes.push(new Stripe(this, {
				x: x - road_width/2,
				y: init_y + (gap * i)
			}, Object.assign({}, props, {direction: 1})))
		}

		for(let i=0; i < 5; i++){
			stripes.push(new Stripe(this, {
				x: x + road_width/2,
				y: init_y + (gap * i)
			}, Object.assign({}, props, {direction: 1})))
		}

		this.stripes = stripes;
	}

	stopStripes(){
		this.stripes.forEach(stripe => stripe.stopMoving())
	}

	createSideWalk(){
		const s1 = this.game.add.sprite(0, 0, 'temp')
		s1.frame = 7
		s1.scale.setTo(6, 54)
		const s2 = this.game.add.sprite(
			this.game.world.width, 0, 'temp')
		s2.frame = 7
		s2.scale.setTo(6, 54)
		s2.anchor.setTo(1, 0)
	}
	createItems(){
		this.items = []

	}

	restartLevel(){
    	this.game.state.restart(true, false, this.levelData)
	}

	gameOver(){
		this.isGameOver = true
		clearInterval(this.counter)
		this.levelData.score = this.score
		this.player1.animations.stop();
		this.player2.animations.stop();
		this.stopStripes()

		setTimeout(() => {
			this.game.state.start(
				'menuState',
				true,
				false,
				this.levelData
			)
		}, 2000)
	}
}
