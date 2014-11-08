Events = new Mongo.Collection("events");
Comments = new Mongo.Collection("comments");

RSVP = {
	types: {
		going: 2,
		maybe: 1,
		no: 0
	},
	setUserRSVP: function(rsvptype, event) {
		var userId = Meteor.user()._id;
		var currentEvent = Events.findOne(event._id);
		if(typeof currentEvent.users === "undefined") {
			currentEvent.users = {};
		}
		currentEvent.users[userId] = {
			type: rsvptype,
			username: Meteor.user().username
		};

		Events.update(event._id, currentEvent);
	}

};

// https://www.meteor.com/try/9

if (Meteor.isClient) {

	Template.eventListTemplate.helpers({
		events: function() {
			return Events.find({});
		}
	});

	Template.eventFormTemplate.events({
		"click #create-event": function(event, template) {
			var title = template.find('input[name=title]');
			var description = template.find('input[name=description]');
			Events.insert({
				title: title.value,
				description: description.value,
				creator: Meteor.user().username,
				createdAt: new Date() // current time
			});
			title.value = "";
			description.value = "";
		}
	});

	Template.eventTemplate.events({
		"click .remove-event": function() {
			Events.remove(this._id);
		},
		'click .rsvp-going': function() {
			RSVP.setUserRSVP(RSVP.types.going, this);
		},
		'click .rsvp-maybe': function() {
			RSVP.setUserRSVP(RSVP.types.maybe, this);
		},
		'click .rsvp-no': function() {
			RSVP.setUserRSVP(RSVP.types.no, this);
		}
	});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
}

if (Meteor.isServer) {
	Meteor.startup(function() {
		// code to run on server at startup
	});
}
