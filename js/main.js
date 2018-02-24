lame.game = new Phaser.Game(800, 640,  Phaser.AUTO, 'container', null, false, false)
lame.game.state.add('bootState', lame.BootState)
lame.game.state.add('loadState', lame.LoadState)
lame.game.state.add('gameState', lame.GameState)

lame.game.state.start(
	'bootState',
	true,
	false,
	'./assets/data/level1_data.json'
)
