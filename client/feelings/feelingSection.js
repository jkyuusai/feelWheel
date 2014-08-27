Template.feelingSection.helpers({
	feelings: function() {
		var self = this;
		var feelingList;

		if(!self.group) {
			return;
		}

		if(self.group ==='primary') {
			feelingList = _.keys(feelingSectionMap);
		} else {
			if(Session.get('primary')) {
				feelingList = feelingSectionMap[Session.get('primary')][self.group];	
			}			
		}

		return feelingList;
	}
});