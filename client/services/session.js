(function() {

  'use strict';

  // Get the previously declared module.
  angular.module('labProtocolsApp').

  // Use the module factory method to define the service. This will be called
  // only once (services are singletons).
  factory('session', [function() {
    var sessionServiceInstance = {};
    
    sessionServiceInstance.create = function (sessionId, userId) {
        this.id = sessionId;
        this.userId = userId;
      };
    sessionServiceInstance.destroy = function () {
      this.id = null;
      this.userId = null;
    };

    return sessionServiceInstance;
  }]);

})();