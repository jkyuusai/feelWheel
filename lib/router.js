Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return [Meteor.subscribe('contacts'), Meteor.subscribe('groups') ]; }
});

Router.map(function() {
  this.route('trackFeelings', { path: '/' })
  this.route('feelingHistory', { path: '/feelingHistory' });
  this.route('manageReminders', { path:'/manageReminders' }); 
});

var mustBeSignedIn = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('loading')
    else
      this.render('accessDenied');
    pause();
  }
}

Router.onBeforeAction(mustBeSignedIn, {except: 'trackFeelings'});
Router.onBeforeAction(function() { clearErrors() });