module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	jshint: {
	  all: ['Gruntfile.js', 'server/*.js', 'app/*.js'],
	  options: {
	    globals: {
	      "angular": false
	    }
	  }
	}
  });

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};