const { Model } = require('objection');

class User extends Model {

	static get tableName() {
		return 'User';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['email', 'password'],

			properties: {
				id: { type: 'integer' },
				email: { type: 'string' },
				password: { type: 'string', minLength: 6 },
				tenant_id: { type: 'integer' },
				is_active: {
					type: 'boolean',
					default: false
				}
			}
		};
	}
	
}

module.exports = User;