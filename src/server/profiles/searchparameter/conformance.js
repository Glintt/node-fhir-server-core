const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./searchparameter.config');

/**
 * @name exports
 * @summary Patient conformance statement
 */
module.exports = {
	profile: 'searchparameter',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let SearchParameter = require(resolveFromVersion(version, 'base/SearchParameter'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: SearchParameter.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/searchparameter.html'
			},
			interaction: [{
				code: 'read'
			}, {
				code: 'search'
			}],
			searchParam: searchParams
		};
	}
};
