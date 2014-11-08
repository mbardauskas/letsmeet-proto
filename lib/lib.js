Events = new Mongo.Collection("events");
Comments = new Mongo.Collection("comments");

Handlebars.registerHelper('log', function(value) {
	console.log(value);
});