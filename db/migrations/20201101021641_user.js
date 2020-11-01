
exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
        table.increments();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('username').notNullable();
        table.string('mail').notNullable();
        table.string('password').notNullable();
        table.timestamps('created_at')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('shows');
};
