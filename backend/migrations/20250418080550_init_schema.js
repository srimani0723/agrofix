// migrations/init_schema.js
exports.up = async function (knex) {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.string("buyer_id").notNullable();
    table.string("buyer_name").notNullable();
    table.string("buyer_contact").notNullable();
    table.text("delivery_address").notNullable();
    table.jsonb("items").notNullable(); // [{ productId, quantity, price }] list of products
    table.string("status").defaultTo("pending");
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("orders");
};
