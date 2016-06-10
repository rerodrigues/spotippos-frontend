'use strict';

module.exports = function(config) {
    var now = new Date(),
        currentTime = [[now.getFullYear(),now.getMonth()+1,now.getDate()].join(''),[now.getHours(),now.getMinutes(),now.getSeconds()].join('-')].join('_');

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

    browsers: ['Chrome'],

    reporters: ['progress','kjhtml','html', 'junit'],
    
    debug: true,
    
    htmlReporter: {
        outputDir: 'test/reports',
        focusOnFailures: true,
        namedFiles: true,
        urlFriendlyName: true,
        reportName: ['jasmine_test_results_', currentTime].join(''),
        
        preserveDescribeNesting: true,
        foldAll: false
    },
    
    junitReporter: {
        outputDir: 'test/reports',
        outputFile: ['junit_test_results_', currentTime, '.xml'].join(''),
        suite: 'unit',
        useBrowserName: false
    },

    plugins: [
        'karma-chrome-launcher',
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-junit-reporter',
        'karma-fixture',
        'karma-json-fixtures-preprocessor',
        'karma-jasmine-html-reporter',
        'karma-html-reporter'
    ],

    phantomjsLauncher: {
        exitOnResourceError: true
    }

  });
};
