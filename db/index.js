const _ = require('lodash');
const db = require('./covid19data.json');

const sortData = (data, type) => {
  data.sort((a, b) => {
    if (type === 'confirmed_asc') {
      return a.latest.confirmed - b.latest.confirmed;
    } else if (type === 'confirmed_desc') {
      return b.latest.confirmed - a.latest.confirmed;
    } else if (type === 'deaths_asc') {
      return a.latest.deaths - b.latest.deaths;
    } else if (type === 'deaths_desc') {
      return b.latest.deaths - a.latest.deaths;
    } else if (type === 'recovered_asc') {
      return a.latest.recovered - b.latest.recovered;
    } else if (type === 'recovered_desc') {
      return b.latest.recovered - a.latest.recovered;
    } else {
      return 0;
    }
  })
}

const model = db => ({

  getSummary(date = undefined) {
    return new Promise(resolve => {
      if (typeof date === 'string') {

        if (!db.summary[date]) {
          return resolve(null);
        }

        return resolve(_.cloneDeep({
          updated_at: db.summary.updated_at, 
          [date]: db.summary[date]
        }));

      }

      return resolve(_.cloneDeep(db.summary));
    });
  },

  getCountries(country = undefined, date = undefined, sort = undefined) {
    return new Promise(resolve => {
      if (typeof country === 'string') {
        for(let i = 0; i < db.all.length; i++) {
          if (db.all[i]['Country/Region'].trim().toLowerCase() === country.trim().toLowerCase()) {
            if (typeof date === 'string') {
              if (!db.all[i][date]) {
                return resolve(null);
              }

              return resolve(_.cloneDeep({
                'Country/Region': db.all[i]['Country/Region'],
                updated_at: db.all[i].updated_at, 
                [date]: db.all[i][date]
              }));
            }

            return resolve(_.cloneDeep(db.all[i])); 
          }
        }

        return resolve(null);
      }

      if (typeof date === 'string' && date === 'latest') {
        let data = _.cloneDeep(
          db.all.map(e => ({
            'Country/Region': e['Country/Region'],
            updated_at: e.updated_at,
            latest: e.latest
          }))
        );

        if (typeof sort === 'string') {
          sortData(data, sort)
        }

        return resolve(data);
      }

      return resolve(_.cloneDeep(db.all));
    });
  },

  getCountry() {
    return new Promise(resolve => {
      return resolve(db.all.map(e => e['Country/Region']));
    });
  }

})

module.exports = () => {
  return new Promise((resolve, reject) => {
    const summary = {}

    db.forEach(e => {
      summary.updated_at = e.updated_at;
    
      Object.keys(e).forEach(key => {
        if(key !== 'Country/Region' && key !== 'updated_at') {
          if(summary[key]) {
            summary[key].confirmed += e[key].confirmed;
            summary[key].deaths += e[key].deaths;
            summary[key].recovered += e[key].recovered;
          } else {
            summary[key] = { ...e[key] }
          }
        }
      });

    });

    return resolve(model({ summary, all: db }));
  })
}