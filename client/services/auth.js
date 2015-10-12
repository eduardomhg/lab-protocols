(function() {

  'use strict';

  // Get the previously declared module.
  angular.module('labProtocolsApp').

  // Use the module factory method to define the service. This will be called
  // only once (services are singletons).
  factory('auth', ['$http', 'session', function($http, session) {
    var authServiceInstance = {};
    
    authServiceInstance.logIn = function (credentials) {
      return $http
        .post('/users/login', credentials)
        .then(function (res) {

          console.log('post sent to login: ' + credentials.username + '::' + credentials.password);
          console.log('result: ' + JSON.stringify(res.config, null, 2));


          session.create(res.data.id, res.data.config.username);
          return res.data.user;
        });
    };

    authServiceInstance.logOut = function () {
      return $http
        .get('/users/logout')
        .then(function (res) {
          session.destroy();
        });
    };     

    authServiceInstance.isAuthenticated = function () {
      return !!session.userId;
    };

    authServiceInstance.register = function (credentials) {
      return $http
        .post('/users/register', credentials)
        .then(function (res) {
          session.create(res.data.id, res.data.user.id);
          return res.data.user;
        });
    };    

    return authServiceInstance;
  }]);

})();

