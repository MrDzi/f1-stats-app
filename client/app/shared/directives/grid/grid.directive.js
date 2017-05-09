(function(){

    'use strict';

    /**
     * @name grid.directive:GridDirective
     * @description
     * # GridDirective
     * Directive of the grid
     * The grid is developed as a reusable component. It takes parameters - list items, header items and (optionally) a callback which is called on click on the row
     */
    angular.module('grid')
        .directive('grid', GridDirective);

        /* @ngInject */
        function GridDirective($timeout) {
            return {
                restrict: 'E',
                templateUrl: 'app/shared/directives/grid/grid.html',
                scope: {
                    listItems: '=',
                    tableHeadItems: '=',
                    rowClickCallback: '&'
                },
                link: function(scope, elem, attrs) {

                    /*
                        Waiting for the list items to be fetched so the animation could be fired
                    */
                    scope.$watch('listItems', function(newVal) {
                        if (newVal) {
                            $timeout(function() {
                                scope.startTransition = true;
                            }, 100);
                        }
                    });

                    /*
                        Check if isRowClickable parameter is passed. This is used for different styling of clickable and non-clickable rows
                    */
                    scope.isRowClickable = attrs.rowClickCallback;

                }
            }
        }

})();
