/*

 Extends Character base class

 */


var Player = (function(){

	function Player(playerData){
		playerData = playerData || {};

		// Invoke the superclass constructor as a method of this object
		Character.call(this, playerData);

		this.caste = new Caste(playerData.caste || "warrior");	// this should be a factory that instantiates new Warrior, etc.
		this.level = playerData.level || 1;
		this.xp = playerData.xp;

		ko.makeObservable(this);

		this.isDead = ko.computed(function(){
			return this.hp() === 0;
		}, this);
	}

	Player.prototype = new Character();

	return Player;

})();

