import { Sequelize } from 'sequelize';

// db
const dbCreds: {
  userData: {
    db: string;
    user: string;
    pwd: string;
  };
  hostData: {
    [key: string]: string | number | boolean;
  };
} = {
  userData: {
    db: process.env.PG_DB,
    user: process.env.PG_USER,
    pwd: process.env.PG_PASSWORD
  },
  hostData: {
    host: process.env.PG_USER,
    dialect: process.env.PG_USER,
    port: process.env.PG_PORT as unknown as number,
    logging: true
  }
};
// sequelize instance
let { db, user, pwd } = dbCreds.userData;
const sequelize = new Sequelize(db, user, pwd, { ...dbCreds.hostData });

export {
  dbCreds,
  sequelize // export to use in Models
};
