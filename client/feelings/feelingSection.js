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
  color: function(s) {
  	//TODO: fix bug in #16
	var node = root.first(function(n){ return n.model.id === s }),
		path,
		distanceFromPrimary;

	console.log('color');
		

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

  	return node.model.id;
  },

  name: function() {
  	return upperCase(this);
  }
});