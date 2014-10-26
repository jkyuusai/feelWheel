Feelings = new Mongo.Collection('feelings');

Feelings.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Feelings.deny({
  update: function(userId, feeling, fieldNames) {
    return (_.without(fieldNames, 'name').length > 0);
  }
});

Meteor.methods({
  trackFeeling: function(feelingAttributes) {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, "You need to log in first!");
    }

    // if(!feelingSectionMap[feelingAttributes.name]) {
    //   throw new Meteor.Error(422, 'Sorry, this feeling is not currently tracked! Try again.');
    // }

    var coreFeeling = root.first(function(n){ return n.model.id === feelingAttributes.name }).getPath()[1].model.id;

    var feeling = {
      userId: user._id,
      submitted: new Date().getTime(),
      coreFeeling: coreFeeling,
      name: feelingAttributes.name
    };

    return feeling;
  },

  insertFeelings: function(currentFeelings) {
    var feelingIds = [];

    _.each(currentFeelings, function(f) {
      feelingIds.push(Feelings.insert(f));
    });

    return feelingIds;
  }  
});

//set up tree containing canonical feelings relationships derived from feelwheel
tree = new TreeModel();
root = tree.parse(basicTree);

