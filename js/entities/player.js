class Player extends Entity{
	constructor(context, pos, props){
		super(context, pos, props)

		this.frame = 0
		const scale = 1
		this.scale.setTo(scale, scale * props.direction)
		this.anchor.setTo(0.5)

		this.animations.add('run', [0,1,2,3,4,5], 12, true)
		this.animations.play('run')

		// add le physics
		this.game.physics.arcade.enable(this)
		this.body.collideWorldBounds = true

		this.SHIFT_DIST = 15000
		this.SHIFT_SPEED = 500
		this.distance_shifted = 0
		this.shift_direction = 0
		this.shift_position = 0
	}

	canShift(direction){
		return  this.shift_position !== direction
	}
	
	shift(){
		this.body.velocity.x = this.SHIFT_SPEED * this.shift_direction
		this.distance_shifted += Math.abs(this.body.velocity.x)

		if(this.distance_shifted >= this.SHIFT_DIST){
			this.distance_shifted = 0
			this.shift_position += this.shift_direction
			this.shift_direction = 0
			this.body.velocity.x = 0
		}
	}
	
	update(){
		this.shift()
	}

	collectItem(player, item){
		item.kill()
		item.activateEffect(player)
	}

	hitEnemy(player, enemy){
		console.log('colliding with the enemy')
	}
}