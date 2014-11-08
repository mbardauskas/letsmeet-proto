RSVP = {
	types: {
		going: 2,
		maybe: 1,
		no: 0
	},
	setUserRSVP: function(rsvptype, currentEvent) {
		if(typeof currentEvent.users === "undefined") {
			currentEvent.users = [];
		}

		var eventUsers = _.filter(currentEvent.users, function(user) {
			if(user.user_id !== Meteor.user()._id) {
				return user;
			}
		});

		eventUsers.push({
			user_id: Meteor.user()._id,
			type: rsvptype,
			username: Meteor.user().username
		});

		currentEvent.users = eventUsers;

		Events.update(currentEvent._id, currentEvent);
	},
	isUserAlreadyRsvped: function(users, user_id) {
		if(typeof users === 'undefined') {
			return false;
		}
		debugger;
		for(var i = 0, j = users.length; i < j; i++) {
			if(users[i]['user_id'] === user_id) {
				return true;
			}
		}
		return false;
	},
	isUserGoing: function() {

	}
};