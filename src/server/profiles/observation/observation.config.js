const {route_args, common_args} = require('../common.arguments');
const {CONFIG_KEYS, VERSIONS} = require('../../../constants');
const resource_args = require('./observation.arguments');
const controller = require('./observation.controller');

const scopes = [
	'user/*.*',
	'user/Observation.*',
	'user/Observation.read',
	'user/*.read',
	'observation/*.*',
	'observation/Observation.*',
	'observation/Observation.read',
	'observation/*.read'
];

let commonArgsArray = Object.getOwnPropertyNames(common_args)
	.map((arg_name) => common_args[arg_name]);

let resourceArgsArray = Object.getOwnPropertyNames(resource_args)
	.map((arg_name) => Object.assign({ versions: VERSIONS.STU3 }, resource_args[arg_name]));

const resourceAllArguments = [
	route_args.VERSION,	...commonArgsArray, ...resourceArgsArray,
];

let routes = [
	{
		type: 'get',
		path: '/:version/observation',
		corsOptions: {methods: ['GET']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getObservation
	},
	{
		type: 'post',
		path: '/:version/observation/_search',
		corsOptions: {methods: ['POST']},
		args: resourceAllArguments,
		scopes: scopes,
		controller: controller.getObservation
	},
	{
		type: 'get',
		path: '/:version/observation/:id',
		corsOptions: {methods: ['GET']},
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: scopes,
		controller: controller.getObservationById
	}
];

/**
 * @name exports
 * @summary Observation config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.OBSERVATION
	},
	routes
};
