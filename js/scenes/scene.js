var Scene = (function(){


	function Scene(player){

		// TODO instead of passing in player, pass in a scene options object (generated by the SceneManager)
		/*
		{
			player: player,
			sceneName: sceneName,
			nextScene: 'someNextScene',
			previousScene: 'someSceneYouCameFrom',
			etc: andSoOn
		}
		*/
		this.player = player;
		this.activeScene = '';
		this.templateID = ko.observable('');
	}

	$.extend(Scene.prototype, {
		startScene:function(){
			this.activeScene = this.name;
		},
		endScene:function(){
			this.activeScene = '';// some return scene described in the scene manager's options object
		}
	});

	return Scene;

})();