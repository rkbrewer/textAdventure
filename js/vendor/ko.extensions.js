$.extend(ko.bindingHandlers, {
	scrollToBottom:{
		update:function(element, valueAccessor){
			var value = ko.unwrap(valueAccessor());		// IF YOU TAKE THIS BS LINE OUT, UPDATE WILL NEVER FIRE A AGAIN!!!! Notice it's not even read...
			$(element).stop().animate({
				scrollTop: $(element).find('.scrollable').height()
			}, 'slow');
		}
	}
});


// Makes all properties of an object observable
ko.makeObservable = function(obj){
	for (var prop in obj){
		if (obj.hasOwnProperty(prop)){
			if (typeof prop === 'object' && prop instanceof Array){

				obj[prop] = ko.observableArray(obj[prop]);

			} else if (typeof prop === 'object'){

				obj[prop] = ko.mapping.fromJS(prop);

			} else if (typeof prop !== 'function') {

				obj[prop] = ko.observable(obj[prop]);

			}
		}
	}
};