const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:dadi@localhost:5432/HAM');
const Promise = require('bluebird');


function createTables(){
// activityItems table created.
  db.none(`CREATE TABLE IF NOT EXISTS activityItems(
            id                  SERIAL PRIMARY KEY,
            date                timestamp,
            userId              integer,
            time                varchar(11),
            content             varchar(255),
            pleasure            integer,
            skill               integer
          )`)
  .then( () => {
    console.log("activityItems table created!");
  })
  .catch( (error) => {
    console.log("Failed to create activityItems table!", error)
  });

  db.none(`CREATE TABLE IF NOT EXISTS scheduleItems(
            id                  SERIAL PRIMARY KEY,
            date                timestamp,
            userId              integer,
            time                varchar(11),
            content             varchar(255)
          )`)
  .then( () => {
    console.log("scheduleItems table created!");
  })
  .catch( (error) => {
    console.log("Failed to create scheduleItems table!", error)
  });

}

function getActivityStats( userId, numDays ) {

  return db.any(`SELECT date, Avg(pleasure) AS avg_pleasure, Avg(skill) AS avg_skill
          FROM activityitems
          WHERE skill > 0 AND pleasure > 0 AND userId = $1
          AND date >= CURRENT_DATE - INTERVAL '$2 DAY'
          GROUP BY date;`, [userId, numDays]);
}

function insertActivityItem( date, time, userId ) {
  db.none(`INSERT INTO activityItems(date, userId, time, pleasure, skill)
           VALUES($1, $2, $3, 0, 0)`,
           [date, userId, time]);
}
function insertScheduleItem( date, time, userId ) {
  db.none(`INSERT INTO scheduleItems(date, userId, time)
           VALUES($1, $2, $3)`,
           [date, userId, time]);
}
function updateActivityItem( activityItem, userId ) {
  db.none(`UPDATE activityItems SET content = $1, pleasure = $2, skill = $3
           WHERE userId = $4 AND date = $5 AND time = $6`,
           [activityItem.content, activityItem.pleasure, activityItem.skill,
            userId, activityItem.date, activityItem.time]);
}
function updateScheduleItem( scheduleItem, userId ) {
  db.none(`UPDATE scheduleItems SET content = $1
           WHERE userId = $2 AND date = $3 AND time = $4`,
           [scheduleItem.content, userId, scheduleItem.date, scheduleItem.time]);
}

function getScheduleItemsForDate( date ) {
  return db.any(`SELECT * FROM scheduleItems WHERE date = $1`, [date]);
}

function getActivityItemsForDate( date ) {
  return db.any(`SELECT * FROM activityItems WHERE date = $1`, [date]);
}


function createFreshActivityItems(newDate, userId ) {
  let time = createTimeTable();
  let activityItems = [];

  time.map( timeItem => {
      insertActivityItem(newDate, timeItem, userId);
      activityItems.push( { date: newDate,
                            time: timeItem,
                            content: '',
                            pleasure: 0,
                            skill: 0 });
  });
  return Promise.resolve(activityItems);
}

function createFreshScheduleItems(newDate, userId ) {
  let time = createTimeTable();
  let scheduleItems = [];

  time.map( timeItem => {
      insertScheduleItem(newDate, timeItem, userId);
      scheduleItems.push( { date: newDate,
                            time: timeItem,
                            content: ''});
  });
  return Promise.resolve(scheduleItems);
}

function createTimeTable() {
  const time = [];
  for( let i = 0; i < 24; i++ ) {
    if(i < 9) {
      time.push('0'+i+':00-0'+(i+1)+':00');
    }
    else if (i == 9) {
      time.push('09:00-10:00');
    }
    else if( i == 23) {
      time.push('23:00-00:00');
    } else {
      time.push(i+':00-'+(i+1)+':00');
    }
  }
  return time;
}

module.exports = {
  getActivityStats,
  createTables,
  insertActivityItem,
  insertScheduleItem,
  getActivityItemsForDate,
  getScheduleItemsForDate,
  updateActivityItem,
  updateScheduleItem,
  createFreshActivityItems,
  createFreshScheduleItems,
};
