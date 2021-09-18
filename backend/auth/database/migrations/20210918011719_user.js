
exports.up = function (knex) {
	return knex.schema
		.createTable('User', (t) => {
			t.increments();
			t.string('username').unique().notNullable();
			t.string('email').unique().notNullable();
			t.string('password').notNullable();
			t.boolean('is_active').notNullable().defaultTo(false);
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTable('User');
};
