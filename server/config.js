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
	 uri: 'mongodb://admin:admin@ds041561.mongolab.com:41561/heroku_app33693178',
	  options: {
      db: {
        safe: true
      }
    }
	},
	sendgrid:{
		username: process.env.SENDGRID_USERNAME,
		password: process.env.SENDGRID_PASSWORD
	},
	secrets: {
    session: 'gitfit-critter-secret'
  },
	cronToken: {
		id: 'e0a9176fb3ae7fd4a68b',
		secret: '287869c1df3f9503a856ed6083f70a32ffea3e93',
		token: 'a1d2d684c73a2ef06ec30742a3c721b756a01969'
	}
};
