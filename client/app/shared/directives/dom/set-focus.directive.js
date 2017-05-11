(function() {

	'use strict';

	/**
     * @name f1StatsApp.directive:setFocusDirective
     * @description
     * # setFocusDirective
     * Directive of the f1StatsApp
     * This DOM directive sets focus to the input element based on the parameter value
     */
	angular.module('f1StatsApp')
		.directive('setFocus', setFocusDirective);

		/** @ngInject */
		function setFocusDirective($timeout) {
			return {
				restrict: 'A',
				scope: {
					setFocus: '='
				},
				link: function(scope, element, attrs) {

					/*
						Setting focus on the element when the evaluated value of attribute changes to true
					*/
					scope.$watch('setFocus', function(newVal) {
						if (newVal) {
							$timeout(function() {
								element[0].focus();
							}, 300);
						}
					});
				}
			};
		};

})();
