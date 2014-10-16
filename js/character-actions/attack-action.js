/*

Characters will "launch an attack" at each other.  Each Attack has properties that are a function
of the skills of the attacker and defender.

TODO learn some sweet ways to calculate hits & damages

 */

var Attack = (function(){

	function Attack(attacker, defender){
//		this.chanceToOvercomeParry = attacker.strength() - defender.strength();
//		this.chanceToOvercomeDodge = attacker.strength() - defender.strength();
//		this.chanceToOvercomeBlock = attacker.strength() - defender.strength();

		this.attacker = attacker;
		this.defender = defender;

		if ( this.hit() ) {

			defender.hp( defender.hp() - this.damage() );

			this.results = attacker.name() + " hits " + defender.name() + " for " + this.damage() + " damage!";

		} else {

			this.results = attacker.name() + " misses!";

		}
	}

	$.extend(Attack.prototype, {
		hit:function(){
			return this.attacker.attackRating() * Math.random(this.attacker.luck()) > this.defender.defenseRating() * Math.random(this.defender.luck());
		},

		damage:function(){
			var damage = Math.round(this.attacker.strength() * this.attacker.attackRating() - this.defender.defense() * this.defender.defenseRating());
			return damage > 0 ? damage : 0;
		}
	});

	return Attack;

})();