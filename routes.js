module.exports = (server, db) => {

  /**
   * /GET /summary
   */

  server.get('/summary', (req, res) => {
    try {
      res.send(db.summary);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /summary/latest
   */

  server.get('/summary/latest', (req, res) => {
    try {
      res.send({ updated_at: db.summary.updated_at, latest: db.summary.latest });
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /countries
   */

  server.get('/countries', (req, res) => {
    try {
      res.send(db.all);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /countries/:country
   */

  server.get('/countries/:country', (req, res) => {
    try {
      
      for(let i = 0; i < db.all.length; i++) {
        if (db.all[i]['Country/Region'].trim().toLowerCase() === req.params.country.trim().toLowerCase()) {
          return res.send(db.all[i]);
        }
      }

      res.sendStatus(404);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /countries/:country/latest
   */

  server.get('/countries/:country/latest', (req, res) => {
    try {
      
      for(let i = 0; i < db.all.length; i++) {
        if (db.all[i]['Country/Region'].trim().toLowerCase() === req.params.country.trim().toLowerCase()) {
          return res.send({
            'Country/Region': db.all[i]['Country/Region'],
            updated_at: db.all[i].updated_at,
            latest: db.all[i].latest
          });
        }
      }

      res.sendStatus(404);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /country
   */

  server.get('/country', (req, res) => {
    try {
      res.send(db.all.map(e => e['Country/Region']));
    } catch(err) {
      res.sendStatus(500);
    }
  });

}