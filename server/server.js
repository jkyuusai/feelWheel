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
			from:'grouptext@sparklecow.io',
			text: body
		});
	},
	removeContact: function(subscription) {			
		Contacts.remove(subscription._id);
	}
});
