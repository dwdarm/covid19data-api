const db = require('./covid19data.json');

module.exports = () => {
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
          summary[key] = e[key]
        }
      }
    });

  });

  return { summary, all: db }
}