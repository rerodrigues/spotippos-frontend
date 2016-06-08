//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '../',

    files: [
	  'app/lib/jquery/jquery.js',
	  'app/lib/angular/angular.js',
	  'app/lib/angular/angular-animate.js',
	  'app/lib/angular-ui-router/angular-ui-router.js',
	  'app/lib/ng-infinite-scroll/ng-infinite-scroll.js',
	  'app/lib/angular/angular-mocks.js',
	  
	  'app/assets/js/**/*.js',
	  'app/modules/**/*.js',
	  
	  'test/unit/*.js',
	  'test/_mock-data/*.json'
    ],
	
    preprocessors: {
      '**/*.json'   : ['json_fixtures']
    },
	
    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },
	
    autoWatch: true,

    frameworks: ['jasmine','fixture'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
	  'karma-fixture',
	  'karma-json-fixtures-preprocessor'
    ],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
	
    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
