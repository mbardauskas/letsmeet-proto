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

		currentEvent.users.push({
			user_id: Meteor.user()._id,
			type: rsvptype,
			username: Meteor.user().username
		});

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
	}
};