/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/// Navigation
	list:function(req, res) {
		Articles.find({}).exec(function(err, articles) {
			if (err) {
				res.send(500, {error: "Database error"});
			}
			res.view('list', {articles:articles});
		});
	},

	visit:function(req, res) { // View artile in full

		Articles.findOne({id:req.params.id}).exec(function(err, article) {
			if (err) {
				res.send(500, {error: "Database error / something went wrong"});
			}
			res.view('article', {article:article});
			return false;
		});
	},

	add:function(req, res) {
		res.view('add');
	},

	logina:function(req, res) {
		res.view('logina');
	},

	/// Crud Operations

	create:function(req, res) {

		/*
		Possibly ignorable:
		When I attempted to add "validation" it couldn't be done as Sails
		was unable to find what I was referencing as I suspect what I was referencing
		had not yet been created...
		*/

		var title = req.body.title;
  		var body = req.body.body;

		if (title != "" && body != "") {

	  		Articles.create({title:title, body:body}).exec(function(err){
		  		if (err) {
			  		res.send(500, {error: 'Database Error'});
		  		}
		  		res.redirect('/articles/list');
	  		});
		} else {
			res.view('processingIssue','layout');
		}
	},

	delete:function(req, res) {
		Articles.destroy({id:req.params.id}).exec(function(err) {
			if (err) {
				res.send(500, {error: "Database error / something went wrong"});
			}
			res.redirect('/articles/list');
			return false;
		});
	},

	edit:function(req, res) {

		Articles.findOne({id:req.params.id}).exec(function(err, article) {
			if (err) {
				res.send(500, {error: "Database error / something went wrong related to editing"});
			}
			res.view('edit', {article:article});
		});
	},

	processingIssue:function(req, res) {
		res.view('processingIssue');
	},

	update:function(req, res) {

		var title = req.body.title;
		var body = req.body.body;

		if (title != "" && body != "") {
			Articles.update({id:req.params.id}, {title:title, body:body}).exec(function(err) {

				if (err) {
					res.send(500, {error: "Database error / something went wrong related to updating"});
				}
				res.redirect('/articles/list');
			});
		} else {
			Articles.findOne({id:req.params.id}).exec(function(err, article) {
				if (err) {
					res.send(500, {error: "Database error / something went wrong related to editing"});
				}
				// res.view('edit');
				//res.redirect('/');

				// res.view('edit', {article:article});
				res.view('processingIssue','layout');
				sails.log("\nCannot have an empty article");
			});
			// make the edit page output the reason the web-page can't update
		}
		return false;
	},

	loginEval:function(req, res) { // in progress

		req.allParams();
		//res.allParams();

		var username = req.body.username;
		var password = req.body.password;
		// var userIsLoggedIn = false;
		var userLoginBool = req.body.userIsLoggedIn;


		if (username == "yourname" && password == "password") {
			// userLoginBool = "test"; // res.userIsLoggedIn = 1; // true;
			res.redirect('/articles/list');
			sails.log("Logged in");
			// res.redirect('/articles/list');
		} else {
			// userIsLoggedIn = 0; // false;
			sails.log("Not logged in");
			res.redirect('/');
		}
		return false;
	}
};
