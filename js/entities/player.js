class Player extends Entity{
	constructor(...args){
		super(...args)

		this.frame = 0
		this.scale.setTo(1)
		this.anchor.setTo(0.5)

		// add le physics
		this.game.physics.arcade.enable(this)
		this.body.collideWorldBounds = true

		this.SHIFT_DIST = 15000
		this.SHIFT_SPEED = 500
		this.distance_shifted = 0
		this.shift_direction = 0
	}

	shift(){
		this.body.velocity.x = this.SHIFT_SPEED * this.shift_direction
		this.distance_shifted += Math.abs(this.body.velocity.x)

		if(this.distance_shifted >= this.SHIFT_DIST){
			this.distance_shifted = 0
			this.shift_direction = 0
			this.body.velocity.x = 0
		}else if(this.shift_direction !== 0){
			console.log('shifting')
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