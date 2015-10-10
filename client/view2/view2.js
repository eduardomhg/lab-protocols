(function() {

	'use strict';

	angular.module('myApp.view2', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/view2', {
	    templateUrl: 'view2/view2.html',
	    controller: 'ProtocolController'
	  });
	}])

	.controller('ProtocolController', ['$scope', '$http', 'protocolDatabase', function($scope, $http, protocolDatabase) {

    // Handles any error in server connection.
    $scope.handleError = function(errorMessage) {
      alert(errorMessage);
    };

    // Gets all protocols from the server and stores them in $scope.protocols.
		$scope.refreshProtocols = function()	{

    	protocolDatabase.getAllProtocols().
        success(function (data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available.
          console.log('protocols: ', data);

          $scope.protocols = data;

          $scope.updatePreview = function() {
            document.getElementById('mdtest').innerHTML = markdown.toHTML($scope.markdownText);
          };

        }).
        error($scope.handleError.bind('Error reading protocols'));
		};


    // Define the save() method to insert a new Protocol when a button is pushed
  	$scope.addProtocol = function (newProtocol) {

    	console.log('Insert was pressed');

      // Validate fields (TODO add validation in html)
    	if (!newProtocol.title || newProtocol.title.length < 1) return;

    	protocolDatabase.addProtocol({ title: newProtocol.title }).
        success(function (data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available.
          console.log('Success creating new protocol: ', newProtocol.title);

          $scope.newProtocol = {}; // clear textbox

          $scope.refreshProtocols();
        }).
        error($scope.handleError.bind('Error adding protocol'));
  	};

    // Define the delete() method to delete a Protocol when a button is pushed
  	$scope.deleteProtocol = function (id) {

      console.log('Delete was pressed for id ' + id);

      protocolDatabase.deleteProtocol(id).
        success(function (data, status, headers, config) {
          console.log('Success deleting protocol: ', id);
          $scope.refreshProtocols();
        }).
        error($scope.handleError.bind('Error deleting protocol'));
    };

		// Define the deleteAll() method to delete all Protocol when a button is pushed
    $scope.deleteAll = function () {

      console.log('Delete All was pressed');

      protocolDatabase.deleteAllProtocols().
        success(function (data, status, headers, config) {
          console.log('Deleted all protocols');
          $scope.refreshProtocols();
        }).
        error($scope.handleError.bind('Error deleting all protocols'));
    };


    // When the controller is constructed, read all protocols.
    $scope.refreshProtocols();
	}]);

})();