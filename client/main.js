// https://www.meteor.com/try/9


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
			creatorId: Meteor.user()._id,
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

Template.eventTemplate.helpers({
	isCurrentUserCreator: function() {
		if(this.creatorId === Meteor.user()._id) {
			return true;
		}
		return false;
	},
	usersGoing: function() {
		var users = this.users;

		return _.filter(users, function(user) {
			if(user.type === RSVP.types.going) {
				return user;
			}
		});
	},
	usersMaybeGoing: function() {
		var users = this.users;

		return _.filter(users, function(user) {
			if(user.type === RSVP.types.maybe) {
				return user;
			}
		});
	},
	usersNotGoing: function() {
		var users = this.users;

		return _.filter(users, function(user) {
			if(user.type === RSVP.types.no) {
				return user;
			}
		});
	}
});

Template.commentSubmitTemplate.events({
	"click .event-submit-comment": function(event, template) {	
		var commentText = template.find('input[name=comment-text]');
		console.log(commentText.value);
		Comments.insert({
			text: commentText.value,
			creator: Meteor.user().username,
			createdAt: new Date() // current time
		});
		commentText.value = "";
	}
});

Template.commentListTemplate.helpers({
	comments: function() {
		return Comments.find({});
	}
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});