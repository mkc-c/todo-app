/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255),
            user_id UUID REFERENCES users(id)
        );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE todos;
    `);
};
