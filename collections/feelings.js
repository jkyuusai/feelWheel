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

    if(!feelingSectionMap[feelingAttributes.name]) {
      throw new Meteor.Error(422, 'Sorry, this feeling is not currently tracked! Try again.');
    }

    var feeling = _.extend({},feelingSectionMap[feelingAttributes.name], {
      userId: user._id,
      submitted: new Date().getTime()
    });

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

feelingSectionMap = {
  mad: {
    coreFeeling: 'mad',
    degree: 'primary',
    name: 'mad'
  },
  scared: {
    coreFeeling: 'scared',
    degree: 'primary',
    name: 'scared'
  },
  joyful: {
    coreFeeling: 'joyful',
    degree: 'primary',
    name: 'joyful'
  },
  powerful: {
    coreFeeling: 'powerful',
    degree: 'primary',
    name: 'powerful'
  },
  peaceful: {
    coreFeeling: 'peaceful',
    degree: 'primary',
    name: 'peaceful'
  },
  sad: {
    coreFeeling: 'sad',
    degree: 'primary',
    name: 'sad'
  },
  hurt: {
    coreFeeling: 'mad',
    degree: 'secondary',
    name: 'hurt'
  },
  hostile: {
    coreFeeling: 'mad',
    degree: 'secondary',
    name: 'hostile'
  },
  angry: {
    coreFeeling: 'mad',
    degree: 'secondary',
    name: 'angry'
  },
  rage: {
    coreFeeling: 'mad',
    degree: 'secondary',
    name: 'rage'
  },
  hateful: {
    coreFeeling: 'mad',
    degree: 'secondary',
    name: 'hateful'
  },
  critical: {
    coreFeeling: 'mad',
    degree: 'secondary',
    name: 'critical'
  },  
  jealous: {
    coreFeeling: 'mad',
    degree: 'tertiary',
    name: 'jealous'
  },
  selfish: {
    coreFeeling: 'mad',
    degree: 'tertiary',
    name: 'selfish'
  },
  frustrated: {
    coreFeeling: 'mad',
    degree: 'tertiary',
    name: 'frustrated'
  },
  furious: {
    coreFeeling: 'mad',
    degree: 'tertiary',
    name: 'furious'
  },
  irritated: {
    coreFeeling: 'mad',
    degree: 'tertiary',
    name: 'irritated'
  },
  skeptical: {
    coreFeeling: 'mad',
    degree: 'tertiary',
    name: 'skeptical'
  },
  rejected: {
    coreFeeling: 'scared',
    degree: 'secondary',
    name: 'rejected'
  },
  confused: {
    coreFeeling: 'scared',
    degree: 'secondary',
    name: 'confused'
  },
  helpless: {
    coreFeeling: 'scared',
    degree: 'secondary',
    name: 'helpless'
  },
  submissive: {
    coreFeeling: 'scared',
    degree: 'secondary',
    name: 'submissive'
  },
  insecure: {
    coreFeeling: 'scared',
    degree: 'secondary',
    name: 'insecure'
  },
  anxious: {
    coreFeeling: 'scared',
    degree: 'secondary',
    name: 'anxious'
  },  
  bewildered: {
    coreFeeling: 'scared',
    degree: 'tertiary',
    name: 'bewildered'
  },
  discouraged: {
    coreFeeling: 'scared',
    degree: 'tertiary',
    name: 'discouraged'
  },
  insignificant: {
    coreFeeling: 'scared',
    degree: 'tertiary',
    name: 'insignificant'
  },
  weak: {
    coreFeeling: 'scared',
    degree: 'tertiary',
    name: 'weak'
  },
  foolish: {
    coreFeeling: 'scared',
    degree: 'tertiary',
    name: 'foolish'
  },
  embarrassed: {
    coreFeeling: 'scared',
    degree: 'tertiary',
    name: 'embarrassed'
  },
  excited: {
    coreFeeling: 'joyful',
    degree: 'secondary',
    name: 'excited'
  },
  sexy: {
    coreFeeling: 'joyful',
    degree: 'secondary',
    name: 'sexy'
  },
  energetic: {
    coreFeeling: 'joyful',
    degree: 'secondary',
    name: 'energetic'
  },
  playful: {
    coreFeeling: 'joyful',
    degree: 'secondary',
    name: 'playful'
  },
  creative: {
    coreFeeling: 'joyful',
    degree: 'secondary',
    name: 'creative'
  },
  aware: {
    coreFeeling: 'joyful',
    degree: 'secondary',
    name: 'aware'
  },
  daring: {
    coreFeeling: 'joyful',
    degree: 'tertiary',
    name: 'daring'
  },
  fascinating: {
    coreFeeling: 'joyful',
    degree: 'tertiary',
    name: 'fascinating'
  },
  stimulating: {
    coreFeeling: 'joyful',
    degree: 'tertiary',
    name: 'stimulating'
  },
  amused: {
    coreFeeling: 'joyful',
    degree: 'tertiary',
    name: 'amused'
  },
  extravagant: {
    coreFeeling: 'joyful',
    degree: 'tertiary',
    name: 'extravagant'
  },
  delightful: {
    coreFeeling: 'joyful',
    degree: 'tertiary',
    name: 'delightful'
  },
  proud: {
    coreFeeling: 'powerful',
    degree: 'secondary',
    name: 'proud'
  },
  respected: {
    coreFeeling: 'powerful',
    degree: 'secondary',
    name: 'respected'
  },
  appreciated: {
    coreFeeling: 'powerful',
    degree: 'secondary',
    name: 'appreciated'
  },
  hopeful: {
    coreFeeling: 'powerful',
    degree: 'secondary',
    name: 'hopeful'
  },
  important: {
    coreFeeling: 'powerful',
    degree: 'secondary',
    name: 'important'
  },
  faithful: {
    coreFeeling: 'powerful',
    degree: 'secondary',
    name: 'faithful'
  },
  cheerful: {
    coreFeeling: 'powerful',
    degree: 'tertiary',
    name: 'cheerful'
  },
  satisfied: {
    coreFeeling: 'powerful',
    degree: 'tertiary',
    name: 'satisfied'
  },
  valuable: {
    coreFeeling: 'powerful',
    degree: 'tertiary',
    name: 'valuable'
  },
  worthwhile: {
    coreFeeling: 'powerful',
    degree: 'tertiary',
    name: 'worthwhile'
  },
  intelligent: {
    coreFeeling: 'powerful',
    degree: 'tertiary',
    name: 'intelligent'
  },
  confident: {
    coreFeeling: 'powerful',
    degree: 'tertiary',
    name: 'confident'
  },
  nurturing: {
    coreFeeling: 'peaceful',
    degree: 'secondary',
    name: 'nurturing'
  },
  trusting: {
    coreFeeling: 'peaceful',
    degree: 'secondary',
    name: 'trusting'
  },
  loving: {
    coreFeeling: 'peaceful',
    degree: 'secondary',
    name: 'loving'
  },
  intimate: {
    coreFeeling: 'peaceful',
    degree: 'secondary',
    name: 'intimate'
  },
  thoughtful: {
    coreFeeling: 'peaceful',
    degree: 'secondary',
    name: 'thoughtful'
  },
  content: {
    coreFeeling: 'peaceful',
    degree: 'secondary',
    name: 'content'
  },
  thankful: {
    coreFeeling: 'peaceful',
    degree: 'tertiary',
    name: 'thankful'
  },
  sentimental: {
    coreFeeling: 'peaceful',
    degree: 'tertiary',
    name: 'sentimental'
  },
  serene: {
    coreFeeling: 'peaceful',
    degree: 'tertiary',
    name: 'serene'
  },
  responsive: {
    coreFeeling: 'peaceful',
    degree: 'tertiary',
    name: 'responsive'
  },
  relaxed: {
    coreFeeling: 'peaceful',
    degree: 'tertiary',
    name: 'relaxed'
  },
  pensive: {
    coreFeeling: 'peaceful',
    degree: 'tertiary',
    name: 'pensive'
  },
  sleepy: {
    coreFeeling: 'sad',
    degree: 'secondary',
    name: 'sleepy'
  },
  bored: {
    coreFeeling: 'sad',
    degree: 'secondary',
    name: 'bored'
  },
  lonely: {
    coreFeeling: 'sad',
    degree: 'secondary',
    name: 'lonely'
  },
  depressed: {
    coreFeeling: 'sad',
    degree: 'secondary',
    name: 'depressed'
  },
  ashamed: {
    coreFeeling: 'sad',
    degree: 'secondary',
    name: 'ashamed'
  },
  guilty: {
    coreFeeling: 'sad',
    degree: 'secondary',
    name: 'guilty'
  },
  apathetic: {
    coreFeeling: 'sad',
    degree: 'tertiary',
    name: 'apathetic'
  },
  inferior: {
    coreFeeling: 'sad',
    degree: 'tertiary',
    name: 'inferior'
  },
  inadequate: {
    coreFeeling: 'sad',
    degree: 'tertiary',
    name: 'inadequate'
  },
  miserable: {
    coreFeeling: 'sad',
    degree: 'tertiary',
    name: 'miserable'
  },
  stupid: {
    coreFeeling: 'sad',
    degree: 'tertiary',
    name: 'stupid'
  },
  bashful: {
    coreFeeling: 'sad',
    degree: 'tertiary',
    name: 'bashful'
  }
};