
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 128).unique().notNullable();
      tbl.string('password', 255).notNullable();
      tbl.boolean('is_helper').defaultTo(false);
      tbl.string('email', 128);
    })
    .createTable('tickets', tbl => {
      tbl.increments();
      tbl.string('title', 128).notNullable();
      tbl.text('description').notNullable();
      tbl.text('tried').notNullable();
      tbl.string('category', 128);
      tbl.integer('assigned_to')
        .unsigned()
        .defaultTo(0);
      tbl.boolean('resolved').defaultTo(false);
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
      tbl.integer('created_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tickets')
    .dropTableIfExists('users');
};
