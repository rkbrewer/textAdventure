/*
 How would an encounter/battle work?

 0. [the Battle looks at the turnChart... which states you are first]
 1. "A slug looms before you. {{ You sense you can easily get the first attack. }}"
 2. [you push A) Attack]
 3. "You attack! The slug enrages!" A slash of blood arcs across the screen and fades away. The Slug's HP is decremented.
 4. [the Battle advances down the turnChart... which states the slug is next]
 5. "The slug fires projectile slime at your face, it burns!" Might and magic style splats animate across the screen, and fade away. Your HP is decremented.
 6. [the Battle advances down the turnChart... which states you are next]
 7. [you push A) Attack]
 8. "You attack! The slug is obliterated." You see an arc of blood fade away, and the slug's hp crumples off the page.
 9.

 */



var Battle = (function(){


	/**
	 * A TurnChart projects the order in which a player and mob will attack one another.  It can be modified
	 * during battle.
	 *
	 * @constructor
	 */
	function TurnChart(player, mob){
		this.turns = [player, mob];	// simplest turn chart example.  A TurnChart repeats once you reach the end. The order is determined off a character's agility and luck
		this.turnIndex = 0;
		this.currentTurn = function(){
			return this.turns[this.turnIndex];
		};
		this.nextTurn = function(){
			return this.turns[this.turnIndex++];
		};
	}

	function Battle(player){
		this.mob = new Mob(window.mobData); //ko.mapping.fromJS(new Mob(window.mobData));	// map the properties of the object
		this.player = player;
		this.turnChart = new TurnChart(player, this.mob);
		this.blog = ko.observable(""); // Battle Log

		this.start();
	}

	$.extend(Battle.prototype, {
		start:function(){
			this.updateBlog("You encounter a " + this.mob.name());
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
			this.turnChart.nextTurn();
			if (this.turnChart.currentTurn() instanceof Mob){
				this.mob.takeTurn(this.player, this.turnChart); // mob needs to know about the battle, so it can update the blog
			}
		},
		runFromMob:function(){
			var egress = this.player.run(this.mob);
		}
	});

	return Battle;

})();