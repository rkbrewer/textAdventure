/*

Characters will "launch an attack" at each other.  Each Attack has properties that are a function
of the skills of the attacker and defender.

 */

var Attack = (function(){

	function Attack(attacker, defender){
		this.chanceToOvercomeParry = attacker.strength() - defender.strength();
		this.chanceToOvercomeDodge = attacker.strength() - defender.strength();
		this.chanceToOvercomeBlock = attacker.strength() - defender.strength();

		this.damage = 0;

		if ( this.chanceToOvercomeBlock ) {
			this.damage = 1;
			defender.hp( defender.hp() - this.damage );

			this.results = attacker.name() + " hits " + defender.name() + " for " + this.damage + " damage!";
		}
	}

	return Attack;

})();