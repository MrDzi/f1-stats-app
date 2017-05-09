(function(){

    'use strict';

    /**
     * @name raceWinners.service:RaceWinnersService
     * @description
     * # RaceWinnersService
     * Service of the raceWinners
     */
    angular.module('raceWinners')
        .service('RaceWinnersService', RaceWinnersService);

        /* @ngInject */
        function RaceWinnersService($http, CONFIG, ApiHelper) {
            return {
                getRaceWinners: getRaceWinners,
                getSeasonChampion: getSeasonChampion
            }

            function getSeasonChampion(season) {
                return $http({
                    method: 'GET',
                    url: CONFIG.apiUrl + season + '/driverStandings/1.json'
                })
                    .then(ApiHelper.extractData);
            }

            function getRaceWinners(season) {
                return $http({
                    method: 'GET',
                    url: CONFIG.apiUrl + season + '/results/1.json'
                })
                    .then(ApiHelper.extractData);
            }
        }

})();
