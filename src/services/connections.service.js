import * as fs from 'fs';
import { MongoClient } from 'mongodb';

const file = '/mongobrowser/connections.json';

export const getConnections = function (path) {
  return JSON.parse(fs.readFileSync(`${path}${file}`));
};

export const saveConnections = function (connections, path) {
  return fs.writeFileSync(`${path}${file}`, JSON.stringify(connections));
};

export const connect = function (url) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, async (err, db) => {
      if (err) {
        return reject(err);
      }
      const dbAdmin = db.db().admin();
      console.log(await dbAdmin.listDatabases());
      return resolve(dbAdmin);
    });
  });
};
