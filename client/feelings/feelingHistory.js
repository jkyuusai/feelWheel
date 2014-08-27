Template.feelingHistory.helpers({ 
  feelings: function() {
    return Feelings.find({userId: Meteor.userId()}, {sort: {submitted: 1}});
  }
});