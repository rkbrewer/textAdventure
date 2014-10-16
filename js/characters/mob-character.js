/*

 Everyone--players and mobs--extend the Character base class

 */

var Mob = (function(){

	function Mob(mobData){

		// Invoke the superclass constructor as a method of this object
		Character.call(this, mobData);

		this.yields = {
			xp:1,
			gold:1,
			loot:[]
		};

		this.inventory = [
			{id:"1", name: "Grolm's Blood"}	// grolm's blood for healing. makes player sick.  can be refined into a health potion when mixed with herbs and boiled.
		];

		ko.makeObservable(this);

		this.isDead = ko.computed(function(){
			return this.hp() === 0;
		}, this);
	}

	Mob.prototype = new Character();

	$.extend(Mob.prototype, {
		takeTurn:function(battle){
			if ("healthy".length){
				var attack = this.attack(battle.player);
				battle.updateBlog(attack.results);
				battle.endTurn();
			} else if ("wantsToRun".length){
				var egress = this.run(battle.player);
				if (egress.success){
					battle.endBattle();
				} else {
					battle.updateBlog(egress.results);
					battle.endTurn();
				}
			}
		},
		useItem:function(){
			// Using an item destroys it.  Or can generate something, like an empty vial.
		}
	});

	return Mob;

})();

