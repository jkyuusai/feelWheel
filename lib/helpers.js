getFeelings = function() {
	var currentFeeling = Session.get('currentFeeling');
	
	if(!currentFeeling) {
		var feelings = [];
		_.each(root.children, function(e) {
			feelings.push(e.model.id);
		});

		return feelings;
	}

	var feelings = [],
		core;
	
	core = root.first(function(n){ return n.model.id === currentFeeling });

	_.each(core.children, function(e) {
		feelings.push(e.model.id);
	});		

	return feelings;
}

upperCase = function(s) {		
  	return s.charAt(0).toUpperCase() + s.substring(1)
};

findFeeling = function(feelingName) {
	return root.first(function(n){ return n.model.id === feelingName });
}