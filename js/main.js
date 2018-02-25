lame.game = new Phaser.Game(640, 860,  Phaser.AUTO, 'container', null, false, false)
lame.game.state.add('bootState', lame.BootState)
lame.game.state.add('loadState', lame.LoadState)
lame.game.state.add('menuState', lame.MenuState)
lame.game.state.add('gameState', lame.GameState)

lame.game.state.start(
	'bootState',
	true,
	false,
	'./assets/data/level1_data.json'
)
