import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../../services/loginService";

let LocalStrategy = passportLocal.Strategy;

// init the passport-local
let initPassportLocal = () => {
    // check login with the email and password input
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async(req, email, password, done) => {
        try{
            // find the user using their email
            await loginService.findUserByEmail(email)
            // do they exist? 
            .then(async (user) => {
                console.log("awaited loginservice")
                if (!user) {
                    console.log("user not found")
                    return done(null, false, req.flash("errors", "User not found"));
                }
                // compare the user password with input
                let message = await loginService.comparePassword(password, user);
                if (message === true) {
                    return done(null, user, null);
                } else {
                    // return false with the error message
                    return done(null, false, req.flash("errors", message));
                }
            }).catch (error => {
                return done(null, false, erq.flash("errors", error));
            });
        } catch (error) {
            return done(null, false, error);
        }
    }));
};

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    await loginService.findUserById(id).then(user => {
        return done(null, user)
    }).catch(error => {
        return done(error, null);
    })
});

module.exports = initPassportLocal;