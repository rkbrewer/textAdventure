
var SceneManager = (function(){

	function SceneManager(){

	}

	$.extend(SceneManager.prototype, {
		createScene:function(someKeyLikeConstructorOrSomething){

			var scene = new Scene();

			if (someKeyLikeConstructorOrSomething === Scene.BATTLE_SCENE){
				var mob = MobFactory(viewmodel.player);
				BattleScene(scene, viewmodel.player, mob);//decorator
			}

			viewmodel.scene = scene; // cleanNode first?
		}
	});

	return SceneManager;

})();