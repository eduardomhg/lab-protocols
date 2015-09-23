module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	jshint: {
	  all: ['Gruntfile.js', 'server/*.js', 'app/*/*.js', 'app/components/version/*.js', 'e2e-tests/**/*.js'],
	  options: {
	    globals: {
	      // Angular
	      'angular': false,
	      '$scope': false,

	      // Jasmine
	      'it': false,
	      'describe': false,
	      'beforeEach': false,
	      'expect': false,
	      'module': false,
	      'inject': false,

	      // Protractor,
	      'browser': false,
	      'element': false,
	      'by': false,	      

	      // JavaScript
	      'alert': false
	    }
	  }
	}
  });

  // Load the plugin that provides the 'jshint' task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};