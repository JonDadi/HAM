const express = require('express');
const fs = require('fs');
const db = require('./dbConnect');
const app = express();
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3001));

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true}));

db.createTables();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.get('/activityStatistics/:numDays', (req, res) => {
  // User id hardcoded untill login is implemented.
  const userId = 1;
  const numDays = parseInt(req.params.numDays);
  db.getActivityStats( userId, numDays ).
  then( stats => {
    res.json(stats);
  }).
  catch( error => {
    console.log(error);
  })

})

app.post('/insertActivityItem', (req, res) => {
    const activityItem = req.body.activityItem;
    db.updateActivityItem(activityItem, 1);
});
app.post('/insertScheduleItem', (req, res) => {
    const scheduleItem = req.body.scheduleItem;
    db.updateScheduleItem(scheduleItem, 1);
});

app.get('/getActivityItems/:date', (req, res) => {
  const date = req.params.date;

  db.getActivityItemsForDate( date ).
  then( data => {
    if(data.length > 0) {
      res.json(data);
    } else {
      db.createFreshActivityItems(date, 1).
      then( activityItems => {
        res.json(activityItems);
      })
    }
  }).
  catch( error => {
    res.json('error');
  });
});

app.get('/getScheduleItems/:date', (req, res) => {
  const date = req.params.date;

  db.getScheduleItemsForDate( date ).
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
});

app.get('/commonWords', (req, res) => {
    db.getCommonWords()
    .then( data => {
      res.json(data);
    })
    .catch(error => {
      console.log(error);
    })
});

app.get('/fetchThoughtTemplates', (req, res) => {
  db.getAllThoughtTemplates( 1 )
  .then( data => {
    res.json(data);
  })
  .catch( error => {
    console.log(error);
  })
});
app.post('/saveThoughtTemplate', (req, res) => {
  const thoughtTemplate = req.body.thoughtTemplate;
  thoughtTemplate.userId = 1;
  db.saveThoughtTemplate( thoughtTemplate )
  .then( id => {
    res.json(id);
  });
});
app.post('/updateThoughtTemplates', (req, res) => {
  const thoughtTemplate = req.body.thoughtTemplate;
  db.updateThoughtTemplates( thoughtTemplate );
});
app.post('/deleteThoughtTemplates', (req, res) => {
  const thoughtTemplate = req.body.thoughtTemplate;
  db.deleteThoughtTemplates( thoughtTemplate.id );
});



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
