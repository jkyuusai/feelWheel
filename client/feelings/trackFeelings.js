Template.trackFeelings.events({
	'change input:radio[name="primary"]': function(e, template) {
    	e.preventDefault();
    	Session.set('coreFeeling', e.target.id);
    	Session.set('currentFeelings',[]);
	},
	'change input:radio': function(e, template) {
    	e.preventDefault();
    	var feeling = {
    		name: e.target.id
		};	
		
		Meteor.call('trackFeeling', feeling, function(error, feeling) {
			if(error) {
				Toast.error(error.reason);
				return;
			}
			var currentFeelings = Session.get('currentFeelings');
			currentFeelings.push(feeling);
			Session.set('currentFeelings', currentFeelings);
		});
    },
    'submit': function(e, template) {
    	e.preventDefault();
    	var currentFeelings = Session.get('currentFeelings');

    	Meteor.call('insertFeelings',currentFeelings, function(error, ids) {
    		if(error) {
    			Toast.error(error.reason);
    			return;
    		}

    		/*
    		 * reset everything
    		 */
    		template.$('.btn-group label').removeClass('active');
    		template.$('input:radio').each(function(i,e) {
    			$(e).prop('checked', false);
    		});
    		Session.set('coreFeeling', '');
    		Session.set('currentFeelings', []);
    		
    		Toast.success('Feelings tracked!');
    	});
    }
});

Template.trackFeelings.helpers({
	disableIfNotDone: function() {
		if(Session.get('currentFeelings') && Session.get('currentFeelings').length === 3) {
			return;
		}

		return 'disabled';
	}
});