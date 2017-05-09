(function() {
    
    'use strict';

    /**
     * @name f1StatsApp.helper:SeasonChampions.helper
     * @description
     * # SeasonChampionsHelper
     */
    angular.module('f1StatsApp')
        .service('SeasonChampionsHelper', function() {

            return {
                calculateLimitAndOffset
            };

            /*
                This method is used to calculate the parameters for get request based on the passed year interval (from, to)
            */
            function calculateLimitAndOffset(from, to) {
                return {
                	limit: to - from + 1,
                	offset: from - 1950
                }
            }

        });

})();
