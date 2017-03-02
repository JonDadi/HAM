const express = require('express');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.get('/activityMockData', (req, res) => {
  const mockData = [
    {
      time: '08:00-9:00',
      content: '',
      pleasure: 0,
      skill: 0,
    },
    {
      time: '10:00-11:00',
      content: 'Fara í ræktina',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '11:00-12:00',
      content: 'Fara í ræktina',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '12:00-13:00',
      content: 'Borða',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '13:00-14:00',
      content: 'Sund',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '15:00-16:00',
      content: 'Fara í tíma',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '17:00-18:00',
      content: 'Fara í tíma',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '18:00-19:00',
      content: 'Læra heima',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '19:00-20:00',
      content: 'Borða',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '20:00-21:00',
      content: 'Horfa á sjónvarp',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '21:00-22:00',
      content: 'Sofa',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '22:00-23:00',
      content: 'Sofa',
      pleasure: 5,
      skill: 7,
    },
    {
      time: '23:00-00:00',
      content: 'Sofa',
      pleasure: 5,
      skill: 7,
    },
  ];
  res.json(mockData);
});

app.get('/scheduleMockData', (req, res) => {
  const mockData = [
    {
      time: '08:00-9:00',
      content: 'Læra heima',
    },
    {
      time: '10:00-11:00',
      content: 'Fara í ræktina',
    },
    {
      time: '11:00-12:00',
      content: 'Fara í ræktina',
    },
    {
      time: '12:00-13:00',
      content: 'Borða',
    },
    {
      time: '13:00-14:00',
      content: 'Sund',
    },
    {
      time: '15:00-16:00',
      content: 'Fara í tíma',
    },
    {
      time: '17:00-18:00',
      content: 'Fara í tíma',
    },
    {
      time: '18:00-19:00',
      content: 'Læra heima',
    },
    {
      time: '19:00-20:00',
      content: 'Borða',
    },
    {
      time: '20:00-21:00',
      content: 'Horfa á sjónvarp',
    },
    {
      time: '21:00-22:00',
      content: 'Sofa',
    },
    {
      time: '22:00-23:00',
      content: 'Sofa',
    },
    {
      time: '23:00-00:00',
      content: 'Sofa',
    },
  ];

  res.json(mockData);
});
app.get('/commonWords', (req, res) => {
  const commonWords = ['Borða', 'Sofa', 'Læra heima', 'Dansa', 'Fara í ræktina'];
  res.json(commonWords);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
