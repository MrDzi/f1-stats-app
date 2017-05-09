(function(){

	'use strict';

	/**
	 * @name raceWinners.controller:RaceWinnersCtrl
	 * @description
	 * # RaceWinnersCtrl
	 * Controller of the raceWinners
	 */
	angular.module('raceWinners')
	    .controller('RaceWinnersCtrl', RaceWinnersCtrl);	

	    /* @ngInject */
	    function RaceWinnersCtrl($scope, $state, $q, RaceWinnersService, NotificationsService) {
	    	
	    	var vm = this;

	    	vm.season = $state.params.season;
	    	var seasonChampionId;

	    	function init() {
	    		/*
	    			Setting loading flag to true to show the loader
	    		*/
	    		vm.loading = true;
	    		/*
					If the user comes from 'season champions' page to this page, we already have seasonChampionId available as a param we passed to this state. We need it for marking season champion in the race winners list
    			*/
	    		if ($state.params.seasonChampionId) { 
					seasonChampionId = $state.params.seasonChampionId;
					RaceWinnersService.getRaceWinners(vm.season).then(getRaceWinnersSuccess);
		    	}
		    	/*
					If the user initially comes to this page (by entering URL), we have to get the seasonChampionId first
    			*/  
		    	else {
		    		RaceWinnersService.getSeasonChampion(vm.season).then(function(response) {
		    			seasonChampionId = response.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId;
		    			RaceWinnersService.getRaceWinners(vm.season).then(getRaceWinnersSuccess, onError);
		    		});
		    	}
	    	}
	    	init();

	    	function getRaceWinnersSuccess(response) {
    			var races = response.RaceTable.Races;
    			/*
    				Setting transitionDelay to 0 and then incrementing it in the loop. We use this to animate rows of the grid once it's loaded.
    			*/
    			var transitionDelay = 0;
    			/*
    				Mapping over races we fetched so we could have the data in the form we need it. This could also be done with the separated constructor. Also, pagination could be implemented here, but the lists are relatively small
    			*/
    			vm.raceWinners = races.map(function(race) {
    				var winner = race.Results[0];
    				var raceWinner = {
    					raceName: race.raceName,
    					name: winner.Driver.givenName + ' ' + winner.Driver.familyName,
    					time: winner.Time ? winner.Time.time : '/'
    				}
    				/*
						Setting non-enumerable properties which we don't need listed in the grid. This doesn't have to be done this way, it seemed to me as an interested approach
    				*/
    				Object.defineProperties(raceWinner, {
	            		'isSeasonChampion': {
	            			value: winner.Driver.driverId == seasonChampionId
	            		},
	            		'transitionDelay': {
	            			value: transitionDelay + 's'
	            		}
	            	});
	            	transitionDelay += .03;
    				return raceWinner;
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
	    	
	    }
	
})();

