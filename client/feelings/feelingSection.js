Template.feelingSection.helpers({
	feelings: function() {
		var self = this,
			group = self.group,
			feelingList;

		if(!group) {
			return;
		}

		if(group === 'primary') {
			feelingList = _.keys(feelingSectionMap);
			return feelingList;
		}

		if(!Session.get('primary')) {
			return;
		}
		
		feelingList = feelingSectionMap[Session.get('primary')][group];
		return feelingList;
	},

	showBars: function() {
		var self = this;			
		return self.group === 'secondary' && Session.get('primary') !== null && Session.get('primary').length;
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