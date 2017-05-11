const express = require('express');
const fs = require('fs');
const db = require('./dbConnect');
const app = express();
const bodyParser = require('body-parser');
const authFunc = require('./authFunctions');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('port', (process.env.PORT || 3001));

// Passport session setup.
passport.serializeUser((user, done) => {
  console.log("serializing " + user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializing " + user);
  done(null, user);
});

app.use(cookieParser());
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'hamdinner', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use((req, res, next) => {
  let err = req.session.error;
  let msg = req.session.notice;
  let success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// Create the tables in the database
db.createTables();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/register', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {

    if(user){
      req.logIn(user, err => {
        if(err){ return next(err); }
      })
    }

    if(req.user){
      res.json({user:req.user});
    } else {
      res.status(303);
    }

  })(req,res,next);
});
app.post('/login', (req, res, next) => {
  console.log('login');
  passport.authenticate('local-signin', (err, user, info) => {
    if(user){
      req.logIn(user, err => {
        if(err){ return next(err); }
      })
    }

    if(req.user){
      res.json({user:req.user});
    } else {
      res.json(false);
    }

  })(req,res,next);
});


app.get('/logout', (req, res) => {
  console.log("Logging out " + req.user.username);
  req.logout();
  res.json(true);
})

passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  (req, username, password, done) => {
    authFunc.localReg(username, password)
    .then((user) => {
      if (user) {
        console.log("REGISTERED: " + user.username);
        done(null, user);
      }
      if (!user) {
        done(null, user);
      }
    })
    .fail((err) => {
      console.log(err.body);
      done(err);
    });
  }
));


passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  (req, username, password, done) => {
    authFunc.localAuth(username, password)
    .then((user) => {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        done(null, user);
      }
    })
    .fail((err) => {
      done(null, err);
    });
  }
));



app.get('/activityStatistics/:numDays', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {
    const userId = req.user.id;
    const numDays = parseInt(req.params.numDays);
    db.getActivityStats( userId, numDays ).
    then( stats => {
      res.json(stats);
    }).
    catch( error => {
      console.log(error);
    })
  }
})

app.post('/insertActivityItem', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {
    const activityItem = req.body.activityItem;
    const userId = req.user.id;
    db.updateActivityItem(activityItem, userId);
  }
});

app.post('/insertScheduleItem', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {

    const scheduleItem = req.body.scheduleItem;
    const userId = req.user.id;
    db.updateScheduleItem(scheduleItem, userId);
  }
});

// Get all activity items for a specific date
app.get('/getActivityItems/:date', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {
    const userId = req.user.id;
    const date = req.params.date;

    db.getActivityItemsForDate( date, userId ).
    then( data => {
      if(data.length > 0) {
        res.json(data);
      } else {
        db.createFreshActivityItems(date, userId).
        then( activityItems => {
          res.json(activityItems);
        })
      }
    }).
    catch( error => {
      res.json('error');
    });
  }
});

// Get all schedule items for a specific date.
app.get('/getScheduleItems/:date', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {

    const userId = req.user.id;
    const date = req.params.date;

    db.getScheduleItemsForDate( date,userId ).
    then( data => {
      if(data.length > 0) {
        res.json(data);
      } else {
        db.createFreshScheduleItems(date, 1).
        then( scheduleItems => {
          res.json(scheduleItems);
        })
      }
    }).
    catch( error => {
      res.json('error');
    });
  }
});

// Return the most commonly used entries for a user
app.get('/commonWords', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {
    const userId = req.user.id;
    db.getCommonWords(userId)
    .then( data => {
      res.json(data);
    })
    .catch(error => {
      console.log("errorino"+error);
    })
  }

});

// Get a users thought templates
app.get('/fetchThoughtTemplates', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {

    const userId = req.user.id;
    db.getAllThoughtTemplates( userId )
    .then( data => {
      res.json(data);
    })
    .catch( error => {
      console.log(error);
    })
  }
});
app.post('/saveThoughtTemplate', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {

    const thoughtTemplate = req.body.thoughtTemplate;
    thoughtTemplate.userId = req.user.id;
    db.saveThoughtTemplate( thoughtTemplate )
    .then( id => {
      res.json(id);
    });
  }
});
app.post('/updateThoughtTemplates', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {

    const thoughtTemplate = req.body.thoughtTemplate;
    thoughtTemplate.userId = req.user.id;
    db.updateThoughtTemplates( thoughtTemplate );
  }
});
app.post('/deleteThoughtTemplates', (req, res) => {
  if(!req.user){
    res.status(303).send({error: 'Not logged in'});
  } else {

    const thoughtTemplate = req.body.thoughtTemplate;
    thoughtTemplate.userId = req.user.id;
    db.deleteThoughtTemplates( thoughtTemplate.id );
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
