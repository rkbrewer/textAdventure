/*
 How would an encounter/BattleScene work?

 0. [the BattleScene looks at the turnChart... which states you are first]
 1. "A slug looms before you. {{ You sense you can easily get the first attack. }}"
 2. [you push A) Attack]
 3. "You attack! The slug enrages!" A slash of blood arcs across the screen and fades away. The Slug's HP is decremented.
 4. [the BattleScene advances down the turnChart... which states the slug is next]
 5. "The slug fires projectile slime at your face, it burns!" Might and magic style splats animate across the screen, and fade away. Your HP is decremented.
 6. [the BattleScene advances down the turnChart... which states you are next]
 7. [you push A) Attack]
 8. "You attack! The slug is obliterated." You see an arc of blood fade away, and the slug's hp crumples off the page.
 9.


BattleScene is a Scene (by convention).  A SceneManager will instantiate a new BattleScene, and plug it onto the master
view model (a "scene" node)(cleanNode when changing scenes?)

Other than the naming convention, scenes don't have to have anything in common... other than they are parametized by actors (such as
player and/or mob).  Let the SceneManager instantiate the Mob (or even delegate instantiation) and pass it into the new BattleScene.

 */



// Decorates a Scene, but in the style of new BattleScene(new Scene())
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript (The Pseudo-Classical Decorator Pattern; Abstract Decorators)
var BattleScene = (function(){

	function BattleScene( scene ){

		// Invoke the superclass constructor as a method of this object (
		this.super = scene;

		this.player = scene.player;

		this.name = 'scene-battle';

		this.mob = new Mob(window.mobData);
		this.turnChart = new TurnChart(this.player, this.mob);
		this.blog = ko.observable('');

		this.startScene();
	}

	$.extend(BattleScene.prototype, {
		startScene:function(){
			this.super.startScene();	//super
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
				this.endScene(this.player);
			} else {
				this.updateBlog(egress.results);
				this.endTurn();
			}
		}
	});

	return BattleScene;

})();