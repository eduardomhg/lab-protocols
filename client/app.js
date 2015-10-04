(function() {

	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('labProtocolsApp', [
	  'ngRoute',
	  'myApp.view1',
	  'myApp.view2',
	  'myApp.version'
	]).

	config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/view1'});
	}]).

	controller('ProtocolController', ['$scope', '$http', function($scope, $http) {

		// GET from /protocols all available protocols
    $http({ method: 'GET', url: '/protocols' }).
      success(function (data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available.
        console.log('protocols: ', data);

        $scope.protocols = data;

        $scope.updatePreview = function() {
          document.getElementById('mdtest').innerHTML = markdown.toHTML($scope.markdownText);
        };


      }).
      error(function (data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('Oops and error', data);
      });


      // Define the save() method to insert a new Protocol when a button is pushed
    	$scope.save = function () {

      	console.log('Insert was pressed!');

      	if (!$scope.newTitle || $scope.newTitle.length < 1) return;

      	$http({ method: 'POST', url: '/protocols', data: { title: $scope.newTitle } }).
          success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available.
            console.log('Inserted new protocol: ', $scope.newTitle);

            $scope.newTitle = ''; // clear textbox

            $http({ method: 'GET', url: '/protocols' }).
                success(function (data, status, headers, config) {
                  // this callback will be called asynchronously
                  // when the response is available.
                  console.log('protocols: ', data);

                  $scope.protocols = data;

                }).
                error(function (data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  console.log('Oops and error', data);
                });

          }).
          error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Oops and error', data);
          });
    	};

      // Define the delete() method to delete a Protocol when a button is pushed
    	$scope.delete = function (id) {

	      console.log('Delete was pressed for id ' + id);

	      $http({ method: 'DELETE', url: '/protocols/' + id }).
          success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available.
            console.log('Deleted protocol: ', id);

            $http({ method: 'GET', url: '/protocols' }).
                success(function (data, status, headers, config) {
                  // this callback will be called asynchronously
                  // when the response is available.
                  console.log('protocols: ', data);

                  $scope.protocols = data;

                }).
                error(function (data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  console.log('Oops and error', data);
                });

          }).
          error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Oops and error', data);
          });
	    };

			// Define the deleteAll() method to delete all Protocol when a button is pushed
	    $scope.deleteAll = function () {

	      console.log('Delete All was pressed');

	      $http({ method: 'DELETE', url: '/protocols' }).
          success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available.
            console.log('Deleted all protocols');

            $http({ method: 'GET', url: '/protocols' }).
                success(function (data, status, headers, config) {
                  // this callback will be called asynchronously
                  // when the response is available.
                  console.log('protocols: ', data);

                  $scope.protocols = data;

                }).
                error(function (data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                  console.log('Oops and error', data);
                });

          }).
          error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Oops and error', data);
          });
    	};
	}]);

})();