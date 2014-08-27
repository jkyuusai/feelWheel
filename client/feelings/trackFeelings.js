Template.trackFeelings.events({
	'click .primary button': function(e, template) {
    	e.preventDefault();    	
    	Session.set('primary', $(e.target).val());
	},
	'click button': function(e, template) {
    	e.preventDefault();    	
    	var feeling = {
    		name: $(e.target).val()
		};	
		
		Meteor.call('trackFeeling', feeling);       
    }
});