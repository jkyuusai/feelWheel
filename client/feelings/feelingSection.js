Template.feelingSection.helpers({
	feelings: function() {
		var self = this,
			degree = self.degree,
			feelingList;

		if(!degree) {
			return;
		}

		if(degree === 'primary') {
			feelingList = getFeelings(null, degree);
			return feelingList;
		}

		if(!Session.get('coreFeeling')) {
			return;
		}
		
		feelingList = getFeelings(Session.get('coreFeeling'),degree);
		return feelingList;
	},

	showBars: function() {
		var self = this;			
		return self.degree === 'secondary' && Session.get('coreFeeling') !== null && Session.get('coreFeeling').length;
	},

	//TODO: Feels hacky, need to handle this more elegantly - replace with an actual media query
	justifyIfNotPhone: function() {
		console.log('test');
		if(window.matchMedia("(min-width: 768px)").matches) {
			return 'btn-group-justified';
		} else {
			return 'row';
		}
	}
});