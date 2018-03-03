class Stripe extends Entity{
	constructor(context, pos, props){
		super(context, pos, props)
		this.anchor.setTo(0.5, 0)
		this.scale.setTo(0.2, 2)
		this.TOP_Y = -1
		this.BOTTOM_Y  = this.game.world.height
		this.INIT_Y = props.init_y
		this.DIRECTION = props.direction
		this.isMoving = true
	}

	stopMoving(){
		this.isMoving = false
		this.body.velocity.y = 0
	}

	update(){
		if(this.isMoving){
			this.body.velocity.y = this.context.stripe_speed * this.DIRECTION
		}

		if(this.body.position.y <= this.TOP_Y ||
			this.body.position.y >= this.BOTTOM_Y
		){
			this.body.position.y = this.INIT_Y
		}
	}
}
