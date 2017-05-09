(function() {

    'use strict';

    /**
     * @name config
     * @description
     * # config
     *
     * App config
     */
    angular.module('f1StatsApp')
        .config(config);

        /** @ngInject */
	    function config(usSpinnerConfigProvider) {

	        usSpinnerConfigProvider.setDefaults({color: '#FF0000'});

	    }

})();
