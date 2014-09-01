Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    if(!Meteor.user()) {
      return;
    } else {
      return Meteor.subscribe('feelings', Meteor.user()._id); }  
    }
    
});

Router.map(function() {
  this.route('trackFeelings', { path: '/' })
  this.route('feelingHistory', { path: '/feelingHistory' });
  //this.route('manageReminders', { path:'/manageReminders' }); 
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

var clearSession = function() {
  Session.set('primary', '');
}

Router.onBeforeAction(mustBeSignedIn, {except: 'trackFeelings'});
Router.onBeforeAction(clearSession, {only: 'trackFeelings'});
Router.onBeforeAction(function() { clearErrors() });