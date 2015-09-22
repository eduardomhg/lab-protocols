module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	jshint: {
	  all: ['Gruntfile.js', 'server/*.js', 'app/*/*.js', 'app/components/version/*.js'],
	  options: {
	    globals: {
	      "angular": false,
	      "$scope": false,

	      "it": false,
	      "describe": false,
	      "beforeEach": false,
	      "expect": false,
	      'module': false,
	      'inject': false,

	      'alert': false
	    }
	  }
	}
  });

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};