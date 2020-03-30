module.exports = (server, db) => {

  /**
   * /GET /summary
   */

  server.get('/summary', async (req, res) => {
    try {
      const data = await db.getSummary() ;
      res.send(data);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /summary/latest
   */

  server.get('/summary/latest', async (req, res) => {
    try {
      const data = await db.getSummary('latest');
      if (!data) {
        return res.sendStatus(404);
      }

      res.send(data);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /countries
   */

  server.get('/countries', async (req, res) => {
    try {
      const data = await db.getCountries();
      res.send(data);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /countries/:country
   */

  server.get('/countries/:country', async (req, res) => {
    try {

      if (req.params.country === 'latest') {
        let data = await db.getCountries(null, 'latest', req.query.sort);
        return res.send(data);
      }

      const data = await db.getCountries(req.params.country);
      if (!data) {
        return res.sendStatus(404);
      }

      res.send(data);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /countries/:country/latest
   */

  server.get('/countries/:country/latest', async (req, res) => {
    try {
      const data = await db.getCountries(req.params.country, 'latest');
      if (!data) {
        return res.sendStatus(404);
      }

      res.send(data);
    } catch(err) {
      res.sendStatus(500);
    }
  });

  /**
   * /GET /country
   */

  server.get('/country', async (req, res) => {
    try {
      const data = await db.getCountry();
      res.send(data);
    } catch(err) {
      res.sendStatus(500);
    }
  });

}