/**
 * A TurnChart projects the order in which a player and mob will take their turns in a BattleScene.
 * The turn order can be modified during battle.
 *
 * @constructor
 */
function TurnChart(player, mob){
	this.turns = [player, mob];	// simplest possible "turn order" example.  Turns repeat once you reach the end. The order should be determined off a character's agility, luck, etc.
	this.turnIndex = 0;
	this.currentCharacter = function(){
		return this.turns[this.turnIndex];
	};
	this.nextTurn = function(){
		this.turnIndex = this.turnIndex === (this.turns.length - 1) ? 0 : this.turnIndex + 1;
		return this.turns[this.turnIndex];
	};
}