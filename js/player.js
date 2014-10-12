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


		// Make all properties of a Player observable
		for (var prop in this){
			if (this.hasOwnProperty(prop)){
				if (typeof prop === 'object' && prop instanceof Array){

					this[prop] = ko.observableArray(this[prop]);

				} else if (typeof prop === 'object'){

					this[prop] = ko.mapping.fromJS(prop);

				} else {

					this[prop] = ko.observable(this[prop]);

				}
			}
		}
	}

	Player.prototype = new Character();

	return Player;

})();

