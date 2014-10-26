getFeelings = function() {
	if(!Session.get('currentFeeling')) {
		var feelings = [];
		_.each(root.children, function(e) {
			feelings.push(e.model.id);
		});

		return feelings;
	}

	var feelings = [],
		core;
	
	core = root.first(function(n){ return n.model.id === Session.get('currentFeeling') });

	_.each(core.children, function(e) {
		feelings.push(e.model.id);
	});

	return feelings;
}

upperCase = function(s) {		
  	return s.charAt(0).toUpperCase() + s.substring(1)
};