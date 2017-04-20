// set up express - npm install express --save
const express = require('express');
// install handlebars - npb install hbs --save
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// set app to the value of the function express
var app = express();
// setting up directory for partial
hbs.registerPartials(__dirname + '/views/partials')
// setting the view engine to handlbars
app.set('view engine', 'hbs');

// maintenance middleware
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log)

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err){
			console.log('There was an error')
		}
	})

	next();
})



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

hbs.registerHelper('printProjects', (projects) => {
	var html = ""
	projects.forEach((project) => {
		html += '<div class="project-container">'
		html += '<h2 class="project-header">' + project.title + '</h2>'
		html += '<p class"project-description">' + project.description + '</p>'
		html += '</div>'
	})
	return html
})

// get request to root route takes two parameters: url and function
// function has two variables request and response
app.get('/', (req, res) => {
	// send a response to the get request
	res.render('home.hbs', {
		pageTitle: "Home Page",
		hobbies: "I like programming and surfing"
	})
});

// set up a new page /about
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	})
})

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Project Page',
		projects: [
				{
				title: "First Project",
				description: "First node project!"
			},
			{
				title: 'Second Project',
				description: 'Second node project!'
			}
		]
	})
})
// set up a new page /bad with error message obj
app.get('/bad', (req, res) => {
	res.send({errorMessage:'Sorry bad url'})
})
// set up server to listen on port 3000
app.listen(port, () => {
	console.log(`Server is up on port ${port}` )
});
// launch via nodemon 