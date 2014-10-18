$(function(){

	// TODO build a backend to serve up data

	// TODO move this gunk into a SceneManager somehow

	window.viewmodel = {
		player: new Player(window.playerData)
	};

	viewmodel.scene = ko.observable( new BattleScene(new Scene(viewmodel.player)) );

	ko.punches.enableAll();
	ko.applyBindings(viewmodel);




	/*

	// TODO Make a Router
	"/wilderness/DarkForest/battle/mob": SceneManager.enterBattle('DarkForest'),					// random mob in the dark forest
	"/wilderness/DarkForest/battle/warmech": SceneManager.enterBattle('DarkForest', 'warmech'),		// particular boss in the dark forest
	"/shelter/ShatteredPlainsShanty": SceneManager.enterShelter('ShatteredPlainsShanty')

	*/
});