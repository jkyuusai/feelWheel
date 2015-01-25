Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    if(!Meteor.user()) {
      return;
    } else {
      return Meteor.subscribe('feelings', Meteor.user()._id); }  
    }
    
});

Router.route('/', {name: 'trackFeelings'});
Router.route('/feelingHistory', {name: 'feelingHistory'});
Router.route('/manageReminders', {name: 'manageReminders'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    else {
      this.render('accessDenied');    
    }
  } else {
    this.next();
  }
}

var clearSession = function() {
  Session.set('currentFeeling', '');
  Session.set('currentFeelings', []);
  this.next();
}

Router.onBeforeAction(requireLogin, {except: 'trackFeelings'});
Router.onBeforeAction(clearSession, {only: 'trackFeelings'});
Router.onBeforeAction( function() { 
  clearErrors(); 
  this.next() 
});