(function(){

    'use strict';

    /**
     * @name seasonChampions.service:SeasonChampionsService
     * @description
     * # SeasonChampionsService
     * Service of the seasonChampions
     */
    angular.module('seasonChampions')
        .service('SeasonChampionsService', SeasonChampionsService);

        /* @ngInject */
        function SeasonChampionsService($http, CONFIG, ApiHelper, SeasonChampionsHelper) {
            return {
                getSeasonChampions: getSeasonChampions
            }

            function getSeasonChampions(from, to) {
                var params = SeasonChampionsHelper.calculateLimitAndOffset(from, to);
                return $http({
                    method: 'GET',
                    url: CONFIG.apiUrl + 'driverStandings/1.json',
                    params: params
                })
                    .then(ApiHelper.extractData);
            }

        }

})();
