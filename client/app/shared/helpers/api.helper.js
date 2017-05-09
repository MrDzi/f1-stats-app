(function() {
	
	'use strict';

	/**
	 * @name f1StatsApp.helper:ApiHelper.helper
	 * @description
	 * # ApiHelper
	 */
	angular.module('f1StatsApp')
	    .service('ApiHelper', function() {

	        return {
	            extractData
	        };

	        function extractData(response) {
	            return response.data.MRData;
	        }

	    });

})();
