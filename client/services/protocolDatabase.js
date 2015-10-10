(function() {

  'use strict';

  // Get the previously declared module.
  angular.module('labProtocolsApp').

  // Use the module factory method to define the service. This will be called
  // only once (services are singletons).
  factory('protocolDatabase', ['$http', function($http) {
    var protocolDatabaseInstance = {};
    
    // GET from /protocols all available protocols.
    protocolDatabaseInstance.getAllProtocols = function() {
      return $http({ method: 'GET', url: '/protocols' });
    };

    // PUT to /protocols to add a new protocol.
    protocolDatabaseInstance.addProtocol = function(protocolId) {
      return $http({ method: 'POST', url: '/protocols', data: protocolId });
    };

    // DELETE to /protocols/ID to delete a protocol.
    protocolDatabaseInstance.deleteProtocol = function(protocolId) {
      return $http({ method: 'DELETE', url: '/protocols/' + protocolId });
    };

    // DELETE to /protocols to delete all protocols.
    protocolDatabaseInstance.deleteAllProtocols = function() {
      return $http({ method: 'DELETE', url: '/protocols' });
    };

    return protocolDatabaseInstance;
  }]);

})();