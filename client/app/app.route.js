(function() {
	
	'use strict';

	/**
	 * @name route
	 * @description
	 * # route
	 *
	 * Defining all routes of the application.
	 */
	angular.module('f1StatsApp')
		.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.hashPrefix('');

		$stateProvider
			.state('app', {
				abstract: true,
				templateUrl: 'app/app.html'
			})
			.state('app.home', {
				url: '',
				templateUrl: 'app/components/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('app.season-champions', {
				url: '/season-champions',
				templateUrl: 'app/components/season-champions/season-champions.html',
				controller: 'SeasonChampionsCtrl',
				controllerAs: 'vm'
			})
			.state('app.race-winners', {
				url: '/race-winners/:season',
				templateUrl: 'app/components/race-winners/race-winners.html',
				controller: 'RaceWinnersCtrl',
				controllerAs: 'vm',
				params: {
					seasonChampionId: null
				}
			});

			$urlRouterProvider.otherwise('');
	}

})();