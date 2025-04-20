// migrations/YYYYMMDDHHMMSS_create_users_table.js
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("username").unique().notNullable();
    table.string("password").notNullable(); // hashed password
    table.string("role").notNullable().defaultTo("buyer"); // 'buyer' or 'admin'
    table.timestamps(true, true); // created_at, updated_at
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
