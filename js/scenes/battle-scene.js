/**
 * Battle Scene - Decorates Scene (an abstract class)
 */
var BattleScene = (function(){

	function BattleScene( scene ){

		this.super = scene;
		this.name = 'scene-battle';	// must match JST name

		this.player = scene.player;
		this.mob = new Mob(window.mobData);

		this.turnChart = new TurnChart(this.player, this.mob);

		this.blog = ko.observable('');	// "battle log"

		this.startScene();
	}

	$.extend(BattleScene.prototype, {
		startScene:function(){
			this.super.startScene();
			this.updateBlog("You encounter a " + this.mob.name() + ".");
		},

		updateBlog:function(message){
			this.blog( this.blog() + message + '<br>' );
		},

		attackMob:function(){
			var attack = this.player.attack(this.mob);
			this.updateBlog(attack.results);
			this.endTurn();
		},

		endTurn:function(){
			if ( this.turnChart.currentCharacter().isDead() ){ return this.endScene(); }

			this.turnChart.nextTurn();

			if (this.turnChart.currentCharacter() instanceof Mob){
				this.mob.takeTurn(this);	// pass a reference to the battle
			}
		},

		endScene:function(){
			var loser = this.turnChart.currentCharacter(),
				message = loser.isDead() ? loser.name() + " has died." : loser.name() + " has fled.";

			this.updateBlog(message);

			if (loser.isDead() && loser instanceof Mob){
				// TODO show loot screen
			} else if (loser.isDead() && loser instanceof Player){
				// TODO show game over screen
			} else {
				// TODO loser drops gold, which goes to the winner
			}

			this.super.endScene();
		},

		runFromMob:function(){
			var egress = this.player.run(this.mob);

			if (egress.success){
				this.endScene();
			} else {
				this.updateBlog(egress.results);
				this.endTurn();
			}
		}
	});

	return BattleScene;

})();