/*

Everyone--players and mobs--extend the Character base class

 */


var Character = (function(){

	function Character(character){
		character = character || {};

		this.name = character.name || 'Otis McKrinkle';

		this.hp = character.hp || 10;
		this.mp = character.mp || 1;

		this.defense = character.defense || 1;
		this.strength = character.attack || 1;
	}

	$.extend(Character.prototype, {
		attack:function(opponent){
			return new Attack(this, opponent);
		},
		run:function(opponent){
			return new Run(this, opponent);
		}
	});

	return Character;

})();
/*
 If a Character attacks a player, the result is a function of how the attack played out:
 If a player can parry, he has a chance to parry
 If a player can block, he has a chance to block
 If a player can evade, he has a chance to evade
 If he can block, parry, or dodge, he has a chance to perform each - though the most beneficial will win out.
 */



