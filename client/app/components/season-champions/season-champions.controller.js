(function(){

	'use strict';

	/**
	 * @name seasonChampions.controller:SeasonChampionsCtrl
	 * @description
	 * # SeasonChampionsCtrl
	 * Controller of the seasonChampions
	 */
	angular.module('seasonChampions')
	    .controller('SeasonChampionsCtrl', SeasonChampionsCtrl);	

	    /* @ngInject */
	    function SeasonChampionsCtrl($state, SeasonChampionsService, NotificationsService) {
	    	
	    	var vm = this;
	    	/*
	    		Binding what we need to be bind to the scope of the controller
	    	*/
	    	vm.goToSeason = goToSeason;

	    	function init() {
	    		/*
	    			Setting loading flag to true to show the loader
	    		*/
	    		vm.loading = true;
	    		SeasonChampionsService.getSeasonChampions(2005, 2015).then(getSeasonChampionsSuccess, onError);
	    	}
	    	init();

	    	function getSeasonChampionsSuccess(response) {
	    		var standingsLists = response.StandingsTable.StandingsLists;
	    		/*
    				Setting transitionDelay to 0 and then incrementing it in the loop. We use this to animate rows of the grid once it's loaded.
    			*/
	    		var transitionDelay = 0;
	    		/*
    				Mapping over races we fetched so we could have the data in the form we need it. This could also be done with the separated constructor
    			*/
	            vm.seasonChampions = standingsLists.map(function(standingsList) {
	            	var driver = standingsList.DriverStandings[0].Driver;
	            	var seasonChampion = {
	            		season: standingsList.season,
	            		name: driver.givenName + ' ' + driver.familyName,
	            		nationality: driver.nationality
	            	}
	            	/*
						Setting non-enumerable properties which we don't need listed in the grid. This doesn't have to be done this way, it seemed to me as an interested approach
    				*/
	            	Object.defineProperties(seasonChampion, {
	            		'driverId': {
	            			value: driver.driverId
	            		},
	            		'transitionDelay': {
	            			value: transitionDelay + 's'
	            		}
	            	});
	            	transitionDelay += .03;
	            	return seasonChampion;
	            });
	            /*
    				Setting loading flag back to false once the request is over and we get the data
    			*/
	    		vm.loading = false;
	        }

	        function onError(errorMessage) {
	            NotificationsService.errorMessage(errorMessage);
	            vm.loading = false;
	        }

	        /*
	        	When the row is clicked, we pass that item as an argument so we could use its properties as parameters for the state that is about to be loaded
	        */
	        function goToSeason(seasonChampion) {
	        	$state.go('app.race-winners', {
	        		season: seasonChampion.season,
	        		seasonChampionId: seasonChampion.driverId
	        	});
	        }
	    }
	
})();

