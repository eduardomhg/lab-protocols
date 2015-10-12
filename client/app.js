(function() {

  'use strict';

  // Declare app level module which depends on views, and components.
  angular.module('labProtocolsApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
    ]).

  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]).

  controller('ApplicationController', ['$scope', 'auth', function($scope, auth) {
    $scope.currentUser = null;
    $scope.isAuthorized = auth.isAuthorized;
 
    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };
  }]).

  controller('NavBarController', ['$scope', 'auth', function($scope, auth) {
    $scope.logOut = function() {
      auth.logOut();
    };
  }]).

  controller('LoginFormController', ['$scope', 'auth', function($scope, auth) {

    $scope.credentials = {
      username: '',
      password: ''
    };
    
    $scope.logIn = function(credentials) {
      auth.logIn(credentials);
    };

  }]);

})();