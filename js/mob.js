/*

 Everyone--players and mobs--extend the Character base class

 */

var Mob = (function(){

	function Mob(mobData){

		// Invoke the superclass constructor as a method of this object
		Character.call(this, mobData);

		this.yields = {
			xp:1,
			gold:1
		};

		// Make all properties of a Mob observable
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

	Mob.prototype = new Character();

	$.extend(Mob.prototype, {
		takeTurn:function(opponent, turnChart){
			// what's "this"? Battle? Mob?
			if ("healthy".length){
				this.attack(opponent);
				turnChart.endTurn();
			}
			debugger;
		}
	});

	return Mob;

})();

