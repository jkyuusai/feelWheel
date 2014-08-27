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

	isSecondary: function() {
		var self = this;			
		return self.group === 'secondary';
	}
});