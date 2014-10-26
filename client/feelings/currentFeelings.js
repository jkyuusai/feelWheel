Template.currentFeelings.helpers({
	currentFeelings: function() {
		return Session.get('currentFeelings');
	}
});

Template.currentFeeling.helpers({
	upperName: function() {
		var self = this;
		return upperCase(this.name);
	}
});

Template.currentFeeling.events({
	'click li': function(e, template) {
		var self = this,
			feeling = e.target.id,
			currentFeelings = Session.get('currentFeelings');

		if(!feeling || !currentFeelings) {
			return;								
		}

		_.each(currentFeelings, function(e, i) {
			if(e.name === feeling) {
				currentFeelings = currentFeelings.slice(0, i);
				Session.set('currentFeelings', currentFeelings);
				if(currentFeelings.length) {
					Session.set('currentFeeling',currentFeelings[currentFeelings.length - 1].name);
				} else {
					Session.set('currentFeeling', '');
				}
				return false;
			}
		});			
	}
});
