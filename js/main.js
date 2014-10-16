$(function(){

	window.playerData = '';
	window.mobData = '';
	var requests = [];

	requests.push($.getJSON('_playerdata.json', function(json){
		window.playerData = json[0];
	}));

	requests.push($.getJSON('_mobdata.json', function(json){
		window.mobData = json[0];
	}));

	$.when.apply($, requests).then(function(){

		window.player = new Player(playerData);

		window.viewmodel = {
			player: player
		};

		viewmodel.scene = ko.observable( new BattleScene(new Scene(player)) );

		ko.punches.enableAll();
		ko.applyBindings(viewmodel);

	});




	// TODO Make a Router.  What's Backbone's made out of?
});