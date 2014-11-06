Template.feelingSection.helpers({
	feelings: function() {
		var self = this;		
		return getFeelings();				
	},	

	//TODO: Feels hacky, need to handle this more elegantly - replace with an actual media query
	justifyIfNotPhone: function() {
		if(window.matchMedia("(min-width: 768px)").matches) {
			return 'btn-group-justified';
		} else {
			return 'row';
		}
	}   
});

Template.feelingItem.helpers({
  color: function(feelingName) {
    var node = findFeeling(feelingName),
		path,
		distanceFromPrimary;		

  	if(!node) {
  		return;
  	}

  	path = node.getPath();

  	if(!path) {
  		return;
  	}

  	distanceFromPrimary = path.length - 2;

  	if(distanceFromPrimary) {
  		return path[1].model.id + '-child-' + distanceFromPrimary;
  	}

    console.log('node',node);
      

  	return node.model.id;
  },

  name: function() {
  	return upperCase(this);
  }
});