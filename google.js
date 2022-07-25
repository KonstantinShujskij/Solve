const passport = require('passport')
const passportGoogle = require('passport-google-oauth')
const config = require('config')
const userQueries = require('./queries/user.queries')


const googleOptions = {
    clientID: config.get('googleClientId'),
    clientSecret: config.get('googleSecretKey'),
    callbackURL: 'http://localhost:5000/api/auth/google/redirect'
}

const googleStrategy = new passportGoogle.OAuth2Strategy(googleOptions,
    async (request, accessToken, refreshToken, profile, done) => {
        const email = profile._json.email

        let {user, error} = await userQueries.login(email, null, 'google')

        return done(error, user)
})

passport.use(googleStrategy)