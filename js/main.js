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

		viewmodel.battle = new Battle(player);

		ko.punches.enableAll();
		ko.applyBindings(viewmodel);

		// A Router would be super cool, like say, angular's router


	});




});