/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        CREATE EXTENSION "uuid-ossp";
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP EXTENSION "uuid-ossp";
    `);
};
