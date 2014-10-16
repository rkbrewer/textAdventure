




/*


 Characters may try to run.  Each instance of a Run is imbued
 with properties of the character performing it

 */


var Run = (function(){

	function Run(runner, opponent){
		this.success = Math.random() > .5;
		this.results = this.success ? runner.name() + " has fled." : runner.name() + " is trapped by " + opponent.name() + ".";
	}

	return Run;

})();