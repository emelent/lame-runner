class Obstacle extends Entity{
	constructor(context, pos, props){
		super(context, pos, props)

		this.scale.setTo(2.5)
		this.anchor.setTo(0.5, 1)
		const delta = 100
		this.TOP_Y = - delta
		this.INIT_Y = this.game.world.height / 2
		this.BOTTOM_Y  = this.game.world.height + delta
		this.exists = false
	}

	activate(x, direction, speed){
		this.body.x = x
		this.body.position.y = this.INIT_Y
		if(direction > 0)
			this.body.position.y += 10
		this.body.velocity.y = direction * speed
		this.exists = true
		// console.log('activating');
	}

	hide(){
		this.exists = false
		this.body.velocity.y = 0
	}

	update(){
		if(this.body.position.y < this.TOP_Y ||
			this.body.position.y > this.BOTTOM_Y
		){
			this.context.nextObstacles()
		}
	}
}