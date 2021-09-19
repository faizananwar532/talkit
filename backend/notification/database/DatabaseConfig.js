const Knex = require('knex');
const { Model } = require('objection');
const KnexConfig = require('./knexfile');

//Knex Configuration
const knex = Knex(KnexConfig);

const initializeDB = function () {

	//Initialize knex Model
	Model.knex(knex);

};

const destroyKnex = function () {
	knex.destroy();
};

module.exports = { initializeDB, destroyKnex };