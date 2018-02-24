class Stripe extends Entity{
	constructor(context, pos, props){
		super(context, pos, props)
		this.anchor.setTo(0.5, 0)
		this.scale.setTo(0.2, 2)
		const world_height = this.game.world.height
		this.TOP_Y = -1
		this.BOTTOM_Y  = world_height
		this.INIT_Y = props.init_y
		this.SPEED = props.speed * props.direction
		if(props.direction === 1){
			console.log('speed =>',  this.SPEED);
		}
	}

	update(){
		this.body.velocity.y = this.SPEED
		if(this.body.position.y <= this.TOP_Y ||
			this.body.position.y >= this.BOTTOM_Y
		){
			this.body.position.y = this.INIT_Y
		}
	}
}