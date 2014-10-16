


/*

 Any character will try to "mount a defense" when they are attacked.  Each Defense has properties that are a function
 of the skills of the attacker and defender.

 */

var Defense = (function(){

	function Defense(attacker, defender){
		this.chanceToParry = attacker.strength - defender.strength;
		this.chanceToDodge = attacker.strength - defender.strength;
		this.chanceToBlock = attacker.strength - defender.strength;
	}

	return Defense;

})();