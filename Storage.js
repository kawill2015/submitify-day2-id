/* jshint esversion:6 */

/*
	This is our extensible storage object. We've written it so that we can
	replace any parts of it in the future with calls to file system or mongo
	without too much effort.
*/
var fs = require('fs');
users = fs.readFileSync('./users.json');
users = JSON.parse(users);

console.log(users, "what is this?");

function Storage() {
	var projects = []; // array of Project objects
	// var users = []; // array of User objects

	/*
		Takes in a user object to store, and stores
		it in the users array
	*/
	this.addUser = (user, cb) => {
		users.push(user);
		this.saveUsers(cb);
	};

	this.getUserByName = (name, cb) => {
		for(var u of users) {
			if (u.username === name) {
				cb(u);
				return;
			}
		}
		cb(null);
	};

	this.saveUsers = (cb) => {
		fs.writeFile(
			"./users.json",
			JSON.stringify(users),
			(err) => {
				if (err) {
					console.log("Error writing new user to file");
					if(cb){
						cb(false);
					}
					return;
				}
					if(cb){
						cb(true);
					}
			}
		);
	};

	this.addProject = (project, cb)  => {
		// cb = callback
		projects.push(project);
		if (cb) {
			cb();
		}
	};

	this.getAllProjects = (cb) => {
		// cb = callback
		cb(projects);
	};

	this.getProjectByName = (name, cb) => {
		for (var p of projects) {
			if (p.name === name) {
				cb(p);
			}
		}
	};

	/*
		Takes in a username string and returns the user
		with that username
	*/
	this.getUserByUsername = (name, cb) => {
		for (var u of users) {
			if (u.username === name) {
				cb(u);
			}
		}
	};
}

module.exports = Storage;
