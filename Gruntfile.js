module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['**/*.js', '!node_modules/**', '!client/bower_components/**', '!coverage/**'],
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
    },
    
    compress: {
      main: {
        options: {
          archive: 'production.zip'
        },
        files: [ 
          // includes files within path and its sub-directories 
          {expand: true, src: ['client/**', '!client/bower_components/**', '!client/**/*_test.js'], dest: '/'},
          {expand: true, src: ['server/**', 'common/**', '.ebextensions/**', '.bowerrc', 'bower.json'], dest: '/'},
          {expand: true, src: ['packageProduction.json'], dest: '/', 
            rename: function(dest, src) {
              return dest + 'package.json';
          }}]
      }  
    }
  });

  // Load the plugin that provides the 'jshint' task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  // Load the plugin that provides the 'copy' task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  // Load the plugin that provides the 'compress' task.
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};