Feelings = new Meteor.Collection('feelings');
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

    if(_.indexOf(feelingList, feelingAttributes.name === -1)) {
      throw new Meteor.Error(422, 'Sorry, this feeling is not currently tracked! Try again.');
    }

    // pick out the whitelisted keys
    var feeling = _.extend(_.pick(feelingAttributes, 'name'), {
      userId: user._id,
      submitted: new Date().getTime()
    });

    var feelingId = Feelings.insert(feeling);

    return feelingId;
  }
});

feelingList = [
  'mad',
  'scared',
  'joyful',
  'powerful',
  'peaceful',
  'sad',
  'hurt',
  'hostile',
  'angry',
  'rage',
  'hateful',
  'critical',
  'rejected',
  'confused',
  'helpless',
  'submissive',
  'insecure',
  'anxious',
  'excited',
  'sexy',
  'energetic',
  'playful',
  'creative',
  'aware',
  'proud',
  'respected',
  'appreciated',
  'hopeful',
  'important',
  'faithful',
  'nurturing',
  'trusting',
  'loving',
  'intimate',
  'thoughtful',
  'content',
  'sleepy',
  'bored',
  'lonely',
  'depressed',
  'ashamed',
  'guilty',
  'jealous',
  'selfish',
  'frustrated',
  'furious',
  'irritated',
  'skeptical',
  'bewildered',
  'discouraged',
  'insignificant',
  'weak',
  'foolish',
  'embarrassed',
  'daring',
  'fascinating',
  'stimulating',
  'amused',
  'extravagant',
  'delightful',
  'cheerful',
  'satisfied',
  'valuable',
  'worthwhile',
  'intelligent',
  'confident',
  'thankful',
  'sentimental',
  'serene',
  'responsive',
  'relaxed',
  'pensive',
  'apathetic',
  'inferior',
  'inadequate',
  'miserable',
  'stupid',
  'bashful'
];

feelingSectionMap = {
   mad: {
      primary:['mad'],
      secondary: ['hurt','hostile','angry','rage','hateful','critical'],
      tertiary: ['jealous','selfish','frustrated','furious','irritated','skeptical']
   },
   scared: {
      primary:['scared'],
      secondary:['rejected','confused','helpless','submissive','insecure','anxious'],
      tertiary:['bewildered','discouraged','insignificant','weak','foolish','embarrassed']
   },
   joyful: {
      primary:['joyful'],
      secondary:['excited','sexy','energetic','playful','creative','aware'],
      tertiary:['daring','fascinating','stimulating','amused','extravagant','delightful']
   },
   powerful: {
      primary:['powerful'],
      secondary:['proud','respected','appreciated','hopeful','important','faithful'],
      tertiary:['cheerful','satisfied','valuable','worthwhile','intelligent','confident']
   },
   peaceful: {
      primary:['peaceful'],
      secondary:['nurturing','trusting','loving','intimate','thoughtful','content'],
      tertiary:['thankful','sentimental','serene','responsive','relaxed','pensive']
   },
   sad: {
      primary:['sad'],
      secondary:['sleepy','bored','lonely','depressed','ashamed','guilty'],
      tertiary:['apathetic','inferior','inadequate','miserable','stupid','bashful']
   }
};