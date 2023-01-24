/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE users (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE users;
    `);
};
