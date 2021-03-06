"use strict";

module.exports = function(grunt) {
    return {
        files: [
            'Gruntfile.js',
            'grunt/*.js',
            'app/**/*.js',
            'test/unit/*.js',
            'test/karma.conf.js',
            '!app/libs/**/*'
        ],
        options: {
            reporter: require('jshint-stylish'),
            jshintrc: true
        }
    };
};
