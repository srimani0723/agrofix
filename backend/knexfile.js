require("dotenv").config();

module.exports = {
  development: {
    client: "pg", // PostgreSQL database
    connection: process.env.DATABASE_URL, // Use environment variable for DB connection
    pool: { min: 2, max: 10 }, // Connection pooling
    migrations: {
      directory: "./migrations", // Store migration files here
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds", // Store seed files here
    },
  },

  production: {
    client: "pg", // PostgreSQL database
    connection: process.env.DATABASE_URL, // Use Neon.tech database credentials
    pool: { min: 2, max: 10 }, // Optimize for production scaling
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
