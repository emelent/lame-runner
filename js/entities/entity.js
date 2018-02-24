class Entity extends Phaser.Sprite{
	constructor(context, pos, props){
		super(context.game, pos.x, pos.y, props.texture)
		context.groups[props.group].add(this)
		this.context = context
		this.frame = props.initial_frame
		this.name = props.name
		this.game.physics.arcade.enable(this)
	}

	update(){
	}
}