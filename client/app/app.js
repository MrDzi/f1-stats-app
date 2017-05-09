(function() {
	
	'use strict';

	/**
	 * @name f1StatsApp
	 * @description
	 * # f1StatsApp
	 *
	 * Main module of the application. This is where all the dependencies are included in the app
	 */
	angular.module('f1StatsApp', [

			//////////
			// Core //
			//////////
	  		'home',
	  		'seasonChampions',
	  		'raceWinners',

	  		////////////////
			// Directives //
			////////////////
			'grid',

	  		//////////
			// Libs //
			//////////
	  		'ui.router',
	  		'toastr',
	  		'angularSpinner'

	  	]);

})();
