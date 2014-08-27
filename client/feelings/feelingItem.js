Template.feelingItem.helpers({
  color: function() {
    return this.userId == Meteor.userId();
  }
});