const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./medicationrequest.config');

/**
 * @name exports
 * @summary Patient conformance statement
 */
module.exports = {
	profile: 'medicationrequest',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let MedicationRequest = require(resolveFromVersion(version, 'base/MedicationRequest'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: MedicationRequest.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/medicationrequest.html'
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
