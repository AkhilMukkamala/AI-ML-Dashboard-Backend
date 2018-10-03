const pm2 = require('./../ecosystem.config');

let environment = process.env.NODE_ENV || 'development';


let connectionString = '';
let domain = '';
let database = '';
let port = '';
let MPORT = '';
let MHOST = '';

const configs = (err) => {
  if (environment == 'development') {
    connectionString = pm2.apps[0].env.connectionString;
    domain = pm2.apps[0].env.URL;
    database = pm2.apps[0].env.DB;
    port = pm2.apps[0].env.PORT;
    MHOST = pm2.apps[0].env.MHOST;
    MPORT = pm2.apps[0].env.MPORT;
    return {
      environment: environment,
      connectionString: connectionString,
      domain: domain,
      database: database,
      port: port,
      MHOST: MHOST,
      MPORT: MPORT,
    };
  } else if (environment == 'production'){
    connectionString = pm2.apps[0].env_production.connectionString;
    domain = pm2.apps[0].env.URL;
    database = pm2.apps[0].env.DB;
    port = pm2.apps[0].env_production.PORT;
    MHOST = pm2.apps[0].env.MHOST;
    MPORT = pm2.apps[0].env.MPORT;
    return {
      environment: environment,
      connectionString: connectionString,
      domain: domain,
      database: database,
      port: port,
      MHOST: MHOST,
      MPORT: MPORT,
    };
    // return [connectionString, domain, database, port, MHOST, MPORT];
  } else {
    throw err;
  }
}

module.exports.config = configs;
