$(function(){

	// TODO build a backend to serve up data

	window.playerData = '';
	window.mobData = '';
	var requests = [];

	// For now, hack github pages to get json (http://www.danielx.net/gh-pages-jsonp)
	requests.push($.ajax({
		url:'http://webbrewer.github.io/textAdventure/_playerdata.json.js',
		dataType:'jsonp',
		jsonpCallback:'webbrewer/textAdventure:_playerdata',
		success:function(json){
			window.playerData = json[0];
		}
	}));

	requests.push($.ajax({
		url:'http://webbrewer.github.io/textAdventure/_mobdata.json.js',
		dataType:'jsonp',
		jsonpCallback:'webbrewer/textAdventure:_mobdata',
		success:function(json){
			window.mobData = json[0];
		}
	}));

//	requests.push($.getJSON('_playerdata.json.js', function(json){
//		window.playerData = json[0];
//	}));
//
//	requests.push($.getJSON('_mobdata.json.js', function(json){
//		window.mobData = json[0];
//	}));

	$.when.apply($, requests).then(function(){

		// TODO move this gunk into a SceneManager somehow

		window.viewmodel = {
			player: new Player(playerData)
		};

		viewmodel.scene = ko.observable( new BattleScene(new Scene(viewmodel.player)) );

		ko.punches.enableAll();
		ko.applyBindings(viewmodel);

	});


	/*

	// TODO Make a Router
	"/wilderness/DarkForest/battle/mob": SceneManager.enterBattle('DarkForest'),					// random mob in the dark forest
	"/wilderness/DarkForest/battle/warmech": SceneManager.enterBattle('DarkForest', 'warmech'),		// particular boss in the dark forest
	"/shelter/ShatteredPlainsShanty": SceneManager.enterShelter('ShatteredPlainsShanty')

	*/
});