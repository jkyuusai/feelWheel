Template.feelingHistoryItem.helpers({ 
  console: function() {
    console.log(this);
  },
  time: function() {
  	var self = this;
  	return moment(self.submitted).format('L LT');
  },
  name: function() {
  	var self = this;
  	return self.name.charAt(0).toUpperCase() + self.name.substring(1);
  }
});