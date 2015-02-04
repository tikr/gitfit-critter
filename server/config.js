module.exports = {
	github: {
		id: process.env.GITHUB_ID,
		secret: process.env.GITHUB_SECRET,
		callbackUrl: '/auth/github/callback'
	},
	fitbit: {
		id: process.env.CONSUMER_KEY,
		secret: process.env.CONSUMER_SECRET,
		callbackUrl: '/auth/fitbit/callback'
	},
	mongo: {
	    uri: 'mongodb://localhost/gitfit-critter-dev'
	},
	sendgrid:{
		username: process.env.SENDGRID_USERNAME,
		password: process.env.SENDGRID_PASSWORD
	},
	cronToken: 'a1d2d684c73a2ef06ec30742a3c721b756a01969'
}
