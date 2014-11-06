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
  name: function() {
  	return upperCase(this);
  },

  color: function(feeling) {
    return color(feeling);
  }
});