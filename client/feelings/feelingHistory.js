Template.feelingHistory.helpers({ 
  feelings: function() {
    return Feelings.find({userId: Meteor.userId()}, {sort: {submitted: 1}});
  },
  settings: function() {
  	return {
            rowsPerPage: 25,
            showFilter: true,
         	fields: [
			    { 
			    	key: 'name', 
			    	label: 'Name', 
			    	fn: function(v,o) { return upperCase(v) }
			    },
			    { 
			    	key: 'submitted', 
			    	label: 'Time', 
			    	fn: function(v, o) { return moment(v).format('dddd, MMMM Do YYYY, h:mm:ss A') },
			    	sortByValue: true,
			    	sort: 'descending'
				},
				{
					key: 'coreFeeling',
					label: 'Category',
					fn: function(v,o) { return upperCase(v) }
				}
			] ,
			rowClass: function(feeling) {
				return 'feeling-' + color(feeling.name)
			}
        };
  }  
});