'use strict';

module.exports = function(config) {
    var now = new Date(),
        currentTime = [[now.getFullYear(),now.getMonth()+1,now.getDate()].join(''),[now.getHours(),now.getMinutes(),now.getSeconds()].join('-')].join('_');

    config.set({

        basePath: '../',

        files: [
            /* APP Libs */
            'app/libs/jquery/dist/jquery.js',
            'app/libs/angular/angular.js',
            'app/libs/angular-animate/angular-animate.js',
            'app/libs/angular-ui-router/release/angular-ui-router.js',
            'app/libs/ngInfiniteScroll/build/ng-infinite-scroll.js',
            'app/libs/angular-hotkeys/build/hotkeys.js',
            'app/libs/angular-scroll/angular-scroll.js',

            /* APP Scripts */
            'app/assets/js/**/*.js',
            'app/modules/**/*.js',

            /* APP external templates */
            'app/modules/**/views/*.html',

            /* Unit test Libs */
            'app/libs/angular-mocks/angular-mocks.js',
            'app/libs/mousetrap/tests/libs/key-event.js',

            /* Unit test scripts */
            'test/unit/*.js',

            /* Unit test JSON Fixtures */
            'test/_mock-data/*.json',
            'test/_mock-data/properties/1'
        ],

        debug: true,

        colors: true,

        autoWatch: true,

        logLevel: config.LOG_INFO,

        browsers: ['Chrome'],

        frameworks: ['jasmine','fixture'],

        reporters: ['progress','coverage','kjhtml','html', 'junit'],


        preprocessors: {
            'test/_mock-data/*.json': ['json_fixtures'],
            'test/_mock-data/properties/1': ['json_fixtures'],
            'app/modules/**/*.html': ['ng-html2js'],
            'app/{assets,modules}/**/*.js': ['coverage']
        },

        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },

        ngHtml2JsPreprocessor: {
            moduleName: "app.templates",
            stripPrefix: 'app/'
        },


        htmlReporter: {
            outputDir: 'test/reports',
            namedFiles: true,
            focusOnFailures: true,
            urlFriendlyName: true,
            reportName: [currentTime, 'jasmine_test_results'].join('_'),

            preserveDescribeNesting: true,
            foldAll: false
        },

        junitReporter: {
            suite: 'unit',
            useBrowserName: false,
            outputDir: 'test/reports',
            outputFile: [currentTime, 'junit_test_results.xml'].join('_')
        },

        coverageReporter: {
            type: 'html',
            dir: 'test/reports/coverage/',
            subdir: currentTime
        },

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',

            'karma-fixture',
            'karma-json-fixtures-preprocessor',
            'karma-ng-html2js-preprocessor',

            'karma-junit-reporter',
            'karma-jasmine-html-reporter',
            'karma-html-reporter',
            'karma-coverage'
        ]

    });
};
