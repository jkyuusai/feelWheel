Meteor.startup(function () {
	process.env.MAIL_URL = 'smtp://postmaster%40***REMOVED***:***REMOVED***@smtp.mailgun.org:587';
});

//TODO: Change this to a collection
var carrierList = {
			'AT&T': 'mms.att.net',
			'Verizon': 'vtext.com',
			'TMobile': 'tmomail.net',
			'Sprint': 'messaging.sprintpcs.com'
}

Meteor.methods({
	sendEmail: function(contacts, subject, body) {
		
		var recipients = _.map(contacts, function(e) {
			return e.number +'@' + carrierList[e.carrier];
		});													
		
		Email.send({
			bcc: recipients,
			from:'grouptext@***REMOVED***',
			text: body
		});
	},
	removeContact: function(subscription) {			
		Contacts.remove(subscription._id);
	}
});